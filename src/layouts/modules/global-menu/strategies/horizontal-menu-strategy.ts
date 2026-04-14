import HorizontalMenu from '../modules/horizontal-menu.vue';
import type { MenuStrategy } from './types';

/* #__PURE__ */
export function createHorizontalMenuStrategy(): MenuStrategy {
  return {
    name: 'horizontal',
    component: HorizontalMenu
  };
}
