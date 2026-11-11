<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code1: string
  code2: string
}>()

const emit = defineEmits<{
  (e: 'copy', text: string, title: string): void
}>()

const templates = [
  {
    id: 'short',
    title: '微信群 / 好友私聊版',
    tag: '最推荐',
    content: `【王者荣耀源梦共创投票】求各位召唤师助力！✨
投票路径：游戏大厅右上角【发现】➔【共创】➔【源·梦研发站】
输入作品编号即可投票：
作品一：${props.code1}
作品二：${props.code2}
每天都有免费票，祝大家排位连胜，万分感谢支持！🙏`
  },
  {
    id: 'moments',
    title: '朋友圈 / 空间分享版',
    tag: '图文适用',
    content: `王者荣耀源·梦研发站共创投票开启啦！
麻烦各位峡谷召唤师帮忙投两票支持一下我们的参赛作品：
作品①编号：${props.code1}
作品②编号：${props.code2}
操作方法：登录王者荣耀 ➔ 游戏大厅右上角【发现】➔ 左边栏【共创】➔【源·梦研发站】➔ 搜索编号投票即可！
每天都能领免费票，感谢大家的支持与喜爱！❤️`
  },
  {
    id: 'team',
    title: '战队 / 开黑队友版',
    tag: '战队交流',
    content: `兄弟们姐妹们集合啦！👑
求一波源·梦研发站投票支援：
编号一：${props.code1}
编号二：${props.code2}
游戏大厅右上角点【发现】➔【共创】➔【源·梦研发站】，搜索编号全投满，排位上星暴击满满！冲冲冲！`
  }
]

const activeTab = ref(0)
const copiedId = ref<string | null>(null)

function handleCopy(template: typeof templates[0]) {
  copiedId.value = template.id
  emit('copy', template.content, template.title)
  setTimeout(() => {
    copiedId.value = null
  }, 2200)
}
</script>

<template>
  <div class="share-box">
    <div class="box-header">
      <div class="header-left">
        <span class="share-icon">📢</span>
        <div>
          <h3 class="share-title">一键复制拉票文案</h3>
          <p class="share-subtitle">复制后可直接发送至微信群、朋友圈或好友，快速拉票</p>
        </div>
      </div>
    </div>

    <!-- Template Tabs -->
    <div class="tab-list">
      <button 
        v-for="(t, index) in templates" 
        :key="t.id"
        class="tab-btn"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        <span>{{ t.title }}</span>
        <span class="tab-tag" v-if="t.tag">{{ t.tag }}</span>
      </button>
    </div>

    <!-- Template Content -->
    <div class="template-panel">
      <div class="content-preview">
        <pre class="pre-text">{{ templates[activeTab].content }}</pre>
      </div>

      <div class="action-row">
        <button 
          class="copy-template-btn" 
          :class="{ copied: copiedId === templates[activeTab].id }"
          @click="handleCopy(templates[activeTab])"
        >
          <svg v-if="copiedId !== templates[activeTab].id" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ copiedId === templates[activeTab].id ? '文案已复制！可直接去微信粘贴' : '复制当前拉票文案' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-box {
  background: var(--bg-card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
}

.box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-icon {
  font-size: 26px;
}

.share-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
}

.share-subtitle {
  font-size: 12.5px;
  color: var(--text-secondary);
}

.tab-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: 12px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.tab-btn.active {
  background: rgba(245, 158, 11, 0.18);
  border-color: rgba(245, 158, 11, 0.5);
  color: #fef08a;
}

.tab-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.3);
  color: #fff;
}

.template-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-preview {
  background: rgba(10, 14, 25, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 14px;
}

.pre-text {
  font-family: inherit;
  font-size: 13px;
  line-height: 1.6;
  color: #e2e8f0;
  white-space: pre-wrap;
  word-break: break-word;
}

.action-row {
  display: flex;
}

.copy-template-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fef08a;
  transition: all 0.2s;
}

.copy-template-btn:hover {
  background: rgba(245, 158, 11, 0.2);
  border-color: #f59e0b;
}

.copy-template-btn.copied {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>
