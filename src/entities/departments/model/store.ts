import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchDepartments } from "../api";
import { type Department, type DepartmentsState } from "./types";

export const useDepartmentStore = defineStore(
  "departments",
  (): DepartmentsState => {
    const departments = ref<Department[]>([]);

    const getDepartments = async (): Promise<void> => {
      try {
        const departmentsResponse = await fetchDepartments();
        departments.value = departmentsResponse;
      } catch (error) {
        departments.value = [];
        return Promise.reject(error);
      }
    };

    const getNameById = (departmentId: number): string => {
      const candidate = departments.value.find(({ id }) => id === departmentId);
      if (!candidate) return "Не найдено";

      return candidate.title;
    };

    return {
      departments,
      getDepartments,
      getNameById,
    };
  }
);
