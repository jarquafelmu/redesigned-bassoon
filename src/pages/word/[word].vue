<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DictionarySearchPanel from '../../components/DictionarySearchPanel.vue';
import { firstOrValue } from '../../lib/helper';
import { useDictionaryStore } from '../../stores/dictionary';

const store = useDictionaryStore();

const route = useRoute();
const word = computed(() => firstOrValue(route.params.word));

useTitle(
  computed(() =>
    word.value ? `${word.value} | Dictionary MVP` : 'Dictionary MVP'
  )
);
</script>

<template>
  <DictionarySearchPanel />

  <div class="results-area mt-10">
    <!-- 2. Loading State -->
    <div v-if="store.isFetching" class="flex justify-center p-20">
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
      <PartOfSpeechFilter />

      <DefinitionDisplay />
    </div>
  </div>
</template>
