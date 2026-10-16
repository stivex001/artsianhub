import { toFeaturedArtisans } from "./featured";

const a = (over: Record<string, unknown> = {}) => ({
  _id: "1",
  firstName: "Ola",
  lastName: "O",
  professionalTitle: "Beauty Specialist ",
  city: "Chesterfield",
  profilePicture: "https://img/x.jpg",
  isVerified: true,
  featuredOnHomepage: true,
  accountStatus: "active",
  ...over,
});

describe("toFeaturedArtisans", () => {
  it("keeps only active artisans flagged for the homepage", () => {
    const out = toFeaturedArtisans(
      [
        a({ _id: "ok" }),
        a({ _id: "not-featured", featuredOnHomepage: false }),
        a({ _id: "suspended", accountStatus: "suspended" }),
        a({ _id: undefined }),
      ],
      4,
    );
    expect(out.map((x) => x.id)).toEqual(["ok"]);
  });
  it("respects the limit", () => {
    const list = ["1", "2", "3", "4", "5"].map((id) => a({ _id: id }));
    expect(toFeaturedArtisans(list, 4)).toHaveLength(4);
  });
  it("maps and trims fields, falling back to primaryLocation", () => {
    const [x] = toFeaturedArtisans([a({ city: undefined, primaryLocation: "Derby " })], 4);
    expect(x).toMatchObject({ name: "Ola O", title: "Beauty Specialist", location: "Derby", verified: true });
  });
  it("handles missing optional fields", () => {
    const [x] = toFeaturedArtisans([a({ firstName: undefined, lastName: undefined, profilePicture: "", isVerified: undefined })], 4);
    expect(x.name).toBe("Artisan");
    expect(x.imageUrl).toBeUndefined();
    expect(x.verified).toBe(false);
  });
});
