<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  show: boolean
  src: string
  title: string
  desc?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const scale = ref(1)

function resetZoom() {
  scale.value = 1
}

function handleClose() {
  resetZoom()
  emit('close')
}

function toggleZoom(e: MouseEvent) {
  e.stopPropagation()
  scale.value = scale.value === 1 ? 1.7 : 1
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="show" class="lightbox-overlay" @click="handleClose">
      <div class="lightbox-header" @click.stop>
        <div class="header-info">
          <span class="lightbox-tag">图文指引详情</span>
          <h4 class="lightbox-title">{{ title }}</h4>
        </div>
        <button class="close-btn" @click="handleClose" aria-label="关闭">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="lightbox-body" @click.self="handleClose">
        <div class="image-wrapper" :class="{ zoomed: scale > 1 }" @click="toggleZoom">
          <img :src="src" :alt="title" :style="{ transform: `scale(${scale})` }" class="lightbox-img" />
          <div class="zoom-hint">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line :x1="scale > 1 ? 8 : 11" y1="11" :x2="scale > 1 ? 14 : 11" y2="11"></line>
              <line v-if="scale === 1" x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>{{ scale > 1 ? '点击还原' : '点击放大查看红圈标注' }}</span>
          </div>
        </div>
      </div>

      <div v-if="desc" class="lightbox-footer" @click.stop>
        <p>{{ desc }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(4, 7, 16, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  animation: overlayFade 0.25s ease-out;
}

.lightbox-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lightbox-tag {
  font-size: 11px;
  color: var(--gold-primary);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.lightbox-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.lightbox-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 16px;
  position: relative;
}

.image-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.image-wrapper.zoomed {
  cursor: zoom-out;
}

.lightbox-img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  transition: transform 0.25s ease;
  user-select: none;
}

.zoom-hint {
  position: absolute;
  bottom: 12px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: #e2e8f0;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.lightbox-footer {
  padding: 14px 20px 20px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
