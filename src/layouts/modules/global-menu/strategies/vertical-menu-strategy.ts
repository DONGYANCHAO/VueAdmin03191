import VerticalMenu from '../modules/vertical-menu.vue';
import type { MenuStrategy } from './types';

/* #__PURE__ */
export function createVerticalMenuStrategy(): MenuStrategy {
  return {
    name: 'vertical',
    component: VerticalMenu
  };
}
