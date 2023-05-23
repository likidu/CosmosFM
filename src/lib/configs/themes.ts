import type { ThemeConfig } from '@/ui/models';
import { themes as baseThemes } from '@/ui/themes';

export const themes: ThemeConfig[] = [
  ...baseThemes,
  {
    id: 'cosmos-light',
    values: {
      cardColorH: 0,
      cardColorS: 0,
      cardColorL: 100,

      accentColorH: 200,
      accentColorS: 63.3,
      accentColorL: 57.3,

      textColorH: 0,
      textColorS: 0,
      textColorL: 0,

      focusColorA: 7,
      dividerColorA: 10,
    },
  },
  {
    id: 'cosmos-dark',
    values: {
      cardColorH: 0,
      cardColorS: 0,
      cardColorL: 15,

      accentColorH: 200,
      accentColorS: 63.3,
      accentColorL: 71.2,

      textColorH: 0,
      textColorS: 0,
      textColorL: 100,

      focusColorA: 12,
      dividerColorA: 10,
    },
  },
];
