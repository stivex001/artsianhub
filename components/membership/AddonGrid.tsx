import Link from "next/link";
import { ADDONS } from "@/lib/membership/addons";

/** Add-ons are bought from a member's account, so CTAs send people to log in first. */
export const AddonGrid = () => (
  <section aria-labelledby="addons" className="space-y-4">
    <h2 id="addons" className="text-2xl font-bold">Optional add-ons</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ADDONS.map((a) => (
        <article key={a.id} className={`flex flex-col rounded-2xl border bg-white p-5 ${a.comingLater ? "opacity-60" : ""}`}>
          <span className={`text-[11px] font-bold tracking-wider ${a.comingLater ? "text-gray-500" : "text-primary"}`}>{a.tag}</span>
          <h3 className="mt-2 text-lg font-bold">{a.name}</h3>
          <p className="mt-1 font-semibold">
            {a.prices.map((p, i) => (
              <span key={p.unit}>
                {i > 0 && " or "}£{p.amount}
                <span className="text-xs font-normal text-gray-500"> {p.unit}</span>
              </span>
            ))}
          </p>
          <p className="mb-4 mt-2 flex-1 text-sm leading-relaxed text-gray-600">{a.description}</p>
          {a.comingLater ? (
            <span className="text-sm font-semibold text-gray-500">{a.cta}</span>
          ) : (
            <Link
              href={`/auth/login?redirect=${encodeURIComponent("/membership/")}`}
              className="text-sm font-semibold text-primary underline"
            >
              {a.cta}
            </Link>
          )}
        </article>
      ))}
    </div>
  </section>
);
