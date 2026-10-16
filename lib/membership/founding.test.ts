import { addMonths, computeFoundingEnd, isFoundingOfferActive } from "./founding";

describe("founding offer", () => {
  it("adds six months to the launch date", () => {
    expect(computeFoundingEnd("2026-10-15")).toBe("2027-04-15");
    expect(computeFoundingEnd("2026-11-01")).toBe("2027-05-01");
  });
  it("clamps to the end of shorter months", () => {
    expect(addMonths("2026-08-31", 6)).toBe("2027-02-28");
  });
  it("returns null until a launch date is set", () => {
    expect(computeFoundingEnd(null)).toBeNull();
  });
  it("is active through the end date, inactive after, and active when unknown", () => {
    expect(isFoundingOfferActive("2027-04-15", new Date("2027-04-15T20:00:00Z"))).toBe(true);
    expect(isFoundingOfferActive("2027-04-15", new Date("2027-04-16T00:00:01Z"))).toBe(false);
    expect(isFoundingOfferActive(null)).toBe(true);
  });
});
