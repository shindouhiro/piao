<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { triggerConfetti } from '../utils/confetti'

const emit = defineEmits<{
  (e: 'toast', msg: string): void
}>()

const hasCheckedInToday = ref(false)
const checkinCount = ref(1286) // simulated lively community counter base
const streakDays = ref(1)

const STORAGE_KEY = 'hok_vote_checkin_date'
const STREAK_KEY = 'hok_vote_checkin_streak'

onMounted(() => {
  const todayStr = new Date().toISOString().slice(0, 10)
  const lastDate = localStorage.getItem(STORAGE_KEY)
  const savedStreak = localStorage.getItem(STREAK_KEY)

  if (savedStreak) {
    streakDays.value = parseInt(savedStreak, 10) || 1
  }

  if (lastDate === todayStr) {
    hasCheckedInToday.value = true
  }
})

function handleCheckin() {
  if (hasCheckedInToday.value) {
    emit('toast', '今天已经完成投票打卡啦，明天继续哦！❤️')
    triggerConfetti()
    return
  }

  const todayStr = new Date().toISOString().slice(0, 10)
  localStorage.setItem(STORAGE_KEY, todayStr)
  streakDays.value += 1
  localStorage.setItem(STREAK_KEY, streakDays.value.toString())

  hasCheckedInToday.value = true
  checkinCount.value += 1

  triggerConfetti()
  emit('toast', '🎉 投票打卡成功！感谢召唤师的全力支持！')
}
</script>

<template>
  <div class="checkin-card">
    <div class="checkin-decor-glow"></div>
    <div class="checkin-inner">
      <div class="checkin-badge">
        <span class="badge-icon">✨</span>
        <span>今日投票打卡互动</span>
      </div>

      <h3 class="checkin-title">
        {{ hasCheckedInToday ? '已完成今日投票打卡！' : '投完票了吗？点击打卡记录' }}
      </h3>
      <p class="checkin-desc">
        {{ hasCheckedInToday ? '感谢您的每一票助力，明天记得来继续投票哦！' : '已为编号 5495 & 1241292 投完票的召唤师，请点击下方打卡' }}
      </p>

      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-num">{{ checkinCount }}</span>
          <span class="stat-label">今日参与助力人次</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">{{ hasCheckedInToday ? streakDays : '0' }} <small>天</small></span>
          <span class="stat-label">我的连续打卡天数</span>
        </div>
      </div>

      <button 
        class="checkin-btn" 
        :class="{ completed: hasCheckedInToday }"
        @click="handleCheckin"
      >
        <span class="btn-stars">✨</span>
        <span>{{ hasCheckedInToday ? '今日已打卡（点击撒花 🎉）' : '我已完成今日投票，打卡！' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.checkin-card {
  position: relative;
  background: linear-gradient(135deg, rgba(16, 22, 40, 0.9) 0%, rgba(26, 34, 60, 0.85) 100%);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 18px;
  padding: 22px 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 10px;
}

.checkin-decor-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.checkin-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.checkin-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fef08a;
  margin-bottom: 12px;
}

.checkin-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}

.checkin-desc {
  font-size: 13px;
  color: var(--text-secondary);
  max-width: 380px;
  margin-bottom: 16px;
  line-height: 1.5;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  background: rgba(10, 14, 25, 0.6);
  border-radius: 12px;
  padding: 10px 24px;
  margin-bottom: 18px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-family: var(--font-num);
  font-size: 22px;
  font-weight: 800;
  color: #fef08a;
}

.stat-num small {
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
}

.stat-label {
  font-size: 11px;
  color: #94a3b8;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
}

.checkin-btn {
  width: 100%;
  max-width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 700;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #0f172a;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
  transition: all 0.22s ease;
}

.checkin-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.checkin-btn:active {
  transform: translateY(1px);
}

.checkin-btn.completed {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
}
</style>
