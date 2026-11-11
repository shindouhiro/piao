<script setup lang="ts">
import { ref } from 'vue'
import VotingNumberCard from './components/VotingNumberCard.vue'
import StepCard from './components/StepCard.vue'
import CopyShareBox from './components/CopyShareBox.vue'
import CheckinSection from './components/CheckinSection.vue'
import FaqSection from './components/FaqSection.vue'
import FloatingBar from './components/FloatingBar.vue'
import ImageLightbox from './components/ImageLightbox.vue'
import Toast from './components/Toast.vue'
import { copyToClipboard } from './utils/clipboard'
import { triggerConfetti } from './utils/confetti'

const CODE_1 = '5495'
const CODE_2 = '1241292'

const step1Img = `${import.meta.env.BASE_URL}images/step1.jpg`
const step2Img = `${import.meta.env.BASE_URL}images/step2.jpg`

// Toast state
const toastShow = ref(false)
const toastMessage = ref('')
let toastTimer: any = null

function showToast(msg: string) {
  toastMessage.value = msg
  toastShow.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastShow.value = false
  }, 2300)
}

// Lightbox modal state
const lightboxShow = ref(false)
const lightboxSrc = ref('')
const lightboxTitle = ref('')
const lightboxDesc = ref('')

function openLightbox(src: string, title: string, desc?: string) {
  lightboxSrc.value = src
  lightboxTitle.value = title
  lightboxDesc.value = desc || ''
  lightboxShow.value = true
}

function closeLightbox() {
  lightboxShow.value = false
}

// Copy actions
async function handleCopyCode(code: string, label: string) {
  const ok = await copyToClipboard(code)
  if (ok) {
    // Attempt gentle haptic vibration if supported on mobile
    if ('vibrate' in navigator) {
      try { navigator.vibrate(35) } catch {}
    }
    showToast(`✓ 已复制 ${label}【${code}】，快去游戏内粘贴投票吧！`)
  } else {
    showToast(`请长按编号复制：${code}`)
  }
}

async function handleCopyBoth() {
  const text = `王者荣耀源梦研发站投票编号：\n编号一：${CODE_1}\n编号二：${CODE_2}`
  const ok = await copyToClipboard(text)
  if (ok) {
    triggerConfetti()
    showToast(`🎉 两个作品编号已全部复制！`)
  } else {
    showToast(`请手动记录：${CODE_1} 和 ${CODE_2}`)
  }
}

async function handleCopyShareText(content: string, title: string) {
  const ok = await copyToClipboard(content)
  if (ok) {
    showToast(`✓【${title}】已复制！可直接发往微信聊天或朋友圈`)
  } else {
    showToast(`复制失败，请手动长按文案选择复制`)
  }
}
</script>

