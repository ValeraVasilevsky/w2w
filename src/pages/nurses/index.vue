<template>
  <div :class="styles.container">
    <NursesTable />
  </div>
</template>

<script setup lang="ts">
import { NursesTable } from "widgets/nurses-table";

import styles from "./styles.module.css";
</script>
