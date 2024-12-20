import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchDoctors } from "../api";
import { type Doctor, type DoctorsState } from "./types";

export const useDoctorsStore = defineStore(
  "doctors",
  (): DoctorsState => {
    const doctors = ref<Doctor[]>([]);
    const selectedDoctor = ref<Doctor | null>(null);
    const copySelectedDoctor = ref<Doctor | null>(null);

    const getDoctors = async (): Promise<void> => {
      // Чтобы изменять хранилище
      if (doctors.value.length) return;

      try {
        const doctorsResponse = await fetchDoctors();
        doctors.value = doctorsResponse;
      } catch (error) {
        doctors.value = [];
        return Promise.reject(error);
      }
    };

    const removeDoctor = (doctorId: number): void => {
      doctors.value = doctors.value.filter(({ id }) => id !== doctorId);
    };

    const editDoctor = (doctorId: number): void => {};

    const setSelectedDoctor = (doctorId: number): void => {
      const candidate = doctors.value.find(({ id }) => id === doctorId);
      if (!candidate) selectedDoctor.value = null;
      else {
        selectedDoctor.value = candidate;
        copySelectedDoctor.value = selectedDoctor.value;
      }
    };

    const resetSelectedDoctor = (): void => {
      selectedDoctor.value = copySelectedDoctor.value;
    };

    return {
      doctors,
      selectedDoctor,
      copySelectedDoctor,
      resetSelectedDoctor,
      getDoctors,
      removeDoctor,
      editDoctor,
      setSelectedDoctor,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["doctors"],
    },
  }
);
