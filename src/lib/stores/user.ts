import { writable } from 'svelte/store';
import { Storage } from '@/ui/services';
import type { MenuItem, RefreshTokenStorage, User } from '@/lib/models';

export const menu = writable<MenuItem[]>([]);

/**
 * @summary Create store for user and tokens and save them to LocalStorage
 * @param key
 * @param initStore
 * @returns Store<T>
 */
function createStore<T>(key: 'user' | 'auth', initStore: T) {
  const { subscribe, update, set } = writable<T>(initStore);

  subscribe((val) => {
    Storage.set(key, val);
  });

  return {
    subscribe,
    update: function (data: Partial<T>) {
      update((previous) => ({ ...previous, ...data }));
    },
    reset: function () {
      set(null);
    },
  };
}

const storedUser = Storage.get<User>('user');

export const user = createStore<User>('user', storedUser);

const storedTokens = Storage.get<RefreshTokenStorage>('auth');

export const tokens = createStore<RefreshTokenStorage>('auth', storedTokens);
