import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRapidFetch } from '../api/rapidApi';
import { type WordResult, type WordsApiResponse } from '../lib/types';
import { ROUTES, type DictionaryQuery } from '../router/routes';

export const useDictionaryStore = defineStore('dictionary', () => {
  // State
  // Note: searchTerm and currentWord serve different purposes:
  // - searchTerm: temporary value while user types in search box
  // - currentWord: the word currently displayed on screen (only set after successful search)
  const searchTerm = ref('');
  const currentWord = ref(''); // Track the word currently on screen
  const history = ref<string[]>([]);
  const isNotFound = ref<boolean>(false);
  const selectedPartOfSpeech = ref<string>();
  const router = useRouter();

  ///// Fetch Logic /////
  const fetchState = useRapidFetch(() => `/${searchTerm.value}`, {
    immediate: false,
  }).json<WordsApiResponse>();

  ///// API Response State /////
  // These values are automatically updated by useRapidFetch
  // - data: the actual word definition response
  // - isFetching: loading state during API call
  // - error: any errors that occurred
  // - execute: function to manually trigger the fetch
  // - response: the raw fetch response (used to check 404 status)
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
  /**
   * Search for a word in the dictionary
   * @param word The word to search for. If not provided, it will use the current searchTerm value.
   */
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

      // 3. Navigate to the word's route
      const query: DictionaryQuery = {
        word: currentWord.value,
        ...(selectedPartOfSpeech.value && {
          partOfSpeech: selectedPartOfSpeech.value,
        }),
      };
      router.push({
        name: ROUTES.DICTIONARY.name,
        query,
      });

      // 4. Clear search input (optional, but keeps the UI clean)
      searchTerm.value = '';

      // 5. Clear selected part of speech filter since we have new results
      selectedPartOfSpeech.value = undefined;
    } else {
      // Clear the current display if the search failed
      // so the user doesn't see old data with a "not found" message
      currentWord.value = '';
    }

    // reset value since a word was found
    isNotFound.value = false;
  };

  // Watch for URL changes (back / forward buttons)
  watch(
    () => router.currentRoute.value.query,
    async (query) => {
      const queryParams = query as DictionaryQuery;
      const word = queryParams.word;
      const partOfSpeech = queryParams.partOfSpeech;

      if (word && word !== currentWord.value) {
        await search(word);
        if (partOfSpeech) {
          selectedPartOfSpeech.value = partOfSpeech;
        }
      }
    },
    { immediate: true }
  );

  /**
   * Remove a word from the search history
   * @param wordToRemove The word to remove from history
   */
  const removeFromHistory = (wordToRemove: string) => {
    history.value = history.value.filter((word) => word !== wordToRemove);
  };

  return {
    // Fetch/API state
    isFetching,
    error,
    data,

    // UI state
    searchTerm,
    isNotFound,
    currentWord,
    history,
    selectedPartOfSpeech,

    // Computed/derived state
    availablePartsOfSpeech,
    groupedResults,

    // Actions
    search,
    removeFromHistory,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}
