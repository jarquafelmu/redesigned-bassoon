<script setup lang="ts">
interface Props {
  title: string;
  message: string;
  icon?: string;
}

const { title, message, icon = 'pi pi-search' } = defineProps<Props>();
</script>

<template>
  <div
    class="animate-in fade-in zoom-in flex flex-col items-center justify-center p-12 text-center duration-500"
  >
    <div
      class="duratioon-500 mb-6 rounded-full bg-slate-100 p-6 ring-8 ring-slate-50 transition-all dark:bg-slate-900 dark:ring-slate-950/50 dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
    >
      <i :class="[icon, 'text-4xl text-slate-400 dark:text-slate-500']" />
    </div>

    <h3 class="mb-2 text-xl font-bold text-slate-700 dark:text-slate-200">
      {{ title }}
    </h3>

    <p
      class="mx-auto max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400"
    >
      {{ message }}
    </p>
  </div>
</template>
