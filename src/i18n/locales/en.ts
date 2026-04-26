export default {
  app: {
    title: 'Dictionary Response Rendering',
  },
  search: {
    placeholder: 'Search a word...',
    submit: 'Search',
  },
  history: {
    recent: 'Recent:',
  },
  empty: {
    ready: {
      title: 'Ready to Search?',
      message: 'Type a word above or click a recent search to get started.',
    },
    notFound: {
      title: 'Word Not Found',
      message:
        "We couldn't find any record of this word in our database. Please check your spelling.",
    },
    noDefinitions: {
      title: 'No Definitions Available',
      message:
        'We found the word, but there are no definitions available for it.',
    },
    error: {
      title: 'An Error Occurred',
      message:
        'Something went wrong while fetching the word data. Please try again later.',
    },
  },
  frequency: {
    rare: 'Rare',
    common: 'Common',
    score: 'Frequency Score: {score}',
  },
  partsOfSpeech: {
    noun: 'Noun',
    verb: 'Verb',
    adjective: 'Adjective',
    adverb: 'Adverb',
    pronoun: 'Pronoun',
    preposition: 'Preposition',
    conjunction: 'Conjunction',
    interjection: 'Interjection',
  },
};
