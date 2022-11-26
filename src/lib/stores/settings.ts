import { writable } from 'svelte/store';

import { Animations, Density, TextSize, TextWeight } from '@/ui/enums';
import { Storage } from '@/ui/services';

import type { Settings } from '@/lib/models';
import { themes } from '@/lib/configs/themes';

const defaultSettings: Partial<Settings> = {
  themeId: themes[2].id,
  textSize: TextSize.Medium,
  textWeight: TextWeight.Medium,
  displayDensity: Density.Normal,
  borderRadius: 14,
  animationSpeed: Animations.Normal,
  showHelpText: true,
  // Shortcuts
  enableShortcutKeys: true,
  shortcutKeyLocation: 'right',
  shortcutKeyColor: 'secondary',
  contextMenuIndicators: true,
  // Theme
  accentColorH: themes[2].values.accentColorH,
  accentColorS: themes[2].values.accentColorS,
  accentColorL: themes[2].values.accentColorL,
  cardColorH: themes[2].values.cardColorH,
  cardColorS: themes[2].values.cardColorS,
  cardColorL: themes[2].values.cardColorL,
  textColorH: themes[2].values.textColorH,
  textColorS: themes[2].values.textColorS,
  textColorL: themes[2].values.textColorL,
  focusColorA: themes[2].values.focusColorA,
  dividerColorA: themes[2].values.dividerColorA,
  // Toaster
  toasterLocation: 'bottom',
  toasterDuration: 3000,
};

const storedSettings = Storage.get<Settings>('settings');

function createSettings() {
  const { subscribe, update } = writable<Settings>({
    ...defaultSettings,
    ...storedSettings,
  });

  subscribe((val) => {
    Storage.set('settings', val);
  });

  return {
    subscribe,
    update: function (data: Partial<Settings>) {
      update((previous) => ({ ...previous, ...data }));
    },
    updateOne: function <T extends keyof Settings>(key: T, value: Settings[T]) {
      update((previous) => ({ ...previous, [key]: value }));
    },
  };
}

export const settings = createSettings();
