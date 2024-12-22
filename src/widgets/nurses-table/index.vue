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
      title="Редактирование медсестры"
      @close="resetSelectedNurse"
    >
      <NursesForm :type="formType" @submit="closeModal" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { NursesForm } from "features/nurses";
import { useDepartmentStore } from "entities/departments";
import { useNursesStore } from "entities/nurses";
import {
  DataTable,
  TableItem,
  Modal,
  type TableColumn,
  Loader,
} from "shared/ui";

import styles from "./styles.module.css";

const { nurses } = storeToRefs(useNursesStore());

const { getNurses, setSelectedNurse, removeNurse, resetSelectedNurse } =
  useNursesStore();
const { getDepartments, getNameById } = useDepartmentStore();

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
]);

const isLoading = ref<boolean>(true);
const isOpen = ref<boolean>(false);
const formType = ref<"edit" | "create">("edit");

const data = computed((): TableItem[] => {
  return (
    nurses?.value.map((nurse) => ({
      ...nurse,
      title: nurse.name,
      department: getNameById(nurse.departmentId),
    })) || []
  );
});

const fetchData = async (): Promise<void> => {
  isLoading.value = true;

  console.log(getNurses)

  try {
    await getDepartments();
    await getNurses();
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

const onRemove = (item: TableItem): void => {
  removeNurse(item.id as number);
};
const onEdit = (item: TableItem): void => {
  setSelectedNurse(item.id as number);
  formType.value = "edit";
  openModal();
};
const onAdd = (): void => {
  formType.value = "create";
  openModal();
};

setTimeout(() => {
  fetchData();
}, 1000);
</script>
