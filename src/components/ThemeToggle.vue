<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

// useDark defaults to checking the .dark class on <html>
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <Button
    :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
    severity="secondary"
    rounded
    text
    @click="toggleDark()"
  />
</template>
