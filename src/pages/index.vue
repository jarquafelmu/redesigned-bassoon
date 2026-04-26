<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <DictionarySearchPanel />

  <div class="results-area mt-10">
    <!-- 1. Initial State (Nothing searched yet) -->
    <NoResults
      :title="t('empty.noResults.title')"
      :message="t('empty.noResults.message')"
      icon="pi pi-book"
    />
  </div>
</template>
