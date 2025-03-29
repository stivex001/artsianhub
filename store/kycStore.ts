import { create } from "zustand";

// Define types for KYC Form Data
interface KYCFormData {
  serviceCategory?: string;
  professionalTitle: string;
  servicePricing: string;
  yearsOfExperience: string;
  skillDescription: string;
  portfolio: string;

  verification: {
    idType: string;
    idNumber: string;
  };
  additionalInfo: {
    address: string;
    contactNumber: string;
  };
}

interface KYCStore {
  formData: KYCFormData;
  currentStep: number;
  setFormData: (data: Partial<KYCFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

// Function to load stored KYC data from localStorage
const loadStoredData = (): KYCFormData => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("kycFormData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return {
    serviceCategory: "",
    professionalTitle: "",
    servicePricing: "",
    yearsOfExperience: "",
    skillDescription: "",
    portfolio: "",

    verification: {
      idType: "",
      idNumber: "",
    },
    additionalInfo: {
      address: "",
      contactNumber: "",
    },
  };
};

export const useKYCStore = create<KYCStore>((set) => ({
  formData: loadStoredData(),
  currentStep: 0,

  setFormData: (data) =>
    set((state) => {
      const updatedFormData = { ...state.formData, ...data };

      // Save updated data to localStorage
      localStorage.setItem("kycFormData", JSON.stringify(updatedFormData));

      return { formData: updatedFormData };
    }),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),

  goToStep: (step) => set({ currentStep: step }),
}));
