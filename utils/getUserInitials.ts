export const getUserInitials = (firstName?: string, lastName?: string) => {
  if (!firstName || !lastName) return "CN";
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};
