import { apiClient } from "shared/api";
import { type Nurse } from "../model";

export const fetchNurses = async (): Promise<Nurse[]> => {
  const nurses: Nurse[] = await apiClient.get("nurses.json");
  return nurses;
};
