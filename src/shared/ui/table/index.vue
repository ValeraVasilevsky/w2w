<template>
  <article :class="styles.table">
    <div :class="styles.wrapper">
      <div
        :class="styles.header"
        :style="{ gridTemplateColumns: displayedGridTemplateColumns }"
      >
        <div
          v-for="column in tableColumns"
          :key="column.key"
          :class="styles.column"
        >
          <Typography as="span" variant="text-m-1">
            {{ column.title }}
          </Typography>
        </div>
      </div>

      <div :class="styles.content">
        <div
          v-for="(item, rowIndex) in data"
          :key="rowIndex"
          :class="styles.row"
          :style="{ gridTemplateColumns: displayedGridTemplateColumns }"
          @click="onClick(item)"
        >
          <div
            v-for="(column, colIndex) in tableColumns"
            :key="colIndex"
            :class="styles['row-column']"
          >
            <slot :name="column.key" :item="item">
              <div v-if="column.key === 'actions'" :class="styles.actions">
                <BaseButton @click="(event: Event) => onEdit(event, item)">
                  <template #right-icon>
                    <EditIcon />
                  </template>
                </BaseButton>

                <BaseButton @click="(event: Event) => onRemove(event, item)">
                  <template #right-icon>
                    <RemoveIcon />
                  </template>
                </BaseButton>
              </div>

              <Typography v-else as="p" variant="text-s-2">
                {{ item[column.key] }}
              </Typography>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Typography, BaseButton } from "shared/ui";
import { type TableColumn, type TableItem } from "./types";

import EditIcon from "../../icons/edit.svg";
import RemoveIcon from "../../icons/remove.svg";

import styles from "./styles.module.css";

interface TableProps {
  columns: TableColumn[];
  data: TableItem[];
  hasActions?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
  hasActions: false,
});
const emits = defineEmits<{
  click: [void: TableItem];
  remove: [void: TableItem];
  edit: [void: TableItem];
}>();

const tableColumns = computed((): TableColumn[] => {
  if (!props.hasActions) return props.columns;
  return [...props.columns, { title: "", key: "actions" }];
});

const displayedGridTemplateColumns = computed(
  (): string =>
    `repeat(${
      props.hasActions ? props.columns.length + 1 : props.columns.length
    }, minmax(120px, 1fr))`
);

const onClick = (item: TableItem): void => {
  emits("click", item);
};

const onRemove = (event: Event, item: TableItem): void => {
  event.stopPropagation();
  emits("remove", item);
};

const onEdit = (event: Event, item: TableItem): void => {
  event.stopPropagation();
  emits("edit", item);
};
</script>
