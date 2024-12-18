import { Ref } from "vue";

export interface Department {
  title: string;
  id: number;
}

export interface DepartmentsState {
  departments: Ref<Department[]>;
  getDepartments: () => Promise<void>;
  getNameById: (departmentId: number) => string;
}
