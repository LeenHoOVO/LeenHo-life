<template>
  <div class="blog-content">
    <h1>最新文章</h1>
    <div class="posts-grid">
      <article class="post-card">
        <div class="post-content">
          <h2>Web网站初搭建</h2>
          <div class="post-meta">
            <span>作者: Astro 学习者</span>
            <span> • </span>
            <span>发布于: 2022-11-01</span>
            <span> • </span>
            <span>分类: 技术分享</span>
          </div>
          <p class="post-excerpt">
            在朋友和老师的建议下，我开始尝试搭建自己的个人网站。这是一次全新的尝试，虽然过程中遇到了不少困难...
          </p>
          <div class="tags">
            <span class="tag">astro</span>
            <span class="tag">blogging</span>
            <span class="tag">learning in public</span>
          </div>
          <a href="/posts/post-1/" class="read-more">阅读更多 →</a>
        </div>
      </article>
      
      <article class="post-card">
        <div class="post-content">
          <h2>确实</h2>
          <div class="post-meta">
            <span>作者: LeenHo</span>
            <span> • </span>
            <span>发布于: 2022-07-08</span>
            <span> • </span>
            <span>分类: 学习笔记</span>
          </div>
          <p class="post-excerpt">
            在学习 Astro 大约一周后，我决定尝试些新的东西。我编写并导入了一个小组件！
          </p>
          <div class="tags">
            <span class="tag">astro</span>
            <span class="tag">blogging</span>
            <span class="tag">learning in public</span>
            <span class="tag">successes</span>
          </div>
          <a href="/posts/post-2/" class="read-more">阅读更多 →</a>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加响应式数据和方法
</script>

<style scoped src="../styles/Blog.css"></style>
