<template>
  <div class="editor-container" v-if="showEditor">
    <div class="editor-overlay" @click="closeEditor"></div>
    <div class="editor-modal">
      <div class="editor-header">
        <h3>编辑个人博客内容</h3>
        <button @click="closeEditor" class="close-btn">×</button>
      </div>
      
      <div class="editor-content">
        <div class="editor-section">
          <h4>欢迎横幅</h4>
          <div class="form-group">
            <label>标题</label>
            <input v-model="editData.welcome.title" type="text" />
          </div>
          <div class="form-group">
            <label>副标题</label>
            <input v-model="editData.welcome.subtitle" type="text" />
          </div>
          <div class="form-group">
            <label>统计数据 (数字|标签, 逗号分隔)</label>
            <textarea v-model="editData.welcome.statsString" rows="3"></textarea>
          </div>
        </div>

        <div class="editor-section">
          <h4>特色卡片 (轮播)</h4>
          <div 
            v-for="(card, cardIndex) in editData.featuredCards" 
            :key="card.id"
            class="card-editor"
          >
            <h5>{{ card.title }}</h5>
            <div class="form-group">
              <label>徽章图标</label>
              <input v-model="card.badgeIcon" type="text" />
            </div>
            <div class="form-group">
              <label>徽章文本</label>
              <input v-model="card.badgeText" type="text" />
            </div>
            <div class="form-group">
              <label>标题</label>
              <input v-model="card.title" type="text" />
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea v-model="card.description" rows="2"></textarea>
            </div>
            
            <div class="form-group" v-if="card.highlights">
              <label>亮点 (图标|文本, 逗号分隔)</label>
              <textarea v-model="card.highlightsString" rows="3"></textarea>
            </div>
            <div class="form-group" v-if="card.technologies">
              <label>技术 (逗号分隔)</label>
              <input v-model="card.technologiesString" type="text" />
            </div>
            <div class="form-group" v-if="card.achievements">
              <label>成就 (逗号分隔)</label>
              <textarea v-model="card.achievementsString" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label>行动文本</label>
              <input v-model="card.actionText" type="text" />
            </div>
            <div class="form-group">
              <label>行动链接</label>
              <input v-model="card.actionLink" type="text" />
            </div>
          </div>
        </div>

        <div class="editor-section">
          <h4>快速导航</h4>
          <div 
            v-for="(nav, navIndex) in editData.quickNav" 
            :key="nav.title"
            class="nav-editor"
          >
            <h5>{{ nav.title }}</h5>
            <div class="form-group">
              <label>图标</label>
              <input v-model="nav.icon" type="text" />
            </div>
            <div class="form-group">
              <label>标题</label>
              <input v-model="nav.title" type="text" />
            </div>
            <div class="form-group">
              <label>副标题</label>
              <input v-model="nav.subtitle" type="text" />
            </div>
            <div class="form-group">
              <label>链接</label>
              <input v-model="nav.link" type="text" />
            </div>
          </div>
        </div>

        <div class="editor-section">
          <h4>侧边栏信息</h4>
          <div class="sidebar-editor">
            <div class="form-group">
              <label>姓名</label>
              <input v-model="editData.sidebar.name" type="text" />
            </div>
            <div class="form-group">
              <label>头衔</label>
              <input v-model="editData.sidebar.title" type="text" />
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea v-model="editData.sidebar.description" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>头像链接</label>
              <input v-model="editData.sidebar.avatar" type="text" />
            </div>
            <div class="form-group">
              <label>状态</label>
              <input v-model="editData.sidebar.status" type="text" />
            </div>
            <div class="form-group">
              <label>公告</label>
              <textarea v-model="editData.sidebar.announcement" rows="2"></textarea>
            </div>
            
            <h5>社交链接 (名称|URL|图标, 逗号分隔)</h5>
            <textarea v-model="editData.sidebar.socialLinksString" rows="3"></textarea>
            
            <h5>标签 (逗号分隔)</h5>
            <input v-model="editData.sidebar.tagsString" type="text" />
            
            <h5>分类 (名称|数量|路径, 逗号分隔)</h5>
            <textarea v-model="editData.sidebar.categoriesString" rows="3"></textarea>
          </div>
        </div>
      </div>

      <div class="editor-footer">
        <button @click="saveChanges" class="save-btn">保存更改</button>
        <button @click="closeEditor" class="cancel-btn">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { personalData } from '../data/personalData.js'

