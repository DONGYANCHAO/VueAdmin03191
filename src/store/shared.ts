import type { EffectScope } from 'vue';
import { effectScope, onScopeDispose } from 'vue';

export function createManagedScope() {
  const scope = effectScope();

  onScopeDispose(() => {
    scope.stop();
  });

  return scope;
}

export function withScope<T>(scope: EffectScope, fn: () => T) {
  return scope.run(fn);
}

export function defineStoreScopeSetup<T extends object>(setupFn: () => T) {
  return setupFn;
}
