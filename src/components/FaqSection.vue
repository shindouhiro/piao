<script setup lang="ts">
import { ref } from 'vue'

const openIndex = ref<number | null>(0)

const faqs = [
  {
    q: '参与本次源·梦投票有什么门槛或条件？',
    a: '根据王者荣耀官方规则，参与账号所在区服的角色等级需达到 30 级即可免费参与投票。'
  },
  {
    q: '投票券如何获取？每天都可以投吗？',
    a: '是的！活动期间每天登录游戏、完成指定 5V5 匹配/排位对局或分享活动，均可在研发站页面免费领取投票券（1 张券 = 1 票）。每天记得把票投满哦！'
  },
  {
    q: '为什么在游戏大厅没找到“源·梦研发站”？',
    a: '请认准正确路径：游戏大厅右上角点击日历图标【发现】➔ 在展开的左侧导航栏找到【共创】➔ 点击子菜单【源·梦研发站】进入。若界面更新，也可在主界面右侧【活动】➔【共创】中查看。'
  },
  {
    q: '两个编号有什么区别？都需要投票吗？',
    a: '编号【5495】与编号【1241292】均为我们本次参赛的作品。您可以分别搜索两个编号，并为它们投上宝贵的选票，非常感谢您的倾情助力！'
  },
  {
    q: '给作品投票，召唤师自己能获得什么游戏奖励？',
    a: '参与官方源梦研发站投票与共创互动，游戏内通常会赠送：亲密玫瑰、共创策划成长值、小王互动积分、钻石或铭文碎片等丰厚游戏福利！'
  }
]

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-container">
    <div class="faq-header">
      <span class="faq-icon">💡</span>
      <h3 class="faq-title">投票常见答疑与须知</h3>
    </div>

    <div class="faq-list">
      <div 
        v-for="(item, index) in faqs" 
        :key="index"
        class="faq-item"
        :class="{ open: openIndex === index }"
        @click="toggleFaq(index)"
      >
        <div class="faq-q">
          <span class="q-badge">Q{{ index + 1 }}</span>
          <span class="q-text">{{ item.q }}</span>
          <span class="arrow-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
        <div v-show="openIndex === index" class="faq-a">
          <p>{{ item.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-container {
  background: var(--bg-card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 20px;
  margin-top: 10px;
}

.faq-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.faq-icon {
  font-size: 22px;
}

.faq-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  background: rgba(10, 15, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.faq-item:hover {
  border-color: rgba(245, 158, 11, 0.3);
}

.faq-item.open {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(14, 20, 36, 0.85);
}

.faq-q {
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.q-badge {
  font-size: 11px;
  font-weight: 800;
  background: rgba(245, 158, 11, 0.2);
  color: #fef08a;
  padding: 2px 7px;
  border-radius: 6px;
  flex-shrink: 0;
}

.q-text {
  flex: 1;
  font-size: 13.5px;
  font-weight: 600;
  color: #f1f5f9;
  line-height: 1.4;
}

.arrow-icon {
  color: #94a3b8;
  display: flex;
  align-items: center;
  transition: transform 0.25s;
}

.faq-item.open .arrow-icon {
  transform: rotate(180deg);
  color: #f59e0b;
}

.faq-a {
  padding: 0 14px 14px 38px;
  font-size: 13px;
  color: #cbd5e1;
  line-height: 1.6;
}
</style>
