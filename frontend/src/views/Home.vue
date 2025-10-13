<template>
  <div class="modern-home">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner">
      <div class="banner-content">
        <h1 class="banner-title">{{ welcome.title }}</h1>
        <p class="banner-subtitle">{{ welcome.subtitle }}</p>
        <div class="banner-stats">
          <div class="stat-item" v-for="(stat, index) in welcome.stats" :key="index">
            <span class="stat-number">{{ stat.number }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modern-layout">
      <!-- 主内容区域 -->
      <main class="main-content-area">
        <!-- 内容轮播区域 -->
        <div class="content-carousel">
          <div class="carousel-container">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <!-- 文章卡片 -->
              <div class="carousel-slide" v-for="(card, index) in featuredCards" :key="index">
                <div class="featured-card article-card">
                  <div class="card-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span>{{ card.badgeText }}</span>
                  </div>
                  <div class="card-content">
                    <h2>{{ card.title }}</h2>
                    <p>{{ card.description }}</p>
                    <div class="article-meta">
                      <span class="meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {{ card.date }}</span>
                      <span class="meta-item" v-for="(tag, tagIndex) in card.tags" :key="tagIndex">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 13.41V2h11.41a2 2 0 0 1 0 2.83z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> {{ tag }}</span>
                    </div>
                  </div>
                  <button class="card-action">
                    <span>{{ card.actionText }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 轮播指示器 -->
          <div class="carousel-indicators">
            <button 
              v-for="(slide, index) in featuredCards.length" 
              :key="index"
              :class="['indicator', { active: currentSlide === index }]"
              @click="currentSlide = index"
            ></button>
          </div>
        </div>

        <!-- 快速导航 -->
        <div class="quick-nav">
          <div class="nav-grid">
            <router-link :to="nav.link" class="nav-card" v-for="(nav, index) in quickNav" :key="index">
              <div class="nav-icon">
                <template v-if="nav.icon === '👨‍💻'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-2-3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"/></svg>
                </template>
                <template v-else-if="nav.icon === '📝'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </template>
                <template v-else-if="nav.icon === '📧'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </template>
                <template v-else-if="nav.icon === '📱'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </template>
              </div>
              <div class="nav-content">
                <h3>{{ nav.title }}</h3>
                <p>{{ nav.subtitle }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </main>

      <!-- 右侧边栏 -->
      <aside class="sidebar-area">
        <!-- 个人资料卡片 -->
        <div class="profile-card">
          <div class="profile-header">
            <div class="avatar-container">
              <img :src="sidebar.avatar" :alt="sidebar.name + '的头像'">
              <div class="status-indicator">
                <div class="status-dot"></div>
                <span class="status-text">{{ sidebar.status }}</span>
              </div>
            </div>
            <div class="profile-info">
              <h2 class="profile-name">{{ sidebar.name }} <span class="diamond">◆</span></h2>
              <p class="profile-tagline">{{ sidebar.title }}</p>
              <p class="profile-description">{{ sidebar.description }}</p>
            </div>
          </div>
          
          <div class="social-links">
            <a 
              v-for="link in sidebar.socialLinks"
              :key="link.name"
              :href="link.url" 
              target="_blank" 
              class="social-link"
              :title="link.name"
            >
              <template v-if="link.icon === 'github'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </template>
              <template v-else-if="link.icon === 'music'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              </template>
              <template v-else-if="link.icon === 'bilibili'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8.4V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.4l10-6.1 10 6.1Z"/><path d="M6 12h12"/><path d="M12 2v6.5"/></svg>
              </template>
              {{ link.name }}
            </a>
          </div>
          
          <button class="more-btn">
            <span>→ More</span>
          </button>
        </div>

        <!-- 公告卡片 -->
        <div class="announcement-card">
          <div class="card-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span>公告</span>
          </div>
          <div class="card-content">
            <p>{{ sidebar.announcement }}</p>
          </div>
        </div>

        <!-- 标签云卡片 -->
        <div class="tags-card">
          <div class="card-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10V2H6v8c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3z"/><path d="M2 14h20"/><path d="M2 20h20"/></svg>
            <span>技术标签</span>
          </div>
          <div class="tags-cloud">
            <span 
              v-for="tag in sidebar.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 分类卡片 -->
        <div class="categories-card">
          <div class="card-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>文章分类</span>
          </div>
          <div class="categories-list">
            <router-link 
              v-for="category in sidebar.categories"
              :key="category.name"
              :to="category.path"
              class="category-item"
            >
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{ category.count }}</span>
            </router-link>
          </div>
        </div>
      </aside>
    </div>

    <!-- 编辑器组件 -->
    <PersonalDataEditor 
      :show-editor="showEditor"
      @close="showEditor = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { personalData } from '../data/personalData.js'
import PersonalDataEditor from '../components/PersonalDataEditor.vue'

// 使用响应式数据
const welcome = ref(personalData.welcome)
const featuredCards = ref(personalData.featuredCards) // 现在是文章数据
const quickNav = ref(personalData.quickNav)
const sidebar = ref(personalData.sidebar) // 引入 sidebar 数据
const showEditor = ref(false)
const currentSlide = ref(0)
const autoSlideInterval = ref(null)

// 自动轮播
const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % featuredCards.value.length
  }, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
    autoSlideInterval.value = null
  }
}

// 处理保存
const handleSave = (newData) => {
  welcome.value = newData.welcome
  featuredCards.value = newData.featuredCards
  quickNav.value = newData.quickNav
  sidebar.value = newData.sidebar // 更新 sidebar 数据
  personalData.aboutPage = newData.aboutPage 
  
  // 这里可以添加保存到本地存储或后端的逻辑
  localStorage.setItem('personalData', JSON.stringify(newData))
}

// 可以在这里添加方法来动态更新内容
const updateCard = (id, updates) => {
  const card = featuredCards.value.find(c => c.id === id)
  if (card) {
    Object.assign(card, updates)
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped src="../styles/Home.css"></style>
