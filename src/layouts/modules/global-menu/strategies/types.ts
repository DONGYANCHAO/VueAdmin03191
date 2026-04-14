import type { Component } from 'vue';

export interface MenuStrategy {
  name: UnionKey.ThemeLayoutMode;
  component: Component;
  setup?: () => Record<string, unknown>;
}

export interface MenuStrategyContext {
  mode: UnionKey.ThemeLayoutMode;
  isMobile: boolean;
  isReverse?: boolean;
}

export type MenuStrategyFactory = (context: MenuStrategyContext) => MenuStrategy;
