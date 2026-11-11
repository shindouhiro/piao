<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  idIndex: number
  badge: string
  code: string
  title: string
  subtitle: string
  tag: string
  theme?: 'gold' | 'cyan'
}>()

const emit = defineEmits<{
  (e: 'copy', code: string, label: string): void
}>()

const isCopied = ref(false)

function handleCopy() {
  isCopied.value = true
  emit('copy', props.code, props.badge)
  setTimeout(() => {
    isCopied.value = false
  }, 2200)
}
</script>

<template>
  <div class="code-card" :class="[theme || 'gold', { copied: isCopied }]">
    <!-- Card Top Badge -->
    <div class="card-head">
      <div class="badge-pill">
        <span class="badge-dot"></span>
        <span>{{ badge }}</span>
      </div>
      <span class="card-tag">{{ tag }}</span>
    </div>

    <!-- Main Content -->
    <div class="card-main">
      <div class="card-info">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-sub">{{ subtitle }}</p>
      </div>

      <!-- Prominent Digits Display -->
      <div class="number-display" @click="handleCopy" title="点击复制编号">
        <div class="number-meta">
          <span class="number-label">作品参赛编号</span>
          <span class="tap-hint">点击数字亦可复制</span>
        </div>
        <div class="number-digits">
          <span class="digit-text">{{ code }}</span>
          <span class="number-glow"></span>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="card-action">
      <button 
        type="button" 
        class="copy-btn" 
        :class="{ active: isCopied }" 
        @click="handleCopy"
        :aria-label="`复制编号 ${code}`"
      >
        <span class="btn-glow"></span>
        <svg v-if="!isCopied" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else class="btn-icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="btn-text">{{ isCopied ? '已复制！去游戏粘贴' : `一键复制编号【${code}】` }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.code-card {
  position: relative;
  border-radius: 18px;
  background: var(--bg-card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 20px 20px 18px;
  border: 1px solid var(--border-gold);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.code-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.8), transparent);
  opacity: 0.8;
}

.code-card.cyan {
  border-color: var(--border-cyan);
}

.code-card.cyan::before {
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent);
}

.code-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 158, 11, 0.15);
}

.code-card.cyan:hover {
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.15);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fef08a;
}

.cyan .badge-pill {
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
  color: #bae6fd;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  box-shadow: 0 0 6px #f59e0b;
  animation: pulseDot 2s infinite;
}

.cyan .badge-dot {
  background: #38bdf8;
  box-shadow: 0 0 6px #38bdf8;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.card-tag {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.card-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.card-sub {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.number-display {
  background: linear-gradient(135deg, rgba(10, 15, 28, 0.8) 0%, rgba(18, 25, 45, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 14px 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
}

.number-display:active {
  transform: scale(0.985);
}

.number-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.number-label {
  font-size: 11px;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.8px;
}

.tap-hint {
  font-size: 11px;
  color: var(--gold-primary);
  opacity: 0.8;
}

.cyan .tap-hint {
  color: var(--cyan-primary);
}

.number-digits {
  position: relative;
  display: flex;
  align-items: center;
}

.digit-text {
  font-family: var(--font-num);
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #fff;
  background: linear-gradient(135deg, #ffffff 0%, #fef08a 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(245, 158, 11, 0.3));
}

.cyan .digit-text {
  background: linear-gradient(135deg, #ffffff 0%, #bae6fd 60%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(56, 189, 248, 0.3));
}

.card-action {
  margin-top: 4px;
}

.copy-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  transition: all 0.22s ease;
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%);
  color: #0f172a;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);
}

.cyan .copy-btn {
  background: linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #7dd3fc 100%);
  color: #0b1329;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.35);
}

.copy-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.copy-btn:active {
  transform: translateY(1px);
}

.copy-btn.active {
  background: #10b981;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.check-icon {
  animation: checkPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes checkPop {
  0% { transform: scale(0.5); }
  60% { transform: scale(1.25); }
  100% { transform: scale(1); }
}

@media (max-width: 480px) {
  .digit-text {
    font-size: 30px;
  }
}
</style>
