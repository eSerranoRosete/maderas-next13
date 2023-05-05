import { create } from "zustand";
import { locations } from "@/utils/locations";
import { IFRequestBody } from "@/types/appTypes";

export type AppState = {
  area: number;
  term: number;
  location: string;
  landPrice: number;
  payment: number;
  // Lead Information
  leadName: string;
  leadEmail: string;
  leadPhone: string;

  resultData?: IFRequestBody;

  setArea: (area: number) => void;
  setTerm: (term: number) => void;
  setLocation: (location: string) => void;
  setLandPrice: (landPrice: number) => void;
  setPayment: (payment: number) => void;
  // Lead Information
  setLeadName: (leadName: string) => void;
  setLeadEmail: (leadEmail: string) => void;
  setLeadPhone: (leadPhone: string) => void;

  setResultData: (resultData: IFRequestBody) => void;
};

export const useAppState = create<AppState>((set) => ({
  area: 112,
  term: 20,
  location: locations[0].name,
  landPrice: locations[0].landPrice,
  payment: 0,
  leadName: "",
  leadEmail: "",
  leadPhone: "",
  setArea: (area) => set({ area }),
  setTerm: (term) => set({ term }),
  setLocation: (location) => set({ location }),
  setLandPrice: (landPrice) => set({ landPrice }),
  setPayment: (payment) => set({ payment }),
  setLeadName: (leadName) => set({ leadName }),
  setLeadEmail: (leadEmail) => set({ leadEmail }),
  setLeadPhone: (leadPhone) => set({ leadPhone }),
  setResultData: (resultData) => set({ resultData }),
}));
