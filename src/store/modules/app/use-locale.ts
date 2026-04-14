import { ref, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { router } from '@/router';
import { localStg } from '@/utils/storage';
import { $t, setLocale } from '@/locales';
import { setDayjsLocale } from '@/locales/dayjs';

export function useLocale() {
  const locale = ref<App.I18n.LangType>(localStg.get('lang') || 'zh-CN');

  const localeOptions: App.I18n.LangOption[] = [
    { label: '中文', key: 'zh-CN' },
    { label: 'English', key: 'en-US' }
  ];

  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang;
    setLocale(lang);
    localStg.set('lang', lang);
  }

  function updateDocumentTitleByLocale() {
    const { i18nKey, title } = router.currentRoute.value.meta;
    const documentTitle = i18nKey ? $t(i18nKey) : title;
    useTitle(documentTitle);
  }

  function initLocale() {
    setDayjsLocale(locale.value);
  }

  function setupLocaleWatchers(updateMenus: () => void, updateTabs: () => void) {
    watch(locale, () => {
      updateDocumentTitleByLocale();
      updateMenus();
      updateTabs();
      setDayjsLocale(locale.value);
    });
  }

  return {
    locale,
    localeOptions,
    changeLocale,
    initLocale,
    setupLocaleWatchers
  };
}
