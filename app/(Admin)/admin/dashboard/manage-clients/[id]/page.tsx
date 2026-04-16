"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminClients, useAdminSubscriptions, USER_STATUSES, UserStatus } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Shield,
  ShieldOff,
  AlertTriangle,
  CheckCircle2,
  User,
  CalendarDays,
  Plus,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const STATUS_STYLES: Record<UserStatus, string> = {
  active: "bg-green-50 text-green-600 border-green-200",
  suspended: "bg-orange-50 text-orange-600 border-orange-200",
  banned: "bg-red-50 text-red-600 border-red-200",
};

const BOOKING_STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
  Declined: "bg-red-50 text-red-600",
  Cancelled: "bg-gray-100 text-gray-500",
};

const ClientDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;
  const queryClient = useQueryClient();

  const { getClientById, updateClientStatus } = useAdminClients();
  const { extendSubscription } = useAdminSubscriptions();

  const { data, isPending, refetch } = getClientById(clientId);
  const client = data?.data;

  const statusMutation = updateClientStatus(clientId);
  const extendMutation = extendSubscription(clientId);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [extendDays, setExtendDays] = useState(7);
  const [reasonText, setReasonText] = useState("");

  const handleStatusChange = async (status: UserStatus) => {
    if (!reasonText.trim() && status !== "active") {
      toast.error("Please provide a reason");
      return;
    }
    setShowStatusMenu(false);
    try {
      await statusMutation.mutateAsync({ status, reason: reasonText || undefined });
      setReasonText("");
      toast.success(`Client status updated to ${status}`);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["admin_clients"] });
    } catch {
      toast.error("Failed to update status");
    }
  };

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-xl w-48" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm">Client not found</p>
        <button onClick={() => router.back()} className="text-primary text-sm font-medium hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const bookings = client.bookings ?? [];

  return (
    <section className="flex flex-col gap-5">
      {/* ── Back ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Profile Card ─────────────────────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            {/* Avatar + name */}
            <div className="flex flex-col items-center text-center pb-5 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-3">
                {client.firstName?.[0]}{client.lastName?.[0]}
              </div>
              <h2 className="font-bold text-gray-900 text-lg">
                {client.firstName} {client.lastName}
              </h2>
              <div className="mt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border capitalize ${STATUS_STYLES[client.status] ?? ""}`}>
                  {client.status === "active" ? <CheckCircle2 className="w-3 h-3" /> : <ShieldOff className="w-3 h-3" />}
                  {client.status}
                </span>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="break-all">{client.email}</span>
              </div>
              {client.phoneNumber && (
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{client.phoneNumber}</span>
                </div>
              )}
              {client.gender && (
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="capitalize">{client.gender}</span>
                </div>
              )}
              {client.dateOfBirth && (
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{formatDate(client.dateOfBirth)}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <CalendarDays className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Joined {formatDate(client.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* ── Moderation Actions ───────────────────────────────── */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              Moderation
            </h3>

            {/* Reason input */}
            <div className="mb-3">
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">
                Reason (required for suspend/ban)
              </label>
              <textarea
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                placeholder="Enter reason…"
                rows={2}
                className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleStatusChange("active")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Activate Account
              </button>
              <button
                onClick={() => handleStatusChange("suspended")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Suspend Account
              </button>
              <button
                onClick={() => handleStatusChange("banned")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <ShieldOff className="w-4 h-4" />
                Ban Account
              </button>
            </div>
          </div>
        </div>

        {/* ── Booking History ──────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Booking History</h3>
            <button onClick={() => refetch()} className="text-gray-400 hover:text-gray-600">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-400">
              <CalendarDays className="w-8 h-8" />
              <p className="text-sm">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((booking: any, i: number) => (
                    <tr key={booking._id ?? i} className="hover:bg-gray-50/50">
                      <td className="px-5 py-4 text-gray-900">{booking.serviceType ?? "—"}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          BOOKING_STATUS_COLORS[booking.status?.split(" ")[0]] ?? "bg-gray-100 text-gray-500"
                        }`}>
                          {booking.status ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(booking.scheduledDate ?? booking.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-gray-900 font-medium">
                        {booking.totalAmount ? `$${booking.totalAmount}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientDetailPage;
