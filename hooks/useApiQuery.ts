import { useQuery, QueryKey } from "@tanstack/react-query";
import { api } from "./apiFunction";
import { BASE_URL } from "@/constants";
import { ApiError, ApiOptions } from "@/components/api/type";

export const useApiQuery = <T>(key: QueryKey, options: Omit<ApiOptions, "url"> & { url: string }) => {
  return useQuery<T, ApiError>({
    queryKey: key,
    queryFn: () =>
      api<T>({
        ...options,
        method: options.method || "GET",
        url: `${BASE_URL || ""}${options.url}`,
      }),
  });
};
