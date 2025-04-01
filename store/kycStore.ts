import { create } from "zustand";

// Define types for KYC Form Data
interface KYCkycFormData {
  serviceCategory?: string;
  professionalTitle: string;
  servicePricing: number;
  yearsOfExperience: number;
  skillDescription: string;
  portfolio: string;
  proofOfAddress: string;
  governmentIssuedID: string;
  availableHours: string;
  workAvailability: string;
  professionalCertifications: string[];
  days: string[];
  languagesSpoken: string[];
}

interface KYCStore {
  kycFormData: KYCkycFormData;
  currentStep: number;
  setkycFormData: (data: Partial<KYCkycFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

// Function to load stored KYC data from localStorage
const loadStoredData = (): KYCkycFormData => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("kyckycFormData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return {
    serviceCategory: "",
    professionalTitle: "",
    servicePricing: 0,
    yearsOfExperience: 1,
    skillDescription: "",
    portfolio: "",
    proofOfAddress: "",
    governmentIssuedID: "",
    availableHours: "",
    workAvailability: "",
    days: [],
    professionalCertifications: [],
    languagesSpoken:[],
  };
};

export const useKYCStore = create<KYCStore>((set) => ({
  kycFormData: loadStoredData(),
  currentStep: 0,

  setkycFormData: (data) =>
    set((state) => {
      const updatedkycFormData = { ...state.kycFormData, ...data };

      // Save updated data to localStorage
      localStorage.setItem("kyckycFormData", JSON.stringify(updatedkycFormData));

      return { kycFormData: updatedkycFormData };
    }),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),

  goToStep: (step) => set({ currentStep: step }),
}));
