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
  editDoctor: (doctor: Doctor) => void;
  createDoctor: (doctor: Omit<Doctor, "id">) => void;
  removeDoctor: (doctorId: number) => void;
  setSelectedDoctor: (doctorId: number) => void;
  resetSelectedDoctor: () => void;
}
