<template>
  <form :class="styles.form">
    <BaseInput
      v-model="values.name"
      placeholder="Имя врача"
      :error="!!errors?.name"
      :error-message="errors?.name?.message"
    />
    <Combobox
      v-model="values.department"
      :display-value="(v: unknown) => getTitleByKey(v as DepartmentKey) ?? ''"
    >
      <ComboboxItem
        v-for="department of DEPARTMENTS"
        :key="department"
        :value="department"
        :text-value="getTitleByKey(department as DepartmentKey) ?? department"
      />
    </Combobox>
    {{ values.department }}
    {{ getTitleByKey(values.department as DepartmentKey) }}
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { DepartmentKey, useDepartmentStore } from "entities/departments";
import { useDoctorsStore } from "entities/doctors";
import { BaseInput, Combobox, ComboboxItem } from "shared/ui";
import { useForm } from "shared/utils/useForm";
import { doctorSchema, DEPARTMENTS } from "../model";

import styles from "./styles.module.css";

const { getKeyById, getTitleByKey } = useDepartmentStore();
const { copySelectedDoctor } = storeToRefs(useDoctorsStore());

const preparedSelectedDoctor = computed(() => {
  if (!copySelectedDoctor.value)
    return {
      name: "",
      department: "",
    };

  return {
    name: copySelectedDoctor.value?.name ?? "",
    department: getKeyById(copySelectedDoctor.value?.id) ?? "",
  };
});
const { values, errors } = useForm(doctorSchema, {
  defaultValues: {
    name: preparedSelectedDoctor.value.name,
    department: preparedSelectedDoctor.value.department,
  },
});
</script>
