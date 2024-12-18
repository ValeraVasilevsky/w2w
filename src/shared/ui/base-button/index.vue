<template>
  <button :type="props.type" :disabled="isDisabled" :class="buttonClasses">
    <Typography v-if="slots['default']" variant="text-l-2">
      <slot />
    </Typography>

    <div :class="styles.icon">
      <slot name="right-icon" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Typography } from "../typography";

import styles from "./styles.module.css";

interface BaseButtonProps {
  type?: "submit" | "button";
  loading?: boolean;
  disabled?: boolean;
}

const slots = defineSlots<{
  default(props: object): never;
  "right-icon"(props: object): never;
}>();
const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: "button",
  loading: false,
  disabled: false,
});

const isDisabled = computed((): boolean => props.loading || props.disabled);
const buttonClasses = computed((): string[] => {
  const classes: string[] = [styles.button];

  if (!slots["default"]) classes.push(styles.iconOnly);

  return classes;
});
</script>
