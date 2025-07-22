import { create } from "zustand";

type PersonalInfo = {
  profilePicture: File | null;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
};

type ServiceDetails = {
  serviceCategory: string[] | string;
  professionalTitle: string;
  skillDescription: string;
};

type LocationPriceDetails = {
  primaryLocation: string;
  pricePerHour: number;
  workDistanceKm: number;
};

type ArtisanProfileState = {
  personalInfo: PersonalInfo;
  serviceDetails: ServiceDetails;
  locationPriceDetails: LocationPriceDetails;

  currentStep: number;

  completedSteps: {
    personalInfo: boolean;
    serviceDetails: boolean;
    locationPriceDetails: boolean;
  };

  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateServiceDetails: (data: Partial<ServiceDetails>) => void;
  updateLocationPriceDetails: (data: Partial<LocationPriceDetails>) => void;

  setCurrentStep: (step: number) => void;

  markStepCompleted: (
    step: keyof ArtisanProfileState["completedSteps"]
  ) => void;

  resetProfile: () => void;
};

export const useArtisanProfileStore = create<ArtisanProfileState>((set) => ({
  personalInfo: {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    profilePicture: null,
  },
  serviceDetails: {
    serviceCategory: [],
    professionalTitle: "",
    skillDescription: "",
  },
  locationPriceDetails: {
    primaryLocation: "",
    pricePerHour: 1,
    workDistanceKm: 1,
  },

  currentStep: 1,

  completedSteps: {
    personalInfo: false,
    serviceDetails: false,
    locationPriceDetails: false,
  },

  updatePersonalInfo: (data) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...data },
    })),
  updateServiceDetails: (data) =>
    set((state) => ({
      serviceDetails: { ...state.serviceDetails, ...data },
    })),
  updateLocationPriceDetails: (data) =>
    set((state) => ({
      locationPriceDetails: { ...state.locationPriceDetails, ...data },
    })),

  setCurrentStep: (step) => set(() => ({ currentStep: step })),

  markStepCompleted: (step) =>
    set((state) => ({
      completedSteps: { ...state.completedSteps, [step]: true },
    })),
  resetProfile: () =>
    set(() => ({
      personalInfo: {
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        profilePicture: null,
      },
      serviceDetails: {
        serviceCategory: [],
        professionalTitle: "",
        skillDescription: "",
      },
      locationPriceDetails: {
        primaryLocation: "",
        pricePerHour: 1,
        workDistanceKm: 1,
      },
    })),
}));
