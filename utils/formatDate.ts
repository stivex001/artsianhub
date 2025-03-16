import { format } from "date-fns";

// export const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

export const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return "";
  }

  try {
    return format(new Date(date), "dd.MM.yyyy");
  } catch (error) {
    console.error("Invalid date format:", error);
    return "";
  }
};
