import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRapidFetch } from '../api/rapidApi';
import { type WordResult, type WordsApiResponse } from '../lib/types';

export const useDictionaryStore = defineStore('dictionary', () => {
  // State
  const searchTerm = ref('');
  const currentWord = ref(''); // Track the word currently on screen
  const history = ref<string[]>([]);
  const isNotFound = ref<boolean>(false);
  const selectedPartOfSpeech = ref<string>();

  ///// Fetch Logic /////
  const fetchState = useRapidFetch(() => `/${searchTerm.value}`, {
    immediate: false,
  }).json<WordsApiResponse>();

  const { data, isFetching, error, execute, response } = fetchState;

  ///// Parts of Speech /////
  // 1. Get all parts of speech for current word
  const availablePartsOfSpeech = computed(() => {
    if (!data.value?.results) return [];
    return [...new Set(data.value.results.map((r) => r.partOfSpeech))].sort();
  });

  // 2. Group results by parts of speech, applying the filter if one is selected
  const groupedResults = computed<Record<string, WordResult[]>>(() => {
    if (!data.value?.results) return {};

    const results = selectedPartOfSpeech.value
      ? data.value.results.filter(
          (r) => r.partOfSpeech === selectedPartOfSpeech.value
        )
      : data.value.results;

    // Use reduce to group items by their partOfSpeech key
    return results.reduce(
      (acc, obj) => {
        const key = obj.partOfSpeech;
        if (!acc[key]) acc[key] = [];
        acc[key].push(obj);
        return acc;
      },
      {} as Record<string, WordResult[]>
    );
  });

  ///// Actions /////
  const search = async (word?: string) => {
    const targetWord = word || searchTerm.value;
    if (!targetWord || targetWord === currentWord.value) return;

    searchTerm.value = targetWord;
    await execute();

    if (response.value?.status === 404) {
      isNotFound.value = true;
      currentWord.value = '';
      return;
    }

    // ONLY move the previous word to history if the NEW search is successful
    // AND the new word actually has results
    if (data.value?.results && !error.value) {
      // 1. If there was a word already showing, move it to history
      if (currentWord.value) {
        // Create a unique set, putting the new word first
        const nextHistory = new Set([currentWord.value, ...history.value]);
        // Convert to array, keep the last 10 words
        history.value = Array.from(nextHistory).slice(0, 10); // Keep top 10
      }

      // 2. Set the new word as the current word
      currentWord.value = data.value.word.toLowerCase();

      // 3. Clear search input (optional, but keeps the UI clean)
      searchTerm.value = '';
    } else {
      // Clear the current display if the search failed
      // so the user doesn't see old data with a "not found" message
      currentWord.value = '';
    }

    // reset value since a word was found
    isNotFound.value = false;
  };

  const removeFromHistory = (wordToRemove: string) => {
    history.value = history.value.filter((word) => word !== wordToRemove);
  };

  return {
    history,
    isFetching,
    error,
    data,
    searchTerm,
    isNotFound,
    selectedPartOfSpeech,
    availablePartsOfSpeech,
    groupedResults,
    search,
    removeFromHistory,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}
