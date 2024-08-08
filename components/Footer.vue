<script setup lang="ts">
const footerItems = [
    { label: "Terms", path: "/tos" },
    { label: "Contact", path: "/blog" },
    { label: "About", path: "/about" }
]
</script>

<template>
    <nav class="footer">
        <div class="footer-wrapper">
            <div class="footer-list">
                <NuxtLink v-for="item in footerItems" :to="item.path">
                    {{ item.label }}
                </NuxtLink>
            </div>
            Made with 🖤 2024 CryptoWatch ― All rights reserved.

        </div>
    </nav>
</template>