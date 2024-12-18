<template>
  <div :class="styles.container">
    <DoctorsTable />
  </div>
</template>

<script setup lang="ts">
import { DoctorsTable } from "widgets/doctors-table";

import styles from "./styles.module.css";
</script>
