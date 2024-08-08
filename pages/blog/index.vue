<template>
    <div class="blog-post-header">
        <h1 class="gradient-text">Articles récents</h1>
    </div>
    <div class="blog-list">
        <NuxtLink v-for="blogPost in blogPostList || []" :key="blogPost._path" :to="`/blog/${blogPost.slug}`">
            <BlogPostCard :blogPost="blogPost" />
        </NuxtLink>
        <Paginator :rows="10" :totalRecords="blogPostList?.length || 0"></Paginator>
    </div>
</template>

<script lang="ts" setup>
const { data: blogPostList } = await useAsyncData("blogPostList", () => {
    return queryContent("/blog").find();
});
</script>