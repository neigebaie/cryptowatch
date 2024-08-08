<template>
    <div v-if="data">
        <div class="blog-post-nav">
            <NuxtLink to="/blog">
                <i class="pi pi-arrow-left"></i> Retour
            </NuxtLink>
            <div>Publié {{ formatAgo(new Date(data?.createdAt)) }}</div>
        </div>
        <div class="blog-post-header">
            <h1>{{ data.title }}</h1>
            <p>{{ data.summary }}</p>
        </div>
        <Divider />
        <div class="blog-post">
            <ContentRenderer :value="data || undefined" />
        </div>
    </div>

</template>

<script lang="ts" setup>
import { formatAgo } from '~/lib/utils';

const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
    return queryContent().where({ _path: path }).findOne()
})
</script>