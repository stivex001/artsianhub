import { ID } from "@/components/api/type";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface Country {
  id: ID;
  name: string;
  code: string;
  dial_code: string;
  country: string;
  state: string;
  city: string;
}

export interface CountryDetails {
  data: Country[];
}

export const useLocation = () => {
  const getAllCountries = () =>
    useApiQuery<CountryDetails>(["all_country"], {
      url: `/locations/countries`,
      method: "GET",
    });

  const getCountryStates = (countryCode: string) =>
    useApiQuery<CountryDetails>(["all_country_state", countryCode], {
      url: `/locations/states?countryCode=${countryCode}`,
      method: "GET",
    });

  const getCountryStatesCity = (countryCode: string, stateCode: string) =>
    useApiQuery<CountryDetails>(
      ["all_country_state_city", countryCode, stateCode],
      {
        url: `/locations/cities?countryCode=${countryCode}&stateCode=${stateCode}`,
        method: "GET",
      }
    );

  return {
    getAllCountries,
    getCountryStates,
    getCountryStatesCity,
  };
};
