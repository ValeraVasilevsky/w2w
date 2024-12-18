import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchDoctors } from "../api";
import { type Doctor, type DoctorsState } from "./types";

export const useDoctorsStore = defineStore(
  "doctors",
  (): DoctorsState => {
    const doctors = ref<Doctor[]>([]);

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

    return {
      doctors,
      getDoctors,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["doctors"],
    },
  }
);
