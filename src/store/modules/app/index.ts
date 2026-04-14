import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { useThemeStore } from '../theme';
import { createManagedScope, withScope } from '../../shared';
import { useLocale } from './use-locale';
import { useLayout } from './use-layout';
import { usePage } from './use-page';

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const themeStore = useThemeStore();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const scope = createManagedScope();

  const { locale, localeOptions, changeLocale, initLocale, setupLocaleWatchers } = useLocale();
  const {
    isMobile,
    fullContent,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    mixSiderFixed,
    setMixSiderFixed,
    toggleMixSiderFixed,
    setupMobileWatcher,
    setupMixSiderFixedCache
  } = useLayout();
  const { reloadFlag, reloadPage, themeDrawerVisible, openThemeDrawer, closeThemeDrawer } = usePage();

  withScope(scope, () => {
    setupMobileWatcher(themeStore.setThemeLayout, () => themeStore.layout.mode);
    setupLocaleWatchers(routeStore.updateGlobalMenusByLocale, tabStore.updateTabsByLocale);
  });

  setupMixSiderFixedCache();
  initLocale();

  return {
    isMobile,
    reloadFlag,
    reloadPage,
    fullContent,
    locale,
    localeOptions,
    changeLocale,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    mixSiderFixed,
    setMixSiderFixed,
    toggleMixSiderFixed
  };
});
