<template>
  <form :class="styles.form" @submit.prevent="onSave">
    <div :class="styles.fields">
      <BaseInput
        v-model="values.name"
        placeholder="Имя медсестры"
        :error="!!errors?.name"
        :error-message="errors?.name?.message"
        :class="styles.input"
      />
      <Combobox
        v-model="values.department"
        :display-value="(v: unknown) => getTitleByKey(v as DepartmentKey) ?? ''"
        :class="styles.combobox"
        :error="!!errors?.department"
        :error-message="errors?.department?.message"
      >
        <ComboboxItem
          v-for="department of DEPARTMENTS"
          :key="department"
          :value="department"
          :text-value="getTitleByKey(department as DepartmentKey) ?? department"
        />
      </Combobox>
    </div>

    <div :class="styles.actions">
      <BaseButton :disabled="isNurseChanged || isLoading" type="submit">
        Сохранить
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { DepartmentKey, useDepartmentStore } from "entities/departments";
import { Nurse, useNursesStore } from "entities/nurses";
import { BaseInput, Combobox, ComboboxItem, BaseButton } from "shared/ui";
import { useForm } from "shared/utils/useForm";
import { nurseSchema, DEPARTMENTS } from "../model";

import styles from "./styles.module.css";

type FormType = "create" | "edit";
type FormEmits = {
  submit: [value: void];
};

interface FormProps {
  type: FormType;
}

const emits = defineEmits<FormEmits>();
const props = defineProps<FormProps>();

const { getKeyById, getTitleByKey, getIdByKey } = useDepartmentStore();
const { editNurse, createNurse } = useNursesStore();
const { selectedNurse } = storeToRefs(useNursesStore());

const isLoading = ref<boolean>(false);

const preparedSelectedNurse = computed(() => {
  if (!selectedNurse.value)
    return {
      name: "",
      department: "",
    };

  return {
    name: selectedNurse.value?.name ?? "",
    department: getKeyById(selectedNurse.value?.departmentId) ?? "",
  };
});

const { values, errors, submit } = useForm(nurseSchema, {
  defaultValues: {
    name: preparedSelectedNurse.value.name,
    department: preparedSelectedNurse.value.department,
  },
});

const isNurseChanged = computed((): boolean => {
  return (
    JSON.stringify(preparedSelectedNurse.value) ===
    JSON.stringify({
      name: values.name,
      department: values.department,
    })
  );
});

const onSave = submit((): void => {
  isLoading.value = true;

  if (props.type === "edit") {
    if (!selectedNurse.value) return;

    const editedNurse: Nurse = {
      ...selectedNurse.value,
      name: values.name,
      departmentId:
        getIdByKey(values.department as DepartmentKey) ??
        selectedNurse.value?.departmentId,
    };
    editNurse(editedNurse);
  } else {
    const newNurse: Omit<Nurse, "id"> = {
      name: values.name,
      departmentId: getIdByKey(values.department as DepartmentKey) ?? 1,
    };

    createNurse(newNurse);
  }

  isLoading.value = false;
  emits("submit");
});
</script>
