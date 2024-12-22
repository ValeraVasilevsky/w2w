<template>
  <div :class="styles.container">
    <Loader v-if="isLoading" />
    <DataTable
      v-else
      has-actions
      :columns="columns"
      :data="data"
      @remove="onRemove"
      @edit="onEdit"
      @add="onAdd"
    />

    <Modal
      v-model:open="isOpen"
      title="Редактирование врача"
      @close="resetSelectedDoctor"
    >
      <DoctorEditForm :type="formType" @submit="closeModal" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { DoctorEditForm } from "features/doctors";
import { useDepartmentStore } from "entities/departments";
import { useDoctorsStore } from "entities/doctors";
import {
  DataTable,
  TableItem,
  Modal,
  type TableColumn,
  Loader,
} from "shared/ui";

import styles from "./styles.module.css";

const { doctors } = storeToRefs(useDoctorsStore());
const { departments } = storeToRefs(useDepartmentStore());

const { getDepartments, getNameById } = useDepartmentStore();
const { getDoctors, setSelectedDoctor, removeDoctor, resetSelectedDoctor } =
  useDoctorsStore();

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
const isOpen = ref<boolean>(false);
const formType = ref<"edit" | "create">("edit");

const data = computed((): TableItem[] => {
  if (!departments.value.length || !doctors.value.length) return [];

  return doctors.value.map((doctor) => ({
    ...doctor,
    title: doctor.name,
    department: getNameById(doctor.departmentId),
    position: getPosition(doctor.isHead),
  }));
});

const fetchData = async (): Promise<void> => {
  isLoading.value = true;

  try {
    await getDepartments();
    await getDoctors();
  } catch (error) {
    console.error(error);
    return;
  } finally {
    isLoading.value = false;
  }
};

const openModal = (): void => {
  isOpen.value = true;
};
const closeModal = (): void => {
  isOpen.value = false;
};
const getPosition = (isHead: boolean): string =>
  isHead ? "Заведующий" : "Специалист";

const onRemove = (item: TableItem): void => {
  removeDoctor(item.id as number);
};
const onEdit = (item: TableItem): void => {
  setSelectedDoctor(item.id as number);
  formType.value = "edit";
  openModal();
};
const onAdd = (): void => {
  formType.value = "create";
  openModal();
};

onBeforeMount(async () => {
  setTimeout(async () => {
    await fetchData();
  }, 1000);
});
</script>
