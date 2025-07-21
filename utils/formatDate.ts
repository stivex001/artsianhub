import { format } from "date-fns";

export function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}


// export const formatDate = (date: string | null | undefined) => {
//   if (!date) {
//     return "";
//   }

//   try {
//     return format(new Date(date), "dd.MM.yyyy");
//   } catch (error) {
//     console.error("Invalid date format:", error);
//     return "";
//   }
// };
