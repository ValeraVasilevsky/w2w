<template>
  <ComboboxItem v-bind="forwarded" :class="styles.item">
    <div :class="styles.wrapper">
      <ComboboxItemIndicator :class="styles.indicator">
        <CheckIcon />
      </ComboboxItemIndicator>
    </div>

    <Typography as="span" variant="text-m-1">
      {{ textValue || value }}
    </Typography>
  </ComboboxItem>
</template>

<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import {
  ComboboxItem,
  ComboboxItemIndicator,
  useForwardPropsEmits,
  type ComboboxItemProps as RadixComboboxItemProps,
  type ComboboxItemEmits,
} from "radix-vue";

import CheckIcon from "shared/icons/check.svg";
import { Typography } from "shared/ui";

import styles from "./styles.module.css";

interface ComboboxItemProps extends RadixComboboxItemProps {
  icon?: object | string;
  textValue?: string;
}
export type SelectEventType = ComboboxItemEmits["select"]["0"];

const props = defineProps<ComboboxItemProps>();
const emit = defineEmits<ComboboxItemEmits>();

const comboboxItemProps = reactiveOmit(props, "icon");
const forwarded = useForwardPropsEmits(comboboxItemProps, emit);
</script>
