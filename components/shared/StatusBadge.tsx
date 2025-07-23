export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#F3BF5E1A] text-[#FA7319] border-orange-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled (client)":
      case "cancelled (artisan)":
        return "bg-red-100 text-red-800 border-red-200";
      case "no show (client)":
      case "no show (artisan)":
        return "bg-red-100 text-red-800 border-red-200";
      case "rescheduled":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-xl text-xs font-medium border ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
};
