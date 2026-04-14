import { useBoolean } from '@sa/hooks';

export function usePage() {
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true);
  const { bool: themeDrawerVisible, setTrue: openThemeDrawer, setFalse: closeThemeDrawer } = useBoolean();

  async function reloadPage(duration = 300, hasPageAnimate = true) {
    setReloadFlag(false);
    const d = hasPageAnimate ? duration : 40;
    await new Promise(resolve => {
      setTimeout(resolve, d);
    });
    setReloadFlag(true);
  }

  return {
    reloadFlag,
    reloadPage,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer
  };
}
