<script setup lang="ts">
defineProps<{
  code1: string
  code2: string
}>()

const emit = defineEmits<{
  (e: 'copy', code: string, label: string): void
}>()
</script>

<template>
  <div class="floating-bar">
    <div class="floating-inner">
      <div class="floating-label">
        <span class="live-dot"></span>
        <span class="label-text">快速复制</span>
      </div>

      <div class="action-buttons">
        <button 
          class="float-btn gold" 
          @click="emit('copy', code1, '作品一编号')"
        >
          <span class="btn-prefix">一</span>
          <span class="code-val">{{ code1 }}</span>
          <span class="copy-tag">复制</span>
        </button>

        <button 
          class="float-btn cyan" 
          @click="emit('copy', code2, '作品二编号')"
        >
          <span class="btn-prefix">二</span>
          <span class="code-val">{{ code2 }}</span>
          <span class="copy-tag">复制</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.floating-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 10px 16px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  background: rgba(8, 12, 22, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(245, 158, 11, 0.3);
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.6);
}

.floating-inner {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.floating-label {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.8); }
}

.label-text {
  font-size: 11.5px;
  font-weight: 700;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
}

.float-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 170px;
  justify-content: center;
}

.float-btn.gold {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
  color: #0b1120;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.35);
}

.float-btn.cyan {
  background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
  color: #061021;
  box-shadow: 0 2px 10px rgba(56, 189, 248, 0.35);
}

.float-btn:hover {
  filter: brightness(1.1);
}

.float-btn:active {
  transform: scale(0.96);
}

.btn-prefix {
  font-size: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 1px 4px;
  border-radius: 4px;
}

.code-val {
  font-family: var(--font-num);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.copy-tag {
  font-size: 10.5px;
  opacity: 0.9;
}

@media (max-width: 360px) {
  .label-text {
    display: none;
  }
}
</style>
