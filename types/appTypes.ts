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
