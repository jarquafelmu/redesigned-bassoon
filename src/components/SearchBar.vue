<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDictionaryStore } from '../stores/dictionary';

const store = useDictionaryStore();
// use storeToRefs for state and getters, search (the function) can be direct
const { isFetching, searchTerm } = storeToRefs(store);
const { search } = store;
</script>

<template>
  <div class="flex gap-2">
    <InputText
      v-model="searchTerm"
      placeholder="Search a word..."
      class="flex-1"
      @keyup.enter="search()"
      :disabled="isFetching"
    />
    <Button
      label="Search"
      icon="pi pi-search"
      @click="search()"
      :loading="isFetching"
    />
  </div>
</template>
