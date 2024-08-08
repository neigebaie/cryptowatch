<style lang="scss">
@use "assets/scss/main.scss";
</style>

<script setup lang="ts">
useHead({
  title: 'CryptoWatch',
  meta: [
    { name: 'description', content: 'CryptoWatch' }
  ],
})

useSeoMeta({
  title: 'CryptoWatch',
  ogTitle: 'CryptoWatch',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
