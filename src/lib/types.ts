export type WordResult = {
  definition: string;
  partOfSpeech: string;
  synonyms?: string[];
  antonyms?: string[];
  typeOf?: string[];
  hasTypes?: string[];
  partOf?: string[];
  hasParts?: string[];
  instanceOf?: string[];
  hasInstances?: string[];
  similarTo?: string[];
  also?: string[];
  entails?: string[];
  derivation?: string[];
  examples?: string[];
  regionOf?: string[];
  memberOf?: string[];
};

export type Syllables = {
  count: number;
  list: string[];
};

export type WordsApiResponse = {
  word: string;
  results?: WordResult[];
  syllables?: Syllables;
  pronunciation?: Record<string, string>;
  rhymes?: { all: string[] };
  frequency: number;
};

export type PartsOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

export type WordRouteQuery = {
  partOfSpeech?: PartsOfSpeech;
};
