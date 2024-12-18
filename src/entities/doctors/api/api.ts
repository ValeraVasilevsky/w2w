import { apiClient } from "shared/api";
import { type Doctor } from "../model";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  const doctors: Doctor[] = await apiClient.get("doctors.json");
  return doctors;
};
