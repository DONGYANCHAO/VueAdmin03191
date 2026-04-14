import VerticalMixMenu from '../modules/vertical-mix-menu.vue';
import type { MenuStrategy } from './types';

/* #__PURE__ */
export function createVerticalMixMenuStrategy(): MenuStrategy {
  return {
    name: 'vertical-mix',
    component: VerticalMixMenu
  };
}
