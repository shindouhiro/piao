<script setup lang="ts">
defineProps<{
  stepNumber: number
  title: string
  subtitle: string
  badgeText: string
  imageSrc?: string
  imageAlt?: string
  tips?: string[]
  keyAction?: string
}>()

const emit = defineEmits<{
  (e: 'preview', src: string, title: string, desc?: string): void
}>()
</script>

<template>
  <div class="step-card">
    <div class="step-badge-col">
      <div class="step-num-circle">
        <span class="step-num-text">0{{ stepNumber }}</span>
      </div>
      <div class="step-line"></div>
    </div>

    <div class="step-content">
      <div class="step-header">
        <div class="step-title-wrap">
          <span class="step-kicker">{{ badgeText }}</span>
          <h3 class="step-title">{{ title }}</h3>
        </div>
      </div>

      <p class="step-subtitle">{{ subtitle }}</p>

      <div v-if="keyAction" class="key-action-box">
        <span class="action-icon">👉</span>
        <span class="action-text">{{ keyAction }}</span>
      </div>

      <!-- Image preview if present -->
      <div 
        v-if="imageSrc" 
        class="step-image-container" 
        @click="emit('preview', imageSrc, title, subtitle)"
      >
        <div class="image-inner">
          <img :src="imageSrc" :alt="imageAlt || title" loading="lazy" class="step-img" />
          <div class="image-overlay-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>点击查看红圈标注原图</span>
          </div>
        </div>
        <div class="image-caption">
          <span class="caption-dot"></span>
          <span>按图中标注的红圈/红线位置点击即可</span>
        </div>
      </div>

      <!-- Specific Step Tips list -->
      <div v-if="tips && tips.length" class="step-tips">
        <div v-for="(tip, idx) in tips" :key="idx" class="tip-item">
          <span class="tip-dot">✦</span>
          <span class="tip-text">{{ tip }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-card {
  display: flex;
  gap: 16px;
  position: relative;
}

.step-badge-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-num-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 2px solid var(--border-gold-bright);
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.4), inset 0 0 8px rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.step-num-text {
  font-family: var(--font-num);
  font-size: 16px;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.step-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.5) 0%, rgba(56, 189, 248, 0.2) 100%);
  margin: 8px 0;
}

.step-card:last-child .step-line {
  display: none;
}

.step-content {
  flex: 1;
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.5);
}

.step-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6px;
}

.step-kicker {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--cyan-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.step-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
}

.step-subtitle {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
}

.key-action-box {
  background: rgba(245, 158, 11, 0.1);
  border: 1px dashed rgba(245, 158, 11, 0.4);
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.action-icon {
  font-size: 14px;
}

.action-text {
  font-size: 13px;
  font-weight: 600;
  color: #fef08a;
}

.step-image-container {
  margin-top: 10px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #0b0f1a;
  border: 1px solid rgba(245, 158, 11, 0.25);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
  transition: all 0.25s ease;
}

.step-image-container:hover {
  border-color: rgba(245, 158, 11, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.2);
}

.image-inner {
  position: relative;
  overflow: hidden;
}

.step-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.step-image-container:hover .step-img {
  transform: scale(1.02);
}

.image-overlay-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.image-caption {
  padding: 8px 12px;
  background: rgba(15, 23, 42, 0.85);
  font-size: 12px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.caption-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
}

.step-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12.5px;
  color: #cbd5e1;
  line-height: 1.45;
}

.tip-dot {
  color: var(--cyan-primary);
  font-size: 10px;
  margin-top: 3px;
}

@media (max-width: 480px) {
  .step-card {
    gap: 12px;
  }
  .step-num-circle {
    width: 36px;
    height: 36px;
  }
  .step-num-text {
    font-size: 14px;
  }
  .step-content {
    padding: 14px;
  }
}
</style>
