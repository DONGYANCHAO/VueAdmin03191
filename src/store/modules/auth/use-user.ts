import { computed, reactive, ref } from 'vue';
import { fetchGetUserInfo } from '@/service/api';
import { localStg } from '@/utils/storage';
import { clearAuthStorage, getToken } from './shared';

export function useUser() {
  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: []
  });

  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;
    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  const isLogin = computed(() => Boolean(token.value));

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();
    if (!error) {
      Object.assign(userInfo, info);
      return true;
    }
    return false;
  }

  async function initUserInfo() {
    const hasToken = getToken();
    if (hasToken) {
      const pass = await getUserInfo();
      if (!pass) {
        return false;
      }
    }
    return true;
  }

  function updateToken(newToken: string) {
    token.value = newToken;
    localStg.set('token', newToken);
  }

  function resetUser() {
    token.value = '';
    Object.assign(userInfo, { userId: '', userName: '', roles: [], buttons: [] });
    clearAuthStorage();
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    getUserInfo,
    initUserInfo,
    updateToken,
    resetUser
  };
}
