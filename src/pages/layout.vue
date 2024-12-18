<template>
  <div :class="styles.layout">
    <MainHeader :class="styles.header" />

    <div :class="styles.wrapper">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <template #default>
            <component :is="Component" />
          </template>
        </Suspense>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MainHeader } from "shared/ui";

import styles from "./styles.module.css";
</script>
