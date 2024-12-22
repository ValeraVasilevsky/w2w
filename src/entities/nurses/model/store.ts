import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchNurses } from "../api";
import { type Nurse, type NursesState } from "./types";

export const useNursesStore = defineStore(
  "doctors",
  (): NursesState => {
    const nurses = ref<Nurse[]>([]);
    const selectedNurse = ref<Nurse | null>(null);

    const getNurses = async (): Promise<void> => {
      // Чтобы изменять хранилище
      if (nurses.value.length) return;

      try {
        const nursesResponse = await fetchNurses();
        nurses.value = nursesResponse;
      } catch (error) {
        nurses.value = [];
        return Promise.reject(error);
      }
    };

    const removeNurse = (nurseId: number): void => {
      nurses.value = nurses.value.filter(({ id }) => id !== nurseId);
    };

    const editNurse = (nurse: Nurse): void => {
      if (!selectedNurse.value) return;

      const candidateIndex = nurses.value.findIndex(
        ({ id }) => id === nurse.id
      );

      nurses.value.splice(candidateIndex, 1, nurse);
      resetSelectedNurse();
    };

    const createNurse = (nurse: Omit<Nurse, "id">): void => {
      const maxId: number = nurses.value.length
        ? Math.max(...nurses.value.map(({ id }) => id))
        : 0;

      const newNurse: Nurse = {
        ...nurse,
        id: maxId + 1,
      };

      nurses.value.push(newNurse);
    };

    const setSelectedNurse = (nurseId: number): void => {
      const candidate = nurses.value.find(({ id }) => id === nurseId);

      if (!candidate) selectedNurse.value = null;
      else {
        selectedNurse.value = candidate;
      }
    };

    const resetSelectedNurse = (): void => {
      selectedNurse.value = null;
    };

    return {
      nurses,
      selectedNurse,
      resetSelectedNurse,
      getNurses,
      removeNurse,
      editNurse,
      setSelectedNurse,
      createNurse,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["nurses"],
    },
  }
);
