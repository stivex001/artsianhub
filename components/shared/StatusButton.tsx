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

const StatusButton = ({ status }: StatusButtonProps) => {
  let styles: Styles = { backgroundColor: "", color: "", text: "" };

  switch (status?.toLowerCase()) {
    case "pending":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Pending",
      };
      break;

    case "approved":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Approved",
      };
      break;
    case "completed":
      styles = {
        backgroundColor: "#358619",
        color: "#ffffff",
        text: "Completed",
      };
      break;

    case "in progress":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "In Progress",
      };
      break;
    case "active":
      styles = {
        backgroundColor: "#34C759",
        color: "#ffffff",
        text: "Active",
      };
      break;
    case "available":
      styles = {
        backgroundColor: "#E7F6EC",
        color: "#036B26",
        text: "Available",
      };
      break;
    case "delivered":
      styles = {
        backgroundColor: "#E7F6EC",
        color: "#036B26",
        text: "Delivered",
      };
      break;
    case "suspended":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Suspended",
      };
      break;
    case "cancelled":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Cancelled",
      };
      break;

    case "accepted":
      styles = {
        backgroundColor: "#E7F6EC",
        color: "#036B26",
        text: "Accepted",
      };
      break;
    case "declined":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Declined",
      };
      break;
    case "inactive":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Inactive",
      };
      break;
    case "Awating Inspection":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Awaiting Inspection",
      };
      break;
    case "LEVEL_THREE_APPROVED":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Approved for Auction",
      };
      break;
    default:
      styles = {
        backgroundColor: "#E2E3E5",
        color: "#383D41",
        text: capitalizeFirstLetter(status),
      };
      break;
  }

  return (
    <button
      className="text-10px rounded-[20px] px-5 py-1"
      style={{ backgroundColor: styles.backgroundColor, color: styles.color }}
    >
      {styles.text}
    </button>
  );
};

export default StatusButton;