<template>
  <div class="page-container">
    <!-- Background visual enhancements -->
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-right"></div>
    <div class="ambient-glow glow-left"></div>

    <main class="main-content">
      <!-- HERO HEADER -->
      <header class="hero-section">
        <div class="brand-badge">
          <span class="game-logo-emblem">⚔️</span>
          <span class="brand-text">王者荣耀 · 源·梦研发站</span>
          <span class="status-live">投票进行中</span>
        </div>

        <h1 class="hero-title">
          <span class="title-main">双作品投票助力指引</span>
          <span class="title-sub">诚邀各位召唤师投上宝贵的一票！</span>
        </h1>

        <p class="hero-lead">
          您的每一票对我们都至关重要！请按照以下指引进入游戏内<strong>【源·梦研发站】</strong>搜索对应作品编号完成投票。
        </p>

        <!-- Quick copy both button -->
        <div class="hero-actions">
          <button class="btn-copy-both" @click="handleCopyBoth">
            <span class="btn-shine"></span>
            <svg class="icon-both" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>一键复制全部两个作品编号</span>
          </button>
        </div>
      </header>

      <!-- SECTION: TWO BIG NUMBER CARDS -->
      <section class="section-container">
        <div class="section-title-wrap">
          <span class="sec-kicker">CORE TARGETS</span>
          <h2 class="sec-title">本次投票参赛编号</h2>
          <p class="sec-desc">进入游戏后搜索以下编号，即可定位到对应作品投票</p>
        </div>

        <div class="numbers-grid">
          <VotingNumberCard 
            :id-index="1"
            badge="编号一"
            :code="CODE_1"
            title="参赛作品 ①"
            subtitle="源·梦共创设计方案 · 诚挚拉票"
            tag="点击复制"
            theme="gold"
            @copy="handleCopyCode"
          />

          <VotingNumberCard 
            :id-index="2"
            badge="编号二"
            :code="CODE_2"
            title="参赛作品 ②"
            subtitle="源·梦共创设计方案 · 诚挚拉票"
            tag="点击复制"
            theme="cyan"
            @copy="handleCopyCode"
          />
        </div>
      </section>

      <!-- SECTION: STEP BY STEP GUIDE -->
      <section class="section-container">
        <div class="section-title-wrap">
          <span class="sec-kicker">STEP BY STEP TUTORIAL</span>
          <h2 class="sec-title">4步极速投票图文教程</h2>
          <p class="sec-desc">点击图中标注的红圈位置，轻松完成投票</p>
        </div>

        <div class="steps-timeline">
          <!-- Step 1 -->
          <StepCard 
            :step-number="1"
            badge-text="第一步 · 入口位置"
            title="登录王者荣耀，大厅右上角点击【发现】"
            subtitle="打开《王者荣耀》进入主页面大厅，在右上角找到日历小图标【发现】并点击进入活动聚合页面。"
            key-action="点击大厅右上角「发现」日历图标"
            :image-src="step1Img"
            image-alt="王者荣耀大厅点击右上角发现指引"
            :tips="[
              '若未看到日历图标，请确保游戏已更新至最新版本',
              '如网络加载稍慢，请稍候片刻即可看到「发现」入口'
            ]"
            @preview="openLightbox"
          />

          <!-- Step 2 -->
          <StepCard 
            :step-number="2"
            badge-text="第二步 · 查找专区"
            title="左侧边栏展开【共创】➔ 进入【源·梦研发站】"
            subtitle="在进入的发现页面左侧分类列表中，找到带有菱形图标的【共创】栏目点击展开，然后点击子菜单【源·梦研发站】。"
            key-action="左侧展开「共创」 ➔ 点击「源·梦研发站」"
            :image-src="step2Img"
            image-alt="左侧共创展开进入源梦研发站"
            :tips="[
              '图中已用红圈标出「共创」，红线标出「源·梦研发站」',
              '点击即可直接跳转至当期源梦共创官方投票主界面'
            ]"
            @preview="openLightbox"
          />

          <!-- Step 3 -->
          <StepCard 
            :step-number="3"
            badge-text="第三步 · 搜索投票"
            title="搜索编号并投出所有选票"
            subtitle="在源·梦研发站投票页面顶部或筛选栏中，分别搜索我们的两个作品编号并投票："
            key-action="搜索并投满作品 5495 与 1241292"
            :tips="[
              `输入作品一编号「${CODE_1}」➔ 找到作品 ➔ 投满全部选票`,
              `输入作品二编号「${CODE_2}」➔ 找到作品 ➔ 投满全部选票`,
              '每次投票后可在界面内直接查看到已投成功的确认反馈'
            ]"
            @preview="openLightbox"
          />

          <!-- Step 4 -->
          <StepCard 
            :step-number="4"
            badge-text="第四步 · 每日助力"
            title="每日免费领票，天天可投"
            subtitle="活动期间，每日完成登录游戏、对局等任务均可领取新投票券。请记得每天来投哦！"
            key-action="坚持每日投票，每一次支持都是莫大的鼓励！"
            :tips="[
              '每天完成指定日常任务即可获得免费投票券',
              '投票还可领取亲密玫瑰、共创策划成长值、小王积分等游戏奖励'
            ]"
          />
        </div>
      </section>

      <!-- SECTION: CHECKIN INTERACTION -->
      <section class="section-container">
        <CheckinSection @toast="showToast" />
      </section>

      <!-- SECTION: COPY READY-TO-SHARE COPY -->
      <section class="section-container">
        <CopyShareBox 
          :code1="CODE_1" 
          :code2="CODE_2"
          @copy="handleCopyShareText" 
        />
      </section>

      <!-- SECTION: FAQ & TIPS -->
      <section class="section-container">
        <FaqSection />
      </section>

      <!-- FOOTER -->
      <footer class="page-footer">
        <div class="footer-crest">👑</div>
        <p class="footer-title">王者荣耀 · 源·梦皮肤研发站共创大赛</p>
        <p class="footer-sub">衷心感谢每一位召唤师的宝贵支持与鼓励！愿大家排位常胜，荣耀连捷！</p>
        <div class="footer-meta">
          <span>参赛编号：{{ CODE_1 }} / {{ CODE_2 }}</span>
          <span class="meta-dot">·</span>
          <span>纯技术拉票指引辅助</span>
        </div>
      </footer>
    </main>

    <!-- MOBILE STICKY FLOATING BAR -->
    <FloatingBar 
      :code1="CODE_1" 
      :code2="CODE_2" 
      @copy="handleCopyCode" 
    />

    <!-- LIGHTBOX FOR IMAGES -->
    <ImageLightbox 
      :show="lightboxShow"
      :src="lightboxSrc"
      :title="lightboxTitle"
      :desc="lightboxDesc"
      @close="closeLightbox"
    />

    <!-- TOAST NOTIFICATION -->
    <Toast 
      :show="toastShow" 
      :message="toastMessage" 
    />
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  position: relative;
  padding: 0 16px 100px;
}

