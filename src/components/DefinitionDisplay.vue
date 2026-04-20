<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDictionaryStore } from '../stores/dictionary';
import FrequencyMeter from './FrequencyMeter.vue';

const store = useDictionaryStore();
const { data } = storeToRefs(store);
</script>

<template>
  <div v-if="data">
    <h1 class="text-4xl font-bold capitalize">{{ data.word }}</h1>

    <FrequencyMeter class="my-5" />

    <div class="min-h relative">
      <TransitionGroup name="fade-slide" tag="div" class="flex flex-col gap-8">
        <div
          v-for="partOfSpeech in store.selectedPartOfSpeech
            ? [store.selectedPartOfSpeech]
            : store.availablePartsOfSpeech"
          :key="partOfSpeech"
          class="mb-10"
        >
          <div class="mb-4 flex items-center gap-4">
            <h3
              class="text-xl font-black tracking-widest text-sky-600 uppercase dark:text-sky-400"
            >
              {{ partOfSpeech }}
            </h3>

            <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div class="flex flex-col gap-4">
            <Card
              v-for="(res, index) in store.groupedResults[partOfSpeech]"
              :key="index"
              class="border shadow-none dark:border-slate-800! dark:bg-slate-900/50!"
            >
              <template #content>
                <div class="flex flex-col gap-2">
                  <p class="text-lg text-slate-700 dark:text-slate-400">
                    {{ res.definition }}
                  </p>

                  <div v-if="res.synonyms" class="mt-3 flex flex-wrap gap-2">
                    <WordChip
                      v-for="syn in res.synonyms"
                      :key="syn"
                      :word="syn"
                      variant="synonym"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
