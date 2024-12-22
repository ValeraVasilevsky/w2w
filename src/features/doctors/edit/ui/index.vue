<template>
  <form :class="styles.form" @submit.prevent="onSave">
    <div :class="styles.fields">
      <BaseInput
        v-model="values.name"
        placeholder="Имя врача"
        :error="!!errors?.name"
        :error-message="errors?.name?.message"
        :class="styles.input"
      />
      <Combobox
        v-model="values.department"
        :display-value="(v: unknown) => getTitleByKey(v as DepartmentKey) ?? ''"
        :class="styles.combobox"
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
      <BaseButton :disabled="isDoctorChanged" type="submit" @click="onSave">
        Сохранить
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { DepartmentKey, useDepartmentStore } from "entities/departments";
import { Doctor, useDoctorsStore } from "entities/doctors";
import { BaseInput, Combobox, ComboboxItem, BaseButton } from "shared/ui";
import { useForm } from "shared/utils/useForm";
import { doctorSchema, DEPARTMENTS } from "../model";

import styles from "./styles.module.css";

type FormType = "create" | "edit";
type FormEmits = {
  submit: [value: void];
};

const emits = defineEmits<FormEmits>();

const { getKeyById, getTitleByKey, getIdByKey } = useDepartmentStore();
const { editDoctor, createDoctor } = useDoctorsStore();
const { selectedDoctor } = storeToRefs(useDoctorsStore());

const preparedSelectedDoctor = computed(() => {
  if (!selectedDoctor.value)
    return {
      name: "",
      department: "",
    };

  return {
    name: selectedDoctor.value?.name ?? "",
    department: getKeyById(selectedDoctor.value?.departmentId) ?? "",
  };
});

const formType = computed(
  (): FormType => (selectedDoctor.value ? "edit" : "create")
);

const { values, errors, submit } = useForm(doctorSchema, {
  defaultValues: {
    name: preparedSelectedDoctor.value.name,
    department: preparedSelectedDoctor.value.department,
  },
});

const isDoctorChanged = computed((): boolean => {
  return (
    JSON.stringify(preparedSelectedDoctor.value) ===
    JSON.stringify({ name: values.name, department: values.department })
  );
});

const onSave = submit((): void => {
  if (formType.value === "edit") {
    if (!selectedDoctor.value) return;

    const editedDoctor: Doctor = {
      ...selectedDoctor.value,
      name: values.name,
      departmentId:
        getIdByKey(values.department as DepartmentKey) ??
        selectedDoctor.value?.departmentId,
    };
    editDoctor(editedDoctor);
  } else {
    const newDoctor: Omit<Doctor, "id"> = {
      name: values.name,
      departmentId: getIdByKey(values.department as DepartmentKey) ?? 1,
      isHead: false,
    };

    createDoctor(newDoctor);
  }

  emits("submit");
});
</script>
