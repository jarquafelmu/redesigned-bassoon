import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';
import { useRapidFetch } from '../api/rapidApi';
import { firstOrValue } from '../lib/helper';
import {
  type PartsOfSpeech,
  type WordResult,
  type WordRouteQuery,
  type WordsApiResponse,
} from '../lib/types';

export const useDictionaryStore = defineStore('dictionary', () => {
  // State
  // Note: searchTerm and currentWord serve different purposes:
  // - searchTerm: temporary value while user types in search box
  // - currentWord: the word currently displayed on screen (only set after successful search)
  const searchTerm = ref('');
  const currentWord = ref(''); // Track the word currently on screen
  const history = ref<string[]>([]);
  const isNotFound = ref<boolean>(false);
  const selectedPartOfSpeech = ref<PartsOfSpeech>();
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
   * Fetches the definition for a given word and updates the store state accordingly.
   *
   * @param word The word to fetch definitions for. If not provided, uses the current searchTerm.
   */
  async function fetchWord(word: string): Promise<void> {
    searchTerm.value = word;

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
      addCurrentWordToHistory();

      // 2. Set the new word as the current word
      currentWord.value = data.value.word.toLowerCase();

      // 3. Clear search input (optional, but keeps the UI clean)
      searchTerm.value = '';

      // 4. Clear selected part of speech filter since we have new results
      selectedPartOfSpeech.value = undefined;
    } else {
      // Clear the current display if the search failed
      // so the user doesn't see old data with a "not found" message
      currentWord.value = '';
    }

    // reset value since a word was found
    isNotFound.value = false;
  }

  /**
   * Navigates to the route for a given word, which triggers the fetch and updates the store state.
   *
   * @param word The word to navigate to
   */
  function goToWord(word?: string): void {
    const targetWord = word || searchTerm.value;
    if (!targetWord || targetWord === currentWord.value) return;

    const query: WordRouteQuery = {
      ...(selectedPartOfSpeech.value && {
        partOfSpeech: selectedPartOfSpeech.value,
      }),
    };

    router.push({
      name: '/word/[word]',
      params: { word: targetWord },
      query,
    });
  }

  /**
   * Removes a word from the search history.
   * @param wordToRemove The word to remove from history
   */
  function removeFromHistory(wordToRemove: string): void {
    history.value = history.value.filter((word) => word !== wordToRemove);
  }

  /**
   * Adds the current word to the search history, ensuring uniqueness and limiting to the 10 most recent entries.
   */
  function addCurrentWordToHistory(): void {
    if (currentWord.value) {
      // Create a unique set, putting the new word first
      const nextHistory = new Set([currentWord.value, ...history.value]);
      // Convert to array, keep the last 10 words
      history.value = Array.from(nextHistory).slice(0, 10);
    }
  }

  /**
   * Synchronizes the store state with the current route parameters and query.
   *
   * This ensures that when a user navigates using the browser's back/forward buttons,
   * the store updates to reflect the word and part of speech specified in the URL.
   *
   * @param route The current route object from Vue Router
   */
  async function syncRouteToStore(
    route: RouteLocationNormalizedLoaded
  ): Promise<void> {
    const word = firstOrValue(route.params.word);
    const partOfSpeech = firstOrValue(route.query.partOfSpeech) as
      | PartsOfSpeech
      | undefined;

    if (word && word !== currentWord.value) {
      await fetchWord(word);
    }

    selectedPartOfSpeech.value = partOfSpeech;
  }

  /**
   * Synchronizes the part of speech selection with the route query.
   * @param partOfSpeech The part of speech to synchronize.
   */
  function syncPartOfSpeechToRoute(partOfSpeech?: PartsOfSpeech): void {
    if (!currentWord.value) return;

    const currentPartOfSpeech = firstOrValue(
      router.currentRoute.value.query.partOfSpeech
    );

    if (partOfSpeech === currentPartOfSpeech) return;

    router.replace({
      name: '/word/[word]',
      params: { word: currentWord.value },
      query: {
        // Omitting the key when undefined removes partOfSpeech from the URL.
        ...(partOfSpeech && { partOfSpeech }),
      },
    });
  }

  //// Watchers ////
  // Watch for URL changes (back / forward buttons)
  watch(() => router.currentRoute.value, syncRouteToStore, { immediate: true });

  // Watch for part of speech filter changes to sync with URL
  watch(selectedPartOfSpeech, syncPartOfSpeechToRoute);

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
    goToWord,
    removeFromHistory,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}
