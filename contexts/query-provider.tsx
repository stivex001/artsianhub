"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function QueryProviders({ children }: Props) {
  const router = useRouter();
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute — prevents immediate refetch after hydration
          retry: 1,
        },
      },
      queryCache: new QueryCache({
        onError: (err) => {
          if (
            err.message === "invalid signature" ||
            err.message === "jwt malformed" ||
            err.message === "jwt expired"
          ) {
            router.push("/login");
          }
        },
      }),
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
