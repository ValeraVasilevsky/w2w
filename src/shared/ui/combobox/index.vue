<template>
  <ComboboxRoot v-bind="forwarded" :class="styles.combobox">
    <ComboboxAnchor>
      <ComboboxTrigger :class="styles.input">
        <ComboboxInput readonly />

        <div :class="styles.trigger">
          <ChevronDownIcon />
        </div>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <Typography v-if="props.error" variant="text-m-1" :class="styles.error">
      {{ props.errorMessage }}
    </Typography>

    <ComboboxContent :class="styles.options" disable-outside-pointer-events>
      <slot />
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxRoot,
  ComboboxTrigger,
  type ComboboxRootProps,
  type ComboboxRootEmits,
  useForwardPropsEmits,
  ComboboxInput,
} from "radix-vue";
import { Typography } from "../typography";
import ChevronDownIcon from "shared/icons/chevron-down.svg";

import styles from "./styles.module.css";

interface ComboboxProps extends ComboboxRootProps {
  error?: boolean;
  errorMessage?: string;
}

const emits = defineEmits<ComboboxRootEmits>();
const props = withDefaults(defineProps<ComboboxProps>(), {
  error: false,
  errorMessage: "",
});

const forwarded = useForwardPropsEmits(props, emits);
</script>
