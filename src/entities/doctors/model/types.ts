import { Ref } from "vue";

export interface Doctor {
  id: number;
  name: string;
  departmentId: number;
  isHead: boolean;
}

export interface DoctorsState {
  doctors: Ref<Doctor[]>;
  getDoctors: () => Promise<void>;
}
