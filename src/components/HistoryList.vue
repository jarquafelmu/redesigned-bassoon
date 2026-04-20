<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDictionaryStore } from '../stores/dictionary';

const store = useDictionaryStore();
// use storeToRefs for state and getters, search (the function) can be direct
const { history } = storeToRefs(store);
</script>

<template>
  <div v-if="history.length" class="relative flex flex-wrap items-center gap-2">
    <span class="mr-2 text-sm font-semibold text-slate-500">Recent:</span>
    <TransitionGroup name="list">
      <WordChip
        v-for="word in history"
        :key="word"
        :word="word"
        removable
        variant="history"
      />
    </TransitionGroup>
  </div>
</template>
