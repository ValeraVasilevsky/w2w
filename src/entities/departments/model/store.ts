import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchDepartments } from "../api";
import {
  type Department,
  type DepartmentsState,
  type DepartmentKey,
} from "./types";

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

    const getKeyById = (departmentId: number): DepartmentKey | void => {
      const candidate = departments.value.find(({ id }) => id === departmentId);
      if (!candidate) return;

      return candidate.key;
    };

    const getIdByKey = (departmentKey: DepartmentKey): number | undefined => {
      return departments.value.find(({ key }) => key === departmentKey)?.id;
    };

    const getTitleByKey = (departmentKey: DepartmentKey): string | void => {
      return departments.value.find(({ key }) => key === departmentKey)?.title;
    };

    return {
      departments,
      getDepartments,
      getNameById,
      getKeyById,
      getTitleByKey,
      getIdByKey,
    };
  }
);
