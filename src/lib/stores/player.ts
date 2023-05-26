import type { Player } from '@/lib/models';
import { Storage } from '@/ui/services';
import { writable } from 'svelte/store';

// Default values for player store
const DEFAULT_MEDIA: Player = {
  eid: undefined,
  pid: undefined,
  duration: 0,
  buffered: 0,
  progress: 0,
  playing: false,
};

function createPlayer(key: 'player', initStore: Player) {
  const { subscribe, update, set } = writable<Player>(initStore);

  subscribe((val: Partial<Player>) => {
    // Only update LocalStorage when the audio is paused
    if (!val.playing) Storage.set(key, val);
  });

  return {
    subscribe,
    update: function (data: Partial<Player>) {
      update((previous) => ({ ...previous, ...data }));
    },
    reset: function () {
      set(DEFAULT_MEDIA);
    },
  };
}

const storedMedia = Storage.get<Player>('player');
let initStore = DEFAULT_MEDIA;
if (storedMedia) initStore = storedMedia;

export const player = createPlayer('player', initStore);
