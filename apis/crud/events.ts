import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/hooks/apiFunction";
import { BASE_URL } from "@/constants";
import { USE_MOCK_DATA } from "@/lib/mockMode";
import { useAuthStore } from "@/store/authStore";
import {
  MOCK_EVENTS,
  MOCK_BOOKINGS,
  addMockSubmission,
  getApprovedMockSubmissions,
} from "@/lib/events/mockEvents";
import type { ApiError } from "@/components/api/type";
import type {
  BookingCheckout,
  CommunityEventSubmission,
  CommunityEventSubmissionInput,
  CreateBookingInput,
  Event,
  EventDetail,
  EventBooking,
  EventInterestInput,
  EventType,
} from "@/types/events";

// See lib/mockMode.ts: mocks are dev-only unless NEXT_PUBLIC_EVENTS_MOCK=true.
export const USE_MOCK_EVENTS = USE_MOCK_DATA;

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const fetchEvents = async (type?: EventType): Promise<Event[]> => {
  if (USE_MOCK_EVENTS) {
    await wait();
    return MOCK_EVENTS.filter((e) => !type || e.eventType === type);
  }
  return api<Event[]>({
    url: `${BASE_URL}/events${type ? `?type=${type}` : ""}`,
    method: "GET",
  });
};

export const fetchEvent = async (slug: string): Promise<EventDetail> => {
  if (USE_MOCK_EVENTS) {
    await wait();
    const found = MOCK_EVENTS.find((e) => e.slug === slug);
    if (!found) {
      const err: ApiError = { message: "Event not found", status: 404 };
      throw err;
    }
    return found;
  }
  return api<EventDetail>({ url: `${BASE_URL}/events/${slug}`, method: "GET" });
};

export const useEvents = (type?: EventType) =>
  useQuery<Event[], ApiError>({
    queryKey: ["events", type ?? "all"],
    queryFn: () => fetchEvents(type),
  });

export const useEvent = (slug: string) =>
  useQuery<EventDetail, ApiError>({
    queryKey: ["events", "detail", slug],
    queryFn: () => fetchEvent(slug),
    enabled: !!slug,
  });

/** Current viewer's membership; false until the backend provides isMember. */
export const useEventViewer = () => {
  const user = useAuthStore((s) => s.currentUser);
  return { isMember: !!user?.isMember, isLoggedIn: !!user };
};

export const useEventInterest = (eventId: string) =>
  useMutation<{ message?: string }, ApiError, EventInterestInput>({
    mutationFn: async (input) => {
      if (USE_MOCK_EVENTS) {
        await wait(500);
        return { message: "Thanks, we'll be in touch." };
      }
      return api({
        url: `${BASE_URL}/events/${eventId}/interest`,
        method: "POST",
        data: input,
      });
    },
  });

/** Registrations for the logged-in user. */
export const useMyEvents = () => {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery<EventBooking[], ApiError>({
    queryKey: ["events", "mine"],
    enabled: !!token,
    queryFn: async () => {
      if (USE_MOCK_EVENTS) {
        await wait();
        return MOCK_BOOKINGS;
      }
      return api<EventBooking[]>({ url: `${BASE_URL}/me/events`, method: "GET" });
    },
  });
};

/** Approved community events only. */
export const useCommunityEvents = () =>
  useQuery<CommunityEventSubmission[], ApiError>({
    queryKey: ["events", "community"],
    queryFn: async () => {
      if (USE_MOCK_EVENTS) {
        await wait();
        return getApprovedMockSubmissions();
      }
      return api<CommunityEventSubmission[]>({
        url: `${BASE_URL}/events/community`,
        method: "GET",
      });
    },
  });

/** Creates a submission in `pending_review`; an admin approves it later. */
export const useSubmitCommunityEvent = () => {
  const userId = useAuthStore((s) => s.currentUser?._id);
  return useMutation<CommunityEventSubmission, ApiError, CommunityEventSubmissionInput>({
    mutationFn: async (input) => {
      if (USE_MOCK_EVENTS) {
        await wait(500);
        return addMockSubmission(input, String(userId ?? "unknown"));
      }
      return api<CommunityEventSubmission>({
        url: `${BASE_URL}/events/community`,
        method: "POST",
        data: input,
      });
    },
  });
};

/**
 * Native Stripe booking. Paid bookings return a Checkout URL to redirect to;
 * free ones confirm immediately. In mock mode no Stripe session exists, so the
 * result has no checkoutUrl and the UI says so.
 */
export const useCreateBooking = (eventId: string) =>
  useMutation<BookingCheckout, ApiError, CreateBookingInput>({
    mutationFn: async (input) => {
      if (USE_MOCK_EVENTS) {
        await wait(500);
        return { bookingId: `mock-${eventId}`, status: "pending" };
      }
      return api<BookingCheckout>({
        url: `${BASE_URL}/events/${eventId}/bookings`,
        method: "POST",
        data: input,
      });
    },
  });
