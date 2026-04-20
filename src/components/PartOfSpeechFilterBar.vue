<script setup lang="ts">
import { useDictionaryStore } from '../stores/dictionary';

const store = useDictionaryStore();
</script>

<template>
  <div
    v-if="store.availablePartsOfSpeech.length > 1"
    class="mb-6 flex justify-center"
  >
    <SelectButton
      v-model="store.selectedPartOfSpeech"
      :options="store.availablePartsOfSpeech"
      aria-labelledby="basic"
      class="text-xs!"
    />
  </div>
</template>
