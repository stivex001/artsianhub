import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import React from "react";

type StatusButtonProps = {
  status: string;
};

type Styles = {
  backgroundColor: string;
  color: string;
  text: string;
};

const statusStyles: Record<string, Styles> = {
  pending: { backgroundColor: "#FFD6D0", color: "#fff", text: "Pending" },
  approved: { backgroundColor: "#ECFDF3", color: "#358619", text: "Approved" },
  completed: {
    backgroundColor: "#358619",
    color: "#ffffff",
    text: "Completed",
  },
  "in progress": {
    backgroundColor: "#FFF3CD",
    color: "#856404",
    text: "In Progress",
  },
  active: { backgroundColor: "#34C759", color: "#ffffff", text: "Active" },
  available: {
    backgroundColor: "#E7F6EC",
    color: "#036B26",
    text: "Available",
  },
  delivered: {
    backgroundColor: "#E7F6EC",
    color: "#036B26",
    text: "Delivered",
  },
  suspended: {
    backgroundColor: "#F8D7DA",
    color: "#721C24",
    text: "Suspended",
  },
  cancelled: {
    backgroundColor: "#F8D7DA",
    color: "#721C24",
    text: "Cancelled",
  },
  accept: { backgroundColor: "#1F873B", color: "#fff", text: "Accepted" },
  decline: { backgroundColor: "#DD1919", color: "#fff", text: "Declined" },
  inactive: { backgroundColor: "#F8D7DA", color: "#721C24", text: "Inactive" },
  "awaiting inspection": {
    backgroundColor: "#FFF3CD",
    color: "#856404",
    text: "Awaiting Inspection",
  },
  level_three_approved: {
    backgroundColor: "#ECFDF3",
    color: "#358619",
    text: "Approved for Auction",
  },
};

const StatusButton = ({ status }: StatusButtonProps) => {
  const lowerCaseStatus = status.toLowerCase();
  const styles = statusStyles[lowerCaseStatus] ?? {
    backgroundColor: "#E2E3E5",
    color: "#383D41",
    text: capitalizeFirstLetter(status),
  };

  return (
    <button
      className="py-4 px-2 rounded-[10px]"
      style={{ backgroundColor: styles.backgroundColor, color: styles.color }}
    >
      {styles.text}
    </button>
  );
};

export default StatusButton;
