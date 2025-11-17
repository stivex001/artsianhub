import { useLocation } from "@/api/crud/locations";
import { useEffect } from "react";

export const useLocationSelector = (
  country: string,
  state: string,
  setValue: any
) => {
  const { getAllCountries, getCountryStates, getCountryStatesCity } =
    useLocation();

  const { data: countriesData } = getAllCountries();
  const { data: stateData, isPending: stateLoading } =
    getCountryStates(country);

  const { data: cityData, isPending: cityLoading } = getCountryStatesCity(
    country,
    state
  );

  const countryOptions =
    countriesData?.data?.map((c) => ({
      value: c.code,
      label: c.name,
    })) || [];

  const stateOptions =
    stateData?.data?.map((s: any) => ({
      value: s.code,
      label: s.name,
    })) || [];

  const cityOptions =
    cityData?.data?.map((c: any) => ({
      value: c,
      label: c,
    })) || [];

  useEffect(() => {
    setValue("state", "");
    setValue("city", "");
  }, [country]);

  useEffect(() => {
    setValue("city", "");
  }, [state]);

  return {
    countryOptions,
    stateOptions,
    cityOptions,
    stateLoading,
    cityLoading
  }
};
