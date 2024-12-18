<template>
  <header :class="styles.header">
    <div :class="styles.links">
      <Link
        v-for="link of LINKS"
        :key="link.to"
        :to="link.to"
        :title="link.title"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Link } from "../link";
import { LINKS } from "../../constants";

import styles from "./styles.module.css";
</script>
