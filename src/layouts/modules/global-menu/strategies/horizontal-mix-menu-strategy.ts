import HorizontalMixMenu from '../modules/horizontal-mix-menu.vue';
import ReversedHorizontalMixMenu from '../modules/reversed-horizontal-mix-menu.vue';
import type { MenuStrategy } from './types';

/* #__PURE__ */
export function createHorizontalMixMenuStrategy(reverse = false): MenuStrategy {
  return {
    name: 'horizontal-mix',
    component: reverse ? ReversedHorizontalMixMenu : HorizontalMixMenu
  };
}
