import type { Component } from 'vue';
import type { MenuStrategy, MenuStrategyContext as StrategyContextType } from './types';

export class MenuStrategyContext {
  private strategies: Map<UnionKey.ThemeLayoutMode, (reverse?: boolean) => MenuStrategy>;

  constructor() {
    this.strategies = new Map();
  }

  registerStrategy(mode: UnionKey.ThemeLayoutMode, strategy: (reverse?: boolean) => MenuStrategy) {
    this.strategies.set(mode, strategy);
  }

  getActiveComponent(context: StrategyContextType): Component {
    const strategyFactory = this.strategies.get(context.mode);
    if (!strategyFactory) {
      throw new Error(`No menu strategy found for mode: ${context.mode}`);
    }
    const strategy = strategyFactory(context.isReverse);
    return strategy.component;
  }

  getStrategyKeys(): UnionKey.ThemeLayoutMode[] {
    return Array.from(this.strategies.keys()) as UnionKey.ThemeLayoutMode[];
  }
}
