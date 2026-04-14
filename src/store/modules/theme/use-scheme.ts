import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import { usePreferredColorScheme } from '@vueuse/core';
import { localStg } from '@/utils/storage';
import { toggleCssDarkMode } from './shared';

export function useScheme(settings: Ref<App.Theme.ThemeSetting>) {
  const osTheme = usePreferredColorScheme();

  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark';
    }
    return settings.value.themeScheme === 'dark';
  });

  const grayscaleMode = computed(() => settings.value.grayscale);
  const colourWeaknessMode = computed(() => settings.value.colourWeakness);

  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme;
  }

  function setGrayscale(isGrayscale: boolean) {
    settings.value.grayscale = isGrayscale;
  }

  function setColourWeakness(isColourWeakness: boolean) {
    settings.value.colourWeakness = isColourWeakness;
  }

  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto'];
    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme);
    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;
    setThemeScheme(themeSchemes[nextIndex]);
  }

  function setupSchemeWatchers(toggleAuxiliary: (grayscale: boolean, colorWeak: boolean) => void) {
    watch(
      darkMode,
      val => {
        toggleCssDarkMode(val);
        localStg.set('darkMode', val);
      },
      { immediate: true }
    );

    watch(
      [grayscaleMode, colourWeaknessMode],
      val => {
        toggleAuxiliary(val[0], val[1]);
      },
      { immediate: true }
    );
  }

  return {
    darkMode,
    grayscaleMode,
    colourWeaknessMode,
    setThemeScheme,
    setGrayscale,
    setColourWeakness,
    toggleThemeScheme,
    setupSchemeWatchers
  };
}
