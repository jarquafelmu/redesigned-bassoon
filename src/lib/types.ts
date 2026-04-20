export type WordResult = {
  definition: string;
  partOfSpeech: string;
  synonyms?: string[];
  typeOf?: string[];
  derivation?: string[];
  examples?: string[];
};

export type Syllables = {
  count: number;
  list: string[];
};

export type WordsApiResponse = {
  word: string;
  results?: WordResult[];
  syllables?: Syllables;
  pronunciation?: string | Record<string, string>;
  rhymes?: { all: string[] };
  frequency: number;
};
