<script setup lang="ts">
import { useRoute } from 'vue-router';

const items = [
    { label: "Explore", path: "/explore" },
    { label: "Favorites", path: "/favorites" },
    { label: "Blog", path: "/blog" },
    { label: "Portfolio", path: "/portfolio" },
]

const route = useRoute();
</script>

<template>
    <nav class="nav blur-background">
        <div class="nav-wrapper">
            <div class="nav-left">
                <NuxtLink class="nav-logo" to="/">
                    <!-- <i class="pi pi-chart-line"></i> -->
                    <img alt="thumbnail" src="/logo.png" style="width: 28px;" />

                    CryptoWatch
                </NuxtLink>

            </div>
            <div class="nav-left">
                <NuxtLink v-for="item in items" :class="['nav-item', { 'nav-item-active': route.path === item.path }]"
                    :to="item.path">
                    {{ item.label }}
                    <!-- <i class="pi pi-chevron-down nav-item-chevron"></i> -->
                </NuxtLink>
            </div>
            <NuxtLink class="nav-action" to="/login">
                <Button class="nav-left" severity="secondary" rounded>
                    Se Connecter
                </Button>
            </NuxtLink>
        </div>
    </nav>
</template>