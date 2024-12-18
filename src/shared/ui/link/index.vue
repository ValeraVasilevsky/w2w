<template>
  <RouterLink :to="props.to" :class="styles.link">
    <Typography variant="text-l-1">{{ props.title }}</Typography>
  </RouterLink>
</template>

<script setup lang="ts">
import { Typography } from "../typography";

import styles from "./styles.module.css";

interface LinkProps {
  to: string;
  title: string;
}

const props = defineProps<LinkProps>();
</script>
