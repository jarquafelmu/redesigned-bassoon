<script setup lang="ts"></script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-4 p-10">
    <header class="flex justify-between">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-300">
        Dictionary MVP
      </h1>

      <ThemeToggle />
    </header>

    <router-view />
  </div>
</template>

<style scoped></style>
