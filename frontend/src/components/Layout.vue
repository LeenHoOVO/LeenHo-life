<template>
  <div id="app-content">
    <!-- 导航栏 -->
    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-group">
          <div class="nav-links">
            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</router-link>
            <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">关于</router-link>
            <router-link to="/blog" class="nav-link" :class="{ active: $route.path === '/blog' }">博客</router-link>
          </div>
          <div class="theme-toggle">
            <button class="theme-btn" :class="{ active: theme === 'light' }" @click="setTheme('light')" title="浅色模式">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            </button>
            <button class="theme-btn" :class="{ active: theme === 'dark' }" @click="setTheme('dark')" title="深色模式">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
            <button class="theme-btn" :class="{ active: theme === 'system' }" @click="setTheme('system')" title="跟随系统">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 页面内容 -->
    <div class="page-content">
      <router-view />
    </div>

    <!-- 背景视频 -->
    <div id="app-background">
      <video autoplay loop muted playsinline>
        <source src="/videos/败犬壁纸.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { personalData } from '../data/personalData.js' // 移除对 personalData 的引用

const theme = ref('system')
// const sidebar = ref(personalData.sidebar) // 移除对 sidebar 的引用

const setTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  applyTheme()
}

const applyTheme = () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const actualTheme = theme.value === 'system' ? systemTheme : theme.value
  document.documentElement.dataset.theme = actualTheme
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'system'
  theme.value = savedTheme
  applyTheme()
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
})
</script>

<style scoped src="../styles/Layout.css"></style>
