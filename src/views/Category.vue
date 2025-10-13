<template>
  <div class="article-list-page">
    <h1>分类: {{ categoryName }}</h1>
    <div v-if="articles.length > 0" class="articles-list">
      <div v-for="article in articles" :key="article.id" class="article-card">
        <h3>{{ article.title }}</h3>
        <p class="article-meta">作者: {{ article.author }} | 发布日期: {{ article.date }}</p>
        <p class="article-excerpt">{{ article.excerpt }}</p>
        <router-link :to="article.link" class="read-more">阅读更多 →</router-link>
      </div>
    </div>
    <p v-else>该分类下暂无文章。</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryName = ref(route.params.name)

// 模拟文章数据
const allArticles = [
  { id: 'post-1', title: 'Web网站初搭建', author: 'Astro 学习者', date: '2022-11-01', category: '技术分享', excerpt: '在朋友和老师的建议下，我开始尝试搭建自己的个人网站。这是一次全新的尝试...', link: '/posts/post-1' },
  { id: 'post-2', title: '确实', author: 'LeenHo', date: '2022-07-08', category: '学习笔记', excerpt: '在学习 Astro 大约一周后，我决定尝试些新的东西。我编写并导入了一个小组件！', link: '/posts/post-2' },
  // ... 更多文章
]

const articles = ref([])

const filterArticles = () => {
  articles.value = allArticles.filter(article => article.category === categoryName.value)
}

watch(() => route.params.name, (newName) => {
  categoryName.value = newName
  filterArticles()
}, { immediate: true })
</script>

<style scoped src="../styles/ArticleList.css"></style>
