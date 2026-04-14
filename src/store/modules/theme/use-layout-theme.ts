import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import { localStg } from '@/utils/storage';
import { themeSettings } from '@/theme/settings';

export function useLayoutTheme(settings: Ref<App.Theme.ThemeSetting>) {
  const settingsJson = computed(() => JSON.stringify(settings.value));

  function resetStore() {
    settings.value = themeSettings;
  }

  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    settings.value.layout.mode = mode;
  }

  function setLayoutReverseHorizontalMix(reverse: boolean) {
    settings.value.layout.reverseHorizontalMix = reverse;
  }

  function cacheThemeSettings() {
    const isProd = import.meta.env.MODE === 'prod';
    if (!isProd) return;
    localStg.set('themeSettings', settings.value);
  }

  function setupSettingsCache() {
    watch(
      settings,
      () => {
        cacheThemeSettings();
      },
      { deep: true }
    );
  }

  return {
    settingsJson,
    resetStore,
    setThemeLayout,
    setLayoutReverseHorizontalMix,
    setupSettingsCache
  };
}
