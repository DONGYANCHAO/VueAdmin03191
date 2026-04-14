import { nextTick, watch } from 'vue';
import { breakpointsTailwind, useBreakpoints, useEventListener } from '@vueuse/core';
import { useBoolean } from '@sa/hooks';
import { localStg } from '@/utils/storage';

export function useLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller('sm');

  const { bool: fullContent, toggle: toggleFullContent } = useBoolean();
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean();
  const { bool: siderCollapse, setBool: setSiderCollapse, toggle: toggleSiderCollapse } = useBoolean();
  const {
    bool: mixSiderFixed,
    setBool: setMixSiderFixed,
    toggle: toggleMixSiderFixed
  } = useBoolean(localStg.get('mixSiderFixed') === 'Y');

  function setupMixSiderFixedCache() {
    useEventListener(window, 'beforeunload', () => {
      localStg.set('mixSiderFixed', mixSiderFixed.value ? 'Y' : 'N');
    });
  }

  function setupMobileWatcher(
    setThemeLayout: (mode: UnionKey.ThemeLayoutMode) => void,
    getThemeLayout: () => UnionKey.ThemeLayoutMode
  ) {
    watch(
      isMobile,
      newValue => {
        if (newValue) {
          localStg.set('backupThemeSettingBeforeIsMobile', {
            layout: getThemeLayout(),
            siderCollapse: siderCollapse.value
          });
          setThemeLayout('vertical');
          setSiderCollapse(true);
        } else {
          const backup = localStg.get('backupThemeSettingBeforeIsMobile');
          if (backup) {
            nextTick(() => {
              setThemeLayout(backup.layout);
              setSiderCollapse(backup.siderCollapse);
              localStg.remove('backupThemeSettingBeforeIsMobile');
            });
          }
        }
      },
      { immediate: true }
    );
  }

  return {
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
  };
}
