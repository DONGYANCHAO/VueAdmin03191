import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { SetupStoreId } from '@/enum';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { useUser } from './use-user';
import { useLogin } from './use-login';
import { useAuthTab } from './use-auth';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();

  const { token, userInfo, isStaticSuper, isLogin, getUserInfo, initUserInfo, updateToken, resetUser } = useUser();
  const { loginLoading, login, toLogin } = useLogin();
  const { recordUserId, checkTabClear } = useAuthTab();

  async function resetStore() {
    recordUserId(userInfo.userId);
    resetUser();
    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  function handleCheckTabClear(): boolean {
    return checkTabClear(userInfo.userId, tabStore.clearTabs);
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login: (userName: string, password: string, redirect = true) =>
      login(userName, password, updateToken, getUserInfo, resetStore, handleCheckTabClear, redirect),
    initUserInfo
  };
});
