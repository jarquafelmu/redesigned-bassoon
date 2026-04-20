<script setup lang="ts">
import { useDictionaryStore } from '../stores/dictionary';

const store = useDictionaryStore();

// Low frequency (rare) = Green (120)
// High frequency (common) = Red (0)
const getFrequencyColor = (freq: number) => {
  // Clamp between 1 and 7 just in case
  const clamped = Math.min(Math.max(freq, 1), 7.5);

  // Rare(1) -> Hue 0 (Red)
  // Common(7.5) -> Hue 120 (Green)
  // Formula (freq - 1) * (120 / 6))
  const hue = (clamped - 1) * 20;

  return `hsl(${hue}, 70%, 45%)`;
};
</script>

<template>
  <div v-if="store.data?.frequency" class="flex w-full max-w-xs flex-col gap-2">
    <div
      class="flex justify-between text-xs font-bold tracking-widest text-slate-500 uppercase"
    >
      <span>Rare</span>
      <span>Common</span>
    </div>

    <!-- The Meter -->
    <div
      class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
    >
      <div
        class="h-full transition-all duration-1000 ease-out"
        :style="{
          width: `${Math.min((store.data.frequency / 7.5) * 100, 100)}%`,
          backgroundColor: getFrequencyColor(store.data.frequency),
        }"
      />
    </div>

    <p class="text-xs text-slate-500 italic dark:text-slate-400">
      Frequency Store: {{ store.data.frequency.toFixed(2) }}
    </p>
  </div>
</template>
