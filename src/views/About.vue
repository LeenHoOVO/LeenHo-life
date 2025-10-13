<template>
  <div class="about-page-content">
    <!-- 1. 个人名片区域 -->
    <div class="profile-header-section card-style">
      <div class="profile-header-avatar">
        <img :src="sidebar.avatar" :alt="sidebar.name + '的头像'">
      </div>
      <div class="profile-header-info">
        <h1 class="profile-name">{{ sidebar.name }}</h1>
        <p class="profile-tagline">{{ sidebar.title }}</p>
        <p class="profile-description">{{ sidebar.description }}</p>
         <div class="social-links">
            <a 
              v-for="link in sidebar.socialLinks"
              :key="link.name"
              :href="link.url" 
              target="_blank" 
              class="social-link"
              :title="link.name"
            >
              <!-- Icons will be handled by CSS or a component later if needed -->
              {{ link.name }}
            </a>
          </div>
      </div>
    </div>

    <!-- 2. 技能展示区 -->
    <div class="skills-showcase-section card-style">
      <h2 class="section-title">核心技能</h2>
      <div class="tags-cloud">
        <span v-for="tag in sidebar.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <!-- 3. 时间轴简历 -->
    <div class="timeline-section card-style">
      <h2 class="section-title">我的历程</h2>
      <!-- 筛选器 -->
      <div class="timeline-filters">
        <button 
          v-for="filter in filters" 
          :key="filter.type"
          :class="{ active: activeFilter === filter.type }"
          @click="setFilter(filter.type)"
        >
          <span class="icon">{{ filter.icon }}</span>
          <span>{{ filter.label }}</span>
        </button>
      </div>

      <!-- 时间轴容器 -->
      <div class="timeline-container">
        <div class="timeline-line"></div>
        <div 
          v-for="(item, index) in filteredTimeline" 
          :key="index" 
          class="timeline-item"
          :class="[item.type, index % 2 === 0 ? 'left' : 'right']"
          ref="timelineItems"
        >
          <div class="timeline-icon">{{ item.icon }}</div>
          <div class="timeline-card">
            <div class="card-header">
              <span class="date">{{ item.date }}</span>
              <h3>{{ item.title }}</h3>
              <p class="subtitle">{{ item.subtitle }}</p>
            </div>
            <div class="card-content" v-if="item.description && item.description.length">
              <ul>
                <li v-for="(point, pIndex) in item.description" :key="pIndex">{{ point }}</li>
              </ul>
            </div>
            <div class="card-footer" v-if="item.tags && item.tags.length">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { personalData } from '../data/personalData.js'

const aboutPage = ref(personalData.aboutPage);
const sidebar = ref(personalData.sidebar); // 获取sidebar数据
const timelineItems = ref([]);

// 筛选器
const filters = ref([
  { type: 'all', label: '全部', icon: '📜' },
  { type: 'education', label: '教育', icon: '🎓' },
  { type: 'work', label: '实习', icon: '💼' },
  { type: 'project', label: '项目', icon: '🚀' },
  { type: 'award', label: '奖项', icon: '🏆' },
  { type: 'activity', label: '实践', icon: '👥' },
]);
const activeFilter = ref('all');

const setFilter = (type) => {
  activeFilter.value = type;
};

const filteredTimeline = computed(() => {
  if (activeFilter.value === 'all') {
    return aboutPage.value.timeline;
  }
  return aboutPage.value.timeline.filter(item => item.type === activeFilter.value);
});


// 滚动动画
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Use a timeout to ensure refs are populated after v-if/v-for stabilizes
  setTimeout(() => {
    timelineItems.value.forEach(item => {
      if (item) {
        observer.observe(item);
      }
    });
  }, 100);
});
</script>

<style scoped src="../styles/About.css"></style>

