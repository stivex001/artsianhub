import { getEventPricing } from "./pricing";

const base = {
  memberPrice: 45,
  nonMemberPrice: 90,
  bookingOpen: true,
};

describe("getEventPricing", () => {
  it("uses the explicit member price, not a flat discount", () => {
    const p = getEventPricing({ ...base, memberPrice: 40 }, { isMember: true });
    expect(p.memberPrice).toBe(40);
    expect(p.viewerPrice).toBe(40);
    expect(p.memberSavings).toBe(50);
  });

  it("charges non-members the non-member price", () => {
    expect(getEventPricing(base, { isMember: false }).viewerPrice).toBe(90);
  });

  it("treats a null member price as free for members", () => {
    const p = getEventPricing(
      { ...base, memberPrice: null, nonMemberPrice: 10 },
      { isMember: true },
    );
    expect(p.memberPrice).toBe(0);
    expect(p.memberIsFree).toBe(true);
    expect(p.viewerPrice).toBe(0);
    expect(p.memberSavings).toBe(10);
  });

  it("handles an unannounced non-member price", () => {
    const p = getEventPricing({ ...base, nonMemberPrice: null }, { isMember: false });
    expect(p.viewerPrice).toBeNull();
    expect(p.memberSavings).toBe(0);
  });

  it("never reports negative savings", () => {
    const p = getEventPricing({ ...base, memberPrice: 100 }, { isMember: true });
    expect(p.memberSavings).toBe(0);
  });

  it("cannot be booked while bookings are closed, even for members", () => {
    const p = getEventPricing({ ...base, bookingOpen: false }, { isMember: true });
    expect(p.canBook).toBe(false);
  });

  describe("early access", () => {
    const e = { ...base, memberBookingOpensAt: "2026-08-01T00:00:00Z" };
    const before = new Date("2026-07-20T00:00:00Z");
    const after = new Date("2026-08-02T00:00:00Z");

    it("blocks non-members before the window opens", () => {
      const p = getEventPricing(e, { isMember: false }, before);
      expect(p.canBook).toBe(false);
      expect(p.isMemberEarlyAccess).toBe(true);
    });
    it("lets members book before the window opens", () => {
      expect(getEventPricing(e, { isMember: true }, before).canBook).toBe(true);
    });
    it("opens to everyone afterwards", () => {
      expect(getEventPricing(e, { isMember: false }, after).canBook).toBe(true);
    });
    it("is open when no gate is set", () => {
      expect(getEventPricing(base, { isMember: false }).canBook).toBe(true);
    });
  });

  describe("pricing override", () => {
    const e = {
      ...base,
      pricingOverride: {
        note: "Intro offer",
        joinWithStandPrice: 25,
        standOnlyPrice: 35,
        standCap: 25,
        standsRemaining: 3,
      },
    };
    it("exposes override pricing and savings", () => {
      const o = getEventPricing(e, { isMember: false }).override!;
      expect(o.joinWithStandPrice).toBe(25);
      expect(o.standOnlyPrice).toBe(35);
      expect(o.joinSavings).toBe(10);
      expect(o.soldOut).toBe(false);
    });
    it("flags sold out", () => {
      const sold = { ...e, pricingOverride: { ...e.pricingOverride, standsRemaining: 0 } };
      expect(getEventPricing(sold, { isMember: false }).override!.soldOut).toBe(true);
    });
  });
});
