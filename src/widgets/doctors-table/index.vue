<template>
  <div :class="styles.container">
    <DataTable v-if="!isLoading" :columns="columns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { useDepartmentStore } from "entities/departments";
import { useDoctorsStore } from "entities/doctors";
import { DataTable, TableItem, type TableColumn } from "shared/ui";

import styles from "./styles.module.css";

const { doctors } = storeToRefs(useDoctorsStore());
const { departments } = storeToRefs(useDepartmentStore());

const { getDepartments, getNameById } = useDepartmentStore();
const { getDoctors } = useDoctorsStore();

const columns = ref<TableColumn[]>([
  {
    title: "Номер",
    key: "id",
  },
  {
    title: "Имя",
    key: "name",
  },
  {
    title: "Отделение",
    key: "department",
  },
  {
    title: "Должность",
    key: "position",
  },
]);

const isLoading = ref<boolean>(true);
const data = ref<TableItem[]>([]);

const fetchData = async (): Promise<void> => {
  isLoading.value = true;

  try {
    await getDepartments();
    await getDoctors();

    prepareData();
  } catch (error) {
    console.error(error);
    return;
  } finally {
    isLoading.value = false;
  }
};

const getPosition = (isHead: boolean): string =>
  isHead ? "Заведующий" : "Специалист";

const prepareData = (): void => {
  if (!doctors.value.length || !departments.value.length) {
    data.value = [];
    return;
  }

  data.value = doctors.value.map((doctor) => ({
    ...doctor,
    title: doctor.name,
    department: getNameById(doctor.departmentId),
    position: getPosition(doctor.isHead),
  }));
};

onBeforeMount(async () => {
  await fetchData();
});
</script>
