import { create } from "zustand";

// Define types for KYC Form Data
interface KYCFormData {
  serviceProfile: {
    businessName: string;
    businessType: string;
  };
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

// Initial form data
const initialData: KYCFormData = {
  serviceProfile: {
    businessName: "",
    businessType: "",
  },
  verification: {
    idType: "",
    idNumber: "",
  },
  additionalInfo: {
    address: "",
    contactNumber: "",
  },
};

export const useKYCStore = create<KYCStore>((set) => ({
  formData: initialData,
  currentStep: 0,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  goToStep: (step) => set({ currentStep: step }),
}));
