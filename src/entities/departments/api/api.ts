import { apiClient } from "shared/api";
import { type Department } from "../model";

export const fetchDepartments = async (): Promise<Department[]> => {
  const departments: Department[] = await apiClient.get("departments.json");
  return departments;
};
