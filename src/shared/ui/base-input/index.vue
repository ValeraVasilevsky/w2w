<template>
  <div :class="styles.wrapper">
    <input
      v-model="inputValue"
      :class="styles.input"
      :type="props.type"
      :placeholder="props.placeholder"
      @input="onInput"
    />

    <Typography v-if="props.error" variant="text-m-1" :class="styles.error">
      {{ errorMessage }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Typography } from "../typography";

import styles from "./styles.module.css";

type BaseInputEmits = {
  "update:model-value": [value: string];
};
type BaseInputType = "text" | "number" | "password";
interface BaseInputProps {
  modelValue: string;
  placeholder: string;
  type?: BaseInputType;
  error?: boolean;
  errorMessage?: string;
}

const emits = defineEmits<BaseInputEmits>();
const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
  error: false,
  errorMessage: "",
});

const inputValue = ref<string>(props.modelValue);

const onInput = (): void => {
  emits("update:model-value", inputValue.value);
};
</script>