/* Ambient glow balls */
.ambient-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
}

.glow-top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 240px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%);
}

.glow-right {
  top: 350px;
  right: -80px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%);
}

.glow-left {
  top: 850px;
  left: -80px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
}

.main-content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
  padding-top: 28px;
}

/* HERO SECTION */
.hero-section {
  text-align: center;
  padding: 16px 8px 30px;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(245, 158, 11, 0.4);
  padding: 6px 14px;
  border-radius: 999px;
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
  margin-bottom: 18px;
}

.game-logo-emblem {
  font-size: 14px;
}

.brand-text {
  font-size: 13px;
  font-weight: 700;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.status-live {
  font-size: 11px;
  font-weight: 700;
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.4);
  padding: 1px 7px;
  border-radius: 10px;
  display: inline-block;
  animation: pulseLive 2s infinite;
}

@keyframes pulseLive {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.title-main {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #ffffff 0%, #fef08a 40%, #f59e0b 80%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 12px rgba(245, 158, 11, 0.35));
}

.title-sub {
  font-size: 16px;
  font-weight: 600;
  color: #38bdf8;
  letter-spacing: 0.5px;
}

.hero-lead {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 520px;
  margin: 0 auto 20px;
}

.hero-lead strong {
  color: #fef08a;
}

.hero-actions {
  display: flex;
  justify-content: center;
}

.btn-copy-both {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%);
  color: #0b1120;
  padding: 13px 24px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.22s ease;
}

.btn-copy-both:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.5);
}

.btn-copy-both:active {
  transform: translateY(1px);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: skewX(-20deg);
  animation: shineLoop 3.5s infinite;
}

@keyframes shineLoop {
  0%, 60% { left: -100%; }
  100% { left: 200%; }
}

.icon-both {
  width: 18px;
  height: 18px;
}

/* SECTIONS */
.section-container {
  margin-bottom: 32px;
}

.section-title-wrap {
  text-align: center;
  margin-bottom: 18px;
}

.sec-kicker {
  font-size: 11px;
  font-weight: 800;
  color: var(--cyan-primary);
  letter-spacing: 2px;
  display: block;
  margin-bottom: 4px;
}

.sec-title {
  font-size: 21px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.sec-desc {
  font-size: 13px;
  color: var(--text-muted);
}

/* NUMBERS GRID */
.numbers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 540px) {
  .numbers-grid {
    grid-template-columns: 1fr;
  }
}

/* TIMELINE */
.steps-timeline {
  display: flex;
  flex-direction: column;
}

/* FOOTER */
.page-footer {
  text-align: center;
  padding: 40px 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 20px;
}

.footer-crest {
  font-size: 28px;
  margin-bottom: 10px;
  filter: drop-shadow(0 2px 10px rgba(245, 158, 11, 0.5));
}

.footer-title {
  font-size: 15px;
  font-weight: 700;
  color: #fef08a;
  margin-bottom: 6px;
}

.footer-sub {
  font-size: 13px;
  color: var(--text-secondary);
  max-width: 420px;
  margin: 0 auto 12px;
  line-height: 1.5;
}

.footer-meta {
  font-size: 11.5px;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.meta-dot {
  color: #475569;
}

@media (max-width: 480px) {
  .title-main {
    font-size: 25px;
  }
  .title-sub {
    font-size: 14.5px;
  }
  .btn-copy-both {
    width: 100%;
    justify-content: center;
  }
}
</style>
