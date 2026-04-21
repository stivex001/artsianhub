import { MessageSquare } from "lucide-react";

const EmptyTickets = () => (
  <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <MessageSquare className="w-6 h-6" />
    </div>
    <p className="text-sm">No support tickets found</p>
  </div>
);

export default EmptyTickets;
