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

    const editDoctor = (doctor: Doctor): void => {
      if (!selectedDoctor.value) return;

      const candidateIndex = doctors.value.findIndex(
        ({ id }) => id === doctor.id
      );

      doctors.value.splice(candidateIndex, 1, doctor);
      resetSelectedDoctor();
    };

    const createDoctor = (doctor: Omit<Doctor, "id">): void => {
      const maxId: number = doctors.value.length
        ? Math.max(...doctors.value.map(({ id }) => id))
        : 0;

      const newDoctor: Doctor = {
        ...doctor,
        id: maxId + 1,
      };

      doctors.value.push(newDoctor);
    };

    const setSelectedDoctor = (doctorId: number): void => {
      const candidate = doctors.value.find(({ id }) => id === doctorId);

      if (!candidate) selectedDoctor.value = null;
      else {
        selectedDoctor.value = candidate;
      }
    };

    const resetSelectedDoctor = (): void => {
      selectedDoctor.value = null;
    };

    return {
      doctors,
      selectedDoctor,
      resetSelectedDoctor,
      getDoctors,
      removeDoctor,
      editDoctor,
      setSelectedDoctor,
      createDoctor,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["doctors"],
    },
  }
);
