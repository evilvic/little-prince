<script setup>
const props = defineProps({
  item: { type: Object, required: true },
})
const emit = defineEmits(['close'])
import { ref } from 'vue'

const readerMode = ref(false)
const screenshotMode = ref(false)

const handleBackgroundClick = (e) => {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click="handleBackgroundClick">
    <transition name="zoom-fade">
      <div v-if="item && readerMode" class="reader-fullscreen">
        <button class="reader-exit-btn" @click="readerMode = false">×</button>
        <div class="reader-content" v-html="item.reader_html"></div>
      </div>
      <div v-else-if="item && !screenshotMode" class="modal-content">
        <button class="close-btn" @click="$emit('close')">×</button>
        <img v-if="item.cover_url" :src="item.cover_url" alt="cover" class="modal-cover" />
        <h2>{{ item.title }}</h2>
        <template v-if="item.type === 'article'">
          <button class="reader-btn" @click="readerMode = true">
            Ver en Reader Mode
          </button>
          <div class="modal-links">
            <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="modal-link">Ir al artículo original</a>
            <button v-if="item.screenshot_url" class="modal-link" @click="screenshotMode = true">Ver screenshot</button>
          </div>
        </template>
        <template v-else>
          <p>{{ item.description }}</p>
        </template>
        <div class="modal-tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
      <div v-else-if="screenshotMode" class="screenshot-modal">
        <div class="fake-browser-bar">
          <span class="browser-dot red"></span>
          <span class="browser-dot yellow"></span>
          <span class="browser-dot green"></span>
          <span class="browser-url">{{ item.url }}</span>
          <button class="close-btn screenshot-close" @click="screenshotMode = false">×</button>
        </div>
        <div class="screenshot-scroll">
          <img :src="item.screenshot_url" alt="screenshot" class="screenshot-img" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reader-fullscreen {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #f9f9f6;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
}
.reader-exit-btn {
  position: fixed;
  top: 2.2rem;
  right: 2.5rem;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 2.2rem;
  color: #888;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  z-index: 2100;
  transition: background 0.2s;
}
.reader-exit-btn:hover {
  background: #f0f0f0;
}
.reader-content {
  margin: 0 auto;
  margin-top: 4.5rem;
  margin-bottom: 3rem;
  max-width: 700px;
  width: 100vw;
  background: none;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  font-size: 1.18rem;
  color: #232323;
  line-height: 1.7;
  font-family: 'Georgia', 'serif', 'system-ui';
  box-sizing: border-box;
  border-radius: 0;
}
.reader-content h1, .reader-content h2, .reader-content h3 {
  font-family: 'Inter', 'system-ui', 'sans-serif';
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 2.2rem;
  margin-bottom: 1.1rem;
}
.reader-content p {
  margin-bottom: 1.3rem;
}
.reader-content a {
  color: #3b5cff;
  text-decoration: underline;
  word-break: break-all;
}
.reader-content strong {
  font-weight: 700;
  color: #111;
}
.reader-content em {
  color: #444;
}
.modal-content {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2rem;
  max-width: 540px;
  width: 95vw;
  position: relative;
  animation: pop-in 0.25s;
  min-height: 200px;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
}
.screenshot-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.5rem;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
}
.modal-cover {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 1rem;
  object-fit: cover;
  aspect-ratio: 16/9;
}
.reader-btn {
  margin: 1rem 0 1.5rem 0;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: #222;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.reader-btn:hover {
  background: #444;
}
.reader-html {
  margin: 1.5rem 0 0 0;
  max-height: 50vh;
  overflow-y: auto;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 1.2rem;
  font-size: 1rem;
  color: #222;
}
.modal-links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.modal-link {
  color: #3b5cff;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}
.modal-link:active {
  color: #1a2a6c;
}
.screenshot-modal {
  background: #222;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  max-width: 900px;
  width: 98vw;
  min-width: 320px;
  min-height: 320px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.fake-browser-bar {
  height: 38px;
  background: #f5f5f7;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
}
.browser-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin-right: 7px;
  display: inline-block;
}
.browser-dot.red { background: #ff5f56; }
.browser-dot.yellow { background: #ffbd2e; }
.browser-dot.green { background: #27c93f; }
.browser-url {
  margin-left: 18px;
  font-size: 0.95rem;
  color: #888;
  font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60vw;
}
.screenshot-scroll {
  flex: 1;
  overflow-y: auto;
  background: #111;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.screenshot-img {
  width: 100%;
  max-width: 900px;
  display: block;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  background: #222;
}
.modal-tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  background: #e0e0e0;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 0.85rem;
  color: #333;
}
/* Animación */
.zoom-fade-enter-active, .zoom-fade-leave-active {
  transition: all 0.25s cubic-bezier(.4,2,.6,1);
}
.zoom-fade-enter-from, .zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
</style> 