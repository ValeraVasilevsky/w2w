import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchDoctors } from "../api";
import { type Doctor, type DoctorsState } from "./types";

export const useDoctorsStore = defineStore(
  "doctors",
  (): DoctorsState => {
    const doctors = ref<Doctor[]>([]);
    const selectedDoctor = ref<Doctor | null>(null);

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
      else selectedDoctor.value = candidate;
    };

    return {
      doctors,
      getDoctors,
      removeDoctor,
      editDoctor,
      selectedDoctor,
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
