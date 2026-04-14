import { localStg } from '@/utils/storage';

export function useAuthTab() {
  function recordUserId(userId: string) {
    if (!userId) return;
    localStg.set('lastLoginUserId', userId);
  }

  function checkTabClear(userId: string, clearTabs: () => void): boolean {
    if (!userId) return false;
    const lastLoginUserId = localStg.get('lastLoginUserId');
    if (lastLoginUserId !== userId) {
      localStg.remove('globalTabs');
      clearTabs();
      return true;
    }
    return false;
  }

  return {
    recordUserId,
    checkTabClear
  };
}
