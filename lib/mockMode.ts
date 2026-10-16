/**
 * Mock data for pages whose backend endpoints don't exist yet (events,
 * membership settings, spotlights).
 *
 * On in development. Off in production unless NEXT_PUBLIC_EVENTS_MOCK=true, so
 * invented sample data can't reach the live site by accident. Set
 * NEXT_PUBLIC_EVENTS_MOCK=false to use the real API in development too.
 */
const flag = process.env.NEXT_PUBLIC_EVENTS_MOCK;

export const USE_MOCK_DATA =
  flag === "true" ? true : flag === "false" ? false : process.env.NODE_ENV !== "production";
