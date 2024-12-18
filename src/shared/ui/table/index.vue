<template>
  <article :class="styles.table">
    <div :class="styles.wrapper">
      <div
        :class="styles.header"
        :style="{ gridTemplateColumns: displayedGridTemplateColumns }"
      >
        <div v-for="column in columns" :key="column.key" :class="styles.column">
          <Typography as="span" variant="text-xs-1">
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
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :class="styles['row-column']"
          >
            <slot :name="column.key" :item="item">
              <Typography as="p" variant="text-s-2">
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
import { Typography } from "shared/ui";
import { type TableColumn, type TableItem } from "./types";

import styles from "./styles.module.css";

interface TableProps {
  columns: TableColumn[];
  data: TableItem[];
}

const props = defineProps<TableProps>();
const emits = defineEmits<{
  "select-all": [value: boolean];
  click: [void: TableItem];
}>();

const displayedGridTemplateColumns = computed(
  (): string => `repeat(${props.columns.length}, 1fr)`
);

const onClick = (item: TableItem): void => {
  emits("click", item);
};
</script>
