import { useLoading } from '@sa/hooks';
import { fetchGetUserInfo, fetchLogin } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';

export function useLogin() {
  const { loading: loginLoading, startLoading, endLoading } = useLoading();
  const { toLogin, redirectFromLogin } = useRouterPush(false);

  async function loginByToken(
    loginToken: Api.Auth.LoginToken,
    updateToken: (token: string) => void,
    getUserInfo: () => Promise<boolean>
  ) {
    localStg.set('token', loginToken.token);
    localStg.set('refreshToken', loginToken.refreshToken);

    const pass = await getUserInfo();
    if (pass) {
      updateToken(loginToken.token);
      return true;
    }
    return false;
  }

  // eslint-disable-next-line max-params
  async function login(
    userName: string,
    password: string,
    updateToken: (token: string) => void,
    getUserInfo: () => Promise<boolean>,
    resetStore: () => Promise<void>,
    checkTabClear: () => boolean,
    redirect = true
  ) {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      const pass = await loginByToken(loginToken, updateToken, getUserInfo);

      if (pass) {
        const isClear = checkTabClear();
        let needRedirect = redirect;
        if (isClear) {
          needRedirect = false;
        }
        await redirectFromLogin(needRedirect);

        const { data: userInfo } = await fetchGetUserInfo();
        if (userInfo) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            message: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
            duration: 4500
          });
        }
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  return {
    loginLoading,
    login,
    toLogin
  };
}
