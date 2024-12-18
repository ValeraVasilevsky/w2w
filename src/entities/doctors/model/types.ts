import { Ref } from "vue";

export interface Doctor {
  id: number;
  name: string;
  departmentId: number;
  isHead: boolean;
}

export interface DoctorsState {
  doctors: Ref<Doctor[]>;
  selectedDoctor: Ref<Doctor | null>;
  getDoctors: () => Promise<void>;
  editDoctor: (doctorId: number) => void;
  removeDoctor: (doctorId: number) => void;
  setSelectedDoctor: (doctorId: number) => void;
}
