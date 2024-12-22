<template>
  <label :class="styles.checkbox">
    <CheckboxRoot v-bind="forwarded" :class="styles.root">
      <CheckboxIndicator :class="styles.indictor">
        <IconCheck />
      </CheckboxIndicator>
    </CheckboxRoot>

    <Typography variant="text-m-1" :class="styles.label">
      <slot />
    </Typography>
  </label>
</template>

<script setup lang="ts">
import {
  CheckboxIndicator,
  CheckboxRoot,
  useForwardPropsEmits,
} from "radix-vue";
import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";
import IconCheck from "shared/icons/check.svg";
import { Typography } from "../typography";

import styles from "./styles.module.css";

const props = defineProps<CheckboxRootProps>();
const emits = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
