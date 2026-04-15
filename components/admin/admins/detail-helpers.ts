// Pure utility functions for the Admin Detail page

export const actionColor = (action: string): string => {
  const a = action.toUpperCase();
  if (a === "LOGIN")                                          return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (a === "LOGOUT")                                         return "bg-gray-100 text-gray-500 ring-1 ring-gray-200";
  if (a.startsWith("CREATE"))                                 return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  if (a.startsWith("UPDATE") || a.startsWith("PATCH"))       return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  if (a.startsWith("DELETE") || a.startsWith("REMOVE"))      return "bg-red-50 text-red-600 ring-1 ring-red-200";
  if (a.includes("SUSPEND") || a.includes("BAN"))            return "bg-orange-50 text-orange-700 ring-1 ring-orange-200";
  if (a.includes("VERIFY") || a.includes("APPROVE"))         return "bg-violet-50 text-violet-700 ring-1 ring-violet-200";
  return "bg-gray-100 text-gray-500 ring-1 ring-gray-200";
};

export const actionLabel = (action: string): string =>
  action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const initials = (name: string): string =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** Extract the most useful message from a mutation error */
export const extractErrorMessage = (err: unknown, fallback = "Something went wrong."): string => {
  const e = err as any;
  return e?.data?.message ?? e?.data?.error ?? e?.message ?? fallback;
};
