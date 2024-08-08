<template>
    <div v-if="isFavorite(id)" class="cursor-pointer">
        <i class="pi pi-star-fill" @click="toggleFavorite(id)"></i>
    </div>
    <div v-else class="cursor-pointer">
        <i class="pi pi-star" @click="toggleFavorite(id)"></i>
    </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import { defineProps, computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const favoritesStore = useFavoritesStore();

favoritesStore.loadFavorites();

const toggleFavorite = (id: string) => {
    if (favoritesStore.isFavorite(id)) {
        favoritesStore.removeFavorite(id);
    } else {
        favoritesStore.addFavorite(id);
    }
};

const { isFavorite } = favoritesStore;
</script>
