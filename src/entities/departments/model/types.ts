import { Ref } from "vue";

export interface Department {
  title: string;
  id: number;
  key: DepartmentKey;
}

export interface DepartmentsState {
  departments: Ref<Department[]>;
  getDepartments: () => Promise<void>;
  getNameById: (departmentId: number) => string;
  getKeyById: (departmentId: number) => DepartmentKey | void;
  getTitleByKey: (departmentKey: DepartmentKey) => string | void;
  getIdByKey: (departmentKey: DepartmentKey) => number | undefined;
}

export type DepartmentKey = "surgery" | "cardiology";
