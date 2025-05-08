import { create } from "zustand";

type Media = {
  url: string;
  Blob?: string;
  name?: string;
  size?: number;
  type?: string;
};

type PortfolioItem = Media;

type WorkAvailability = {
  availableHours: string;
  days: string[];
};

export interface KYCFormData {
  profilePhoto?: Media;
  serviceCategory?: string;
  specialization?: string;
  professionalTitle?: string;
  skillDescription: string;
  portfolio: PortfolioItem[];
  servicePricing: number;
  yearsOfExperience: number;
  governmentIssuedID?: Media;
  proofOfAddress?: Media;
  professionalCertification?: Media;
  workAvailability?: WorkAvailability;
  serviceArea?: any;
  languagesSpoken: string[];
  termsAccepted: boolean;
}

interface KYCStore {
  kycFormData: KYCFormData;
  currentStep: number;
  setKYCFormData: (data: Partial<KYCFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export const useKYCStore = create<KYCStore>((set) => ({
  kycFormData: {
    serviceCategory: "",
    specialization: "",
    professionalTitle: "",
    skillDescription: "",
    portfolio: [],
    servicePricing: 0,
    yearsOfExperience: 0,
    languagesSpoken: [],
    termsAccepted: false,
  },
  currentStep: 0,

  setKYCFormData: (data) =>
    set((state) => ({
      kycFormData: { ...state.kycFormData, ...data },
    })),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  goToStep: (step) => set({ currentStep: step }),
}));
