<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
}>()
</script>

<template>
  <Transition name="toast-fade">
    <div v-if="show" class="toast-wrapper">
      <div class="toast-content">
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.15)"/>
          <path d="M8 12l2.5 2.5L16 9" stroke="#fef08a" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="toast-text">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  pointer-events: none;
  max-width: 90vw;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(245, 158, 11, 0.6);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.35);
  color: #f8fafc;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toast-text {
  white-space: nowrap;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.9);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -15px) scale(0.95);
}
</style>
