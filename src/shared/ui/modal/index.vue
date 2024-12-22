<template>
  <DialogRoot v-bind="forwarded">
    <DialogPortal>
      <DialogOverlay :class="styles.overlay">
        <DialogContent
          :class="styles.content"
          @pointer-down-outside="onClickOutside"
        >
          <div :class="styles.header">
            <Typography variant="text-l-1">{{ props.title }}</Typography>
          </div>

          <slot />

          <DialogClose :class="styles.close">
            <CloseIcon @click="closeModal" />
          </DialogClose>
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  type DialogRootEmits,
  type DialogRootProps,
  useForwardPropsEmits,
} from "radix-vue";
import { Typography } from "../typography";
import CloseIcon from "../../icons/close.svg";

import styles from "./styles.module.css";

interface DialogProps extends DialogRootProps {
  title: string;
  zIndex?: number;
}
type DialogEmits = DialogRootEmits & {
  close: [value: void];
};

const emits = defineEmits<DialogEmits>();
const props = withDefaults(defineProps<DialogProps>(), {
  zIndex: 10,
});

const forwarded = useForwardPropsEmits(props, emits);

const closeModal = (): void => {
  emits("update:open", false);
};

const onClickOutside = (event: Event): void => {
  event.preventDefault();
};
</script>
