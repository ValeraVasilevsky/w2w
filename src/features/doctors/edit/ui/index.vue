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

      <Checkbox v-model:checked="values.isHead">Заведующий</Checkbox>
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
import {
  BaseInput,
  Combobox,
  ComboboxItem,
  BaseButton,
  Checkbox,
} from "shared/ui";
import { useForm } from "shared/utils/useForm";
import { doctorSchema, DEPARTMENTS } from "../model";

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
const { editDoctor, createDoctor } = useDoctorsStore();
const { selectedDoctor } = storeToRefs(useDoctorsStore());

const preparedSelectedDoctor = computed(() => {
  if (!selectedDoctor.value)
    return {
      name: "",
      department: "",
      isHead: false,
    };

  return {
    name: selectedDoctor.value?.name ?? "",
    department: getKeyById(selectedDoctor.value?.departmentId) ?? "",
    isHead: selectedDoctor.value.isHead,
  };
});

const { values, errors, submit } = useForm(doctorSchema, {
  defaultValues: {
    name: preparedSelectedDoctor.value.name,
    department: preparedSelectedDoctor.value.department,
    isHead: preparedSelectedDoctor.value.isHead,
  },
});

const isDoctorChanged = computed((): boolean => {
  return (
    JSON.stringify(preparedSelectedDoctor.value) ===
    JSON.stringify({
      name: values.name,
      department: values.department,
      isHead: values.isHead,
    })
  );
});

const onSave = submit((): void => {
  if (props.type === "edit") {
    if (!selectedDoctor.value) return;

    const editedDoctor: Doctor = {
      ...selectedDoctor.value,
      name: values.name,
      departmentId:
        getIdByKey(values.department as DepartmentKey) ??
        selectedDoctor.value?.departmentId,
      isHead: values.isHead,
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
