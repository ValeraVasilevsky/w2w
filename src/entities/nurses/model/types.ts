import { Ref } from "vue";

export interface Nurse {
  id: number;
  name: string;
  departmentId: number;
}

export interface NursesState {
  nurses: Ref<Nurse[]>;
  selectedNurse: Ref<Nurse | null>;
  getNurses: () => Promise<void>;
  editNurse: (nurse: Nurse) => void;
  createNurse: (nurse: Omit<Nurse, "id">) => void;
  removeNurse: (nurseId: number) => void;
  setSelectedNurse: (nurseId: number) => void;
  resetSelectedNurse: () => void;
}
