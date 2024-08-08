<template>
    <Card v-if="props.blogPost" class="card post-card">
        <template #header>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <img alt="thumbnail" :src="props.blogPost.thumbnail" class="card-img" />
            </div>
        </template>
        <template #title>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; flex-direction: row; gap: 8px; align-items: center">
                    <Avatar :image="props.blogPost.authorAvatar" class="mr-2" size="normal" shape="circle" />
                    <p style="font-size: small;">
                        {{ props.blogPost.authorName }}
                    </p>
                </div>
                {{ props.blogPost.title }}
            </div>
        </template>
        <template #subtitle>
            {{ props.blogPost.summary }}
        </template>
        <template #footer>
            <div class="card-footer">
                <Tag severity="secondary" style="display: flex; gap: 4px; align-items: center;">
                    <i class="pi pi-clock"></i>
                    {{ formatAgo(new Date(props.blogPost.createdAt)) }}
                </Tag>
                <Tag v-for="tag in props.blogPost.tags" :key="tag" severity="primary"
                    style="display: flex; gap: 4px; align-items: center;">
                    <i class="pi pi-tag"></i>
                    {{ tag }}
                </Tag>
                <Tag severity="secondary" style="display: flex; gap: 4px; align-items: center;">
                    <i class="pi pi-book"></i>
                    {{ props.blogPost.readTime }} min
                </Tag>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { formatAgo } from '~/lib/utils';
const props = defineProps({
    blogPost: {
        type: Object,
        required: true
    }
});
</script>