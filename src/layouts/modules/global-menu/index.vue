<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { createMenuStrategyRegistry } from './strategies';

defineOptions({
  name: 'GlobalMenu'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const strategyRegistry = createMenuStrategyRegistry();

const activeMenu = computed(() =>
  strategyRegistry.getActiveComponent({
    mode: themeStore.layout.mode,
    isMobile: appStore.isMobile,
    isReverse: themeStore.layout.reverseHorizontalMix
  })
);

const reRenderVertical = computed(() => themeStore.layout.mode === 'vertical' && appStore.isMobile);
</script>

<template>
  <component :is="activeMenu" :key="reRenderVertical" />
</template>

<style scoped></style>
