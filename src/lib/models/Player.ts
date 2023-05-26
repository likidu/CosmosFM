export type Player = {
  eid: string;
  pid: string;
  duration: number;
  buffered: number;
  progress: number;
  playing: boolean;
};

// Wraps in "data" key
export type PlaybackProgress = [
  {
    eid: string;
    pid: string;
    progress: number;
  },
];
