<script context="module" lang="ts">
  import { player } from '@/lib/stores/player';
  import { clamp } from '@/lib/utils';

  let audio = new Audio();
  // Make KaiOS able to control the volume of it
  // @ts-ignore KaiOS specific
  audio.mozAudioChannelType = 'content';
  audio.preload = 'auto';

  audio.onload = () => {
    audio.play();
    setTimeout(audio.pause.bind(audio), 10);
  };

  audio.onloadedmetadata = () => {};

  audio.onloadeddata = () => {};

  // Get buffered progress
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges#creating_our_own_buffering_feedback
  audio.onprogress = () => {
    const duration = audio.duration;
    if (duration > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
          player.update({ buffered: audio.buffered.end(audio.buffered.length - 1 - i) });
          break;
        }
      }
    }
  };

  audio.ontimeupdate = () => {
    player.update({ progress: audio.currentTime });
  };

  audio.onended = () => pause();

  export function load(eid: string, pid: string, mediaKey: string, duration: number) {
    audio.src = mediaKey;
    audio.currentTime = 0;

    player.update({ eid, pid, duration });
  }

  export function reload(mediaKey: string, progress: number) {
    audio.src = mediaKey;
    audio.currentTime = progress;
  }

  export function src() {
    return audio.src;
  }

  export function play() {
    audio.play();
    player.update({ playing: true });
  }

  export function pause() {
    audio.pause();
    player.update({ playing: false });
  }

  export function stop() {
    audio.src = '';
    audio.currentTime = 0;
    player.reset();
  }

  export function skip(seconds: number) {
    const newTime = clamp(audio.currentTime + seconds, 0, audio.duration);
    audio.currentTime = audio.currentTime + seconds;
    player.update({ progress: newTime });
  }

  export function skipTo(seconds: number) {
    const newTime = clamp(seconds, 0, audio.duration);
    audio.currentTime = seconds;
    player.update({ progress: newTime });
  }
</script>
