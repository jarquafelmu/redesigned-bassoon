<script setup lang="ts">
import NoResults from './components/NoResults.vue';
import PartOfSpeechFilterBar from './components/PartOfSpeechFilterBar.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { useDictionaryStore } from './stores/dictionary';

const store = useDictionaryStore();
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-4 p-10">
    <header class="flex justify-between">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-300">
        Dictionary MVP
      </h1>
      <ThemeToggle />
    </header>

    <SearchBar />

    <HistoryList />

    <div class="results-area mt-10">
      <!-- 1. Initial State (Nothing searched yet) -->
      <NoResults
        v-if="!store.data && !store.error && !store.isFetching"
        title="Ready to Search?"
        message="Type a word above or click a recent search to get started."
        icon="pi pi-book"
      />

      <!-- 2. Loading State -->
      <div v-else-if="store.isFetching" class="flex justify-center p-20">
        <ProgressSpinner />
      </div>

      <!-- 3. Error / No Results Found -->
      <NoResults
        v-else-if="store.isNotFound"
        title="Word Not Found"
        message="We couldn't find any record of this word in our database. Please check your spelling."
        icon="pi pi-question-circle"
      />

      <!-- 4. Error / No Definitions Found -->
      <NoResults
        v-else-if="store.error || (store.data && !store.data.results)"
        title="No Definitions Found"
        message="That word exists in your database but has no definitions listed."
        icon="pi pi-question-circle"
      />

      <!-- 5. Success State -->
      <div v-else>
        <PartOfSpeechFilterBar />

        <DefinitionDisplay />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
