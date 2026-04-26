<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDictionaryStore } from '../stores/dictionary';

const store = useDictionaryStore();
// use storeToRefs for state and getters, search (the function) can be direct
const { isFetching, searchTerm } = storeToRefs(store);
const { goToWord } = store;
</script>

<template>
  <div class="flex gap-2">
    <InputText
      v-model="searchTerm"
      placeholder="Search a word..."
      class="flex-1"
      @keyup.enter="goToWord()"
      :disabled="isFetching"
    />
    <Button
      label="Search"
      icon="pi pi-search"
      @click="goToWord()"
      :loading="isFetching"
    />
  </div>
</template>
