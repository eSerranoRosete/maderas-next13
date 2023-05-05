import { type AppState } from "@/context/useAppState";
import { IFResultData } from "@/utils/computeResult";

type IFState = Pick<AppState, "area" | "location" | "payment" | "term">;

export interface IFRequestBody {
  inputs: IFState;
  resultData: IFResultData;
  lead: {
    name?: string;
    email?: string;
    phone?: string;
  };
  targetEmail: string;
}

export interface IFUserDocument {
  id: string;
  type: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  organization: string;
  avatar: {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    url: string;
  };
  cover: {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    url: string;
  };
  slider: {
    title: string;
    items: {
      image: {
        id: string;
        filename: string;
        mimeType: string;
        filesize: number;
        width: number;
        height: number;
        createdAt: string;
        updatedAt: string;
        url: string;
      };
      id: string;
    }[];
  };
}
