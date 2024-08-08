<template>
    <h1 class="gradient-text">Favorites cryptos</h1>
    <!-- <pre>{{ favorites }}</pre> -->
    <CryptoTable :filter="favorites" />
</template>

<script lang="ts" setup>
import { useFavoritesStore } from '@/stores/favorites'
const store = useFavoritesStore()

store.loadFavorites()

const { favorites } = store
</script>