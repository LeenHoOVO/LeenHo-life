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

    <!-- 背景 -->
    <div id="app-background">
      <video ref="videoRef" autoplay loop muted playsinline crossOrigin="anonymous" style="display: none;">
        <source src="/videos/败犬壁纸.mp4" type="video/mp4">
      </video>
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// import { personalData } from '../data/personalData.js' // 移除对 personalData 的引用

const theme = ref('system')
// const sidebar = ref(personalData.sidebar) // 移除对 sidebar 的引用
const videoRef = ref(null)
const canvasRef = ref(null)
let animationFrameId = null;

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

const drawPixelatedVideo = () => {
  const video = videoRef.value
  const canvas = canvasRef.value
  if (video && canvas && video.readyState >= 3) {
    const ctx = canvas.getContext('2d')
    const pixelationLevel = 5; // 您可以调整这个值来改变像素颗粒大小

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // 1. 根据像素化程度，计算缩小后的尺寸
    const smallWidth = canvas.clientWidth / pixelationLevel;
    const smallHeight = canvas.clientHeight / pixelationLevel;
    tempCanvas.width = smallWidth;
    tempCanvas.height = smallHeight;

    // 2. 将视频当前帧“缩小”绘制到临时canvas上
    tempCtx.drawImage(video, 0, 0, smallWidth, smallHeight);

    // 3. 关闭平滑处理，然后将小图像“放大”绘制回主canvas
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);
  }
  // 形成动画循环
  animationFrameId = requestAnimationFrame(drawPixelatedVideo);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'system'
  theme.value = savedTheme
  applyTheme()
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
  
  const video = videoRef.value;
  const canvas = canvasRef.value;
  if(video && canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    video.addEventListener('loadeddata', () => {
      // 强制启动视频播放，以防 autoplay 失效
      video.play().catch(error => {
        console.error("Video autoplay was blocked:", error);
        // 可以在这里给用户一个播放按钮作为备用方案
      });
      // 只需要调用一次来启动循环
      drawPixelatedVideo();
    });
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', applyTheme);
})

</script>

<style scoped src="../styles/Layout.css"></style>
