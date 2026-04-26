<template>
  <DictionarySearchPanel />

  <div class="results-area mt-10">
    <!-- 1. Initial State (Nothing searched yet) -->
    <NoResults
      title="Ready to Search?"
      message="Type a word above or click a recent search to get started."
      icon="pi pi-book"
    />
  </div>
</template>
