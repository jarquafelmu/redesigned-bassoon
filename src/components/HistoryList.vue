<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useDictionaryStore } from '../stores/dictionary';

const { t } = useI18n();
const store = useDictionaryStore();
// use storeToRefs for state and getters
const { history } = storeToRefs(store);
</script>

<template>
  <div v-if="history.length" class="relative flex flex-wrap items-center gap-2">
    <span class="mr-2 text-sm font-semibold text-slate-500">
      {{ t('history.recent') }}
    </span>

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
