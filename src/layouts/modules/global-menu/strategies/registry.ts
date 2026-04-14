import { MenuStrategyContext as StrategyContext } from './context';
import { createVerticalMenuStrategy } from './vertical-menu-strategy';
import { createVerticalMixMenuStrategy } from './vertical-mix-menu-strategy';
import { createHorizontalMenuStrategy } from './horizontal-menu-strategy';
import { createHorizontalMixMenuStrategy } from './horizontal-mix-menu-strategy';

/* #__PURE__ */
export function createMenuStrategyRegistry() {
  const context = new StrategyContext();

  context.registerStrategy('vertical', () => createVerticalMenuStrategy());
  context.registerStrategy('vertical-mix', () => createVerticalMixMenuStrategy());
  context.registerStrategy('horizontal', () => createHorizontalMenuStrategy());
  context.registerStrategy('horizontal-mix', reverse => createHorizontalMixMenuStrategy(reverse));

  return context;
}
