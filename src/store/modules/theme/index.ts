import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import { createManagedScope, withScope } from '../../shared';
import { initThemeSettings } from './shared';
import { useScheme } from './use-scheme';
import { useColors } from './use-colors';
import { useLayoutTheme } from './use-layout-theme';

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = createManagedScope();
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings());

  const { darkMode, setGrayscale, setColourWeakness, setThemeScheme, toggleThemeScheme, setupSchemeWatchers } =
    useScheme(settings);
  const { themeColors, uiTheme, updateThemeColors, setupColorsWatcher, toggleAuxiliaryColorModes } =
    useColors(settings);
  const { settingsJson, resetStore, setThemeLayout, setLayoutReverseHorizontalMix, setupSettingsCache } =
    useLayoutTheme(settings);

  withScope(scope, () => {
    setupSchemeWatchers(toggleAuxiliaryColorModes);
    setupColorsWatcher();
    setupSettingsCache();
  });

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    uiTheme,
    settingsJson,
    setGrayscale,
    setColourWeakness,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout,
    setLayoutReverseHorizontalMix
  };
});
