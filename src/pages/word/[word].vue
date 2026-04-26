<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import DictionarySearchPanel from '../../components/DictionarySearchPanel.vue';
import { firstOrValue } from '../../lib/helper';
import { useDictionaryStore } from '../../stores/dictionary';

const { t } = useI18n();
const store = useDictionaryStore();

const route = useRoute();
const word = computed(() => firstOrValue(route.params.word));

useTitle(
  computed(() =>
    word.value ? `${word.value} | ${t('app.title')}` : t('app.title')
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
      :title="t('empty.notFound.title')"
      :message="t('empty.notFound.message')"
      icon="pi pi-question-circle"
    />

    <!-- 4. Error / No Definitions Found -->
    <NoResults
      v-else-if="store.error || (store.data && !store.data.results)"
      :title="t('empty.noDefinitions.title')"
      :message="t('empty.noDefinitions.message')"
      icon="pi pi-question-circle"
    />

    <!-- 5. Success State -->
    <div v-else>
      <PartOfSpeechFilter />

      <DefinitionDisplay />
    </div>
  </div>
</template>