const props = defineProps({
  showEditor: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const editData = ref({
  welcome: { ...personalData.welcome },
  featuredCards: personalData.featuredCards.map(card => ({
    ...card,
    highlightsString: card.highlights ? card.highlights.map(h => `${h.icon}|${h.text}`).join(', ') : '',
    technologiesString: card.technologies ? card.technologies.join(', ') : '',
    achievementsString: card.achievements ? card.achievements.map(a => a.text).join(', ') : '',
  })),
  quickNav: [...personalData.quickNav],
  sidebar: {
    ...personalData.sidebar,
    socialLinksString: personalData.sidebar.socialLinks.map(link => `${link.name}|${link.url}|${link.icon}`).join(', '),
    tagsString: personalData.sidebar.tags.join(', '),
    categoriesString: personalData.sidebar.categories.map(cat => `${cat.name}|${cat.count}|${cat.path}`).join(', ')
  }
})

const closeEditor = () => {
  emit('close')
}

const saveChanges = () => {
  // 处理欢迎横幅统计数据
  editData.value.welcome.stats = editData.value.welcome.statsString.split(',').map(stat => {
    const [number, label] = stat.trim().split('|')
    return { number, label }
  }).filter(stat => stat.number && stat.label)
  delete editData.value.welcome.statsString

  // 处理特色卡片数据
  editData.value.featuredCards.forEach(card => {
    if (card.highlightsString) {
      card.highlights = card.highlightsString.split(',').map(h => {
        const [icon, text] = h.trim().split('|')
        return { icon, text }
      }).filter(h => h.icon && h.text)
    }
    delete card.highlightsString

    if (card.technologiesString) {
      card.technologies = card.technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech)
    }
    delete card.technologiesString

    if (card.achievementsString) {
      card.achievements = card.achievementsString.split(',').map(a => a.trim()).filter(a => a)
    }
    delete card.achievementsString
  })

  // 处理侧边栏数据
  if (editData.value.sidebar.socialLinksString) {
    editData.value.sidebar.socialLinks = editData.value.sidebar.socialLinksString.split(',').map(link => {
      const [name, url, icon] = link.trim().split('|')
      return { name, url, icon }
    }).filter(link => link.name && link.url && link.icon)
  }
  delete editData.value.sidebar.socialLinksString

  if (editData.value.sidebar.tagsString) {
    editData.value.sidebar.tags = editData.value.sidebar.tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
  }
  delete editData.value.sidebar.tagsString

  if (editData.value.sidebar.categoriesString) {
    editData.value.sidebar.categories = editData.value.sidebar.categoriesString.split(',').map(cat => {
      const [name, count, path] = cat.trim().split('|')
      return { name, count: parseInt(count), path }
    }).filter(cat => cat.name && cat.count && cat.path)
  }
  delete editData.value.sidebar.categoriesString

  emit('save', editData.value)
  closeEditor()
}

// 监听数据变化，重置编辑数据
watch(() => props.showEditor, (newVal) => {
  if (newVal) {
    editData.value = {
      welcome: { ...personalData.welcome },
      featuredCards: personalData.featuredCards.map(card => ({
        ...card,
        highlightsString: card.highlights ? card.highlights.map(h => `${h.icon}|${h.text}`).join(', ') : '',
        technologiesString: card.technologies ? card.technologies.join(', ') : '',
        achievementsString: card.achievements ? card.achievements.map(a => a.text).join(', ') : '',
      })),
      quickNav: [...personalData.quickNav],
      sidebar: {
        ...personalData.sidebar,
        socialLinksString: personalData.sidebar.socialLinks.map(link => `${link.name}|${link.url}|${link.icon}`).join(', '),
        tagsString: personalData.sidebar.tags.join(', '),
        categoriesString: personalData.sidebar.categories.map(cat => `${cat.name}|${cat.count}|${cat.path}`).join(', ')
      }
    }
  }
})
</script>

<style scoped src="../styles/PersonalDataEditor.css"></style>
