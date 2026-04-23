<script setup lang="ts">
import { CHIP_VARIANTS, type ChipVariants } from '../lib/constants';
import { useDictionaryStore } from '../stores/dictionary';

interface Props {
  word: string;
  variant?: ChipVariants;
  removable?: boolean;
}
const {
  word,
  variant = CHIP_VARIANTS.SYNONYM,
  removable = false,
} = defineProps<Props>();

const store = useDictionaryStore();

const variants = {
  [CHIP_VARIANTS.HISTORY]: `
      bg-sky-50! hover:bg-sky-100! text-sky-700!
      dark:bg-sky-950! dark:text-sky-300! dark:border-sky-800!
      dark:hover:bg-sky-900! dark:hover:border-sky-700!
    `,
  [CHIP_VARIANTS.SYNONYM]: `
      bg-emerald-50! hover:bg-emerald-100! text-emerald-700!
      dark:bg-emerald-950! dark:text-emerald-300! dark:border-emerald-800!
      dark:hover:bg-emerald-900! dark:hover:border-emerald-700!
      dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]     
    `,
};
</script>

<template>
  <Chip
    :label="word"
    :removable
    :class="[
      'cursor-pointer border border-transparent text-xs',
      variants[variant],
      { 'pointer-events-none opacity-50': store.isFetching },
      // Target the remove icon specifically
      // 1. Base icon state
      '[&_.p-chip-remove-icon]:cursor-default! [&_.p-chip-remove-icon]:transition-colors [&_.p-chip-remove-icon]:duration-200!',
      '[&_.p-chip-remove-icon]:text-slate-400!',

      // 2. Hover state for the icon
      'hover:[&_.p-chip-remove-icon]:bg-red-100! hover:[&_.p-chip-remove-icon]:text-red-600!',

      // 3. Dark mode overrides
      'dark:[&_.p-chip-remove-icon]:text-slate-500!',
      'dark:hover:[&_.p-chip-remove-icon]:bg-red-900/50! dark:hover:[&_.p-chip-remove-icon]:text-red-400!',
    ]"
    @click="store.isFetching ? null : store.search(word)"
    @remove.stop="store.removeFromHistory(word)"
  />
</template>

<style scoped></style>
