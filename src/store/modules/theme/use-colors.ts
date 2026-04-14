import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import { getPaletteColorByNumber } from '@sa/color';
import { localStg } from '@/utils/storage';
import { addThemeVarsToGlobal, createThemeToken, getNaiveTheme, toggleAuxiliaryColorModes } from './shared';

export function useColors(settings: Ref<App.Theme.ThemeSetting>) {
  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value;
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info
    };
    return colors;
  });

  const uiTheme = computed(() => getNaiveTheme(themeColors.value, settings.value.recommendColor));

  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    let colorValue = color;
    if (settings.value.recommendColor) {
      colorValue = getPaletteColorByNumber(color, 500, true);
    }
    if (key === 'primary') {
      settings.value.themeColor = colorValue;
    } else {
      settings.value.otherColor[key] = colorValue;
    }
  }

  function setupThemeVarsToGlobal() {
    const { themeTokens, darkThemeTokens } = createThemeToken(
      themeColors.value,
      settings.value.tokens,
      settings.value.recommendColor
    );
    addThemeVarsToGlobal(themeTokens, darkThemeTokens);
  }

  function setupColorsWatcher() {
    watch(
      themeColors,
      val => {
        setupThemeVarsToGlobal();
        localStg.set('themeColor', val.primary);
      },
      { immediate: true }
    );
  }

  return {
    themeColors,
    uiTheme,
    updateThemeColors,
    setupThemeVarsToGlobal,
    setupColorsWatcher,
    toggleAuxiliaryColorModes
  };
}
