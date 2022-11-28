<script lang="ts">
  import IconBase from '@/ui/icons/IconBase.svelte';
</script>

<IconBase viewBox="0 0 30 30" {...$$props}>
  <defs
    ><linearGradient id="prefix__b" spreadMethod="pad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="41" y2="43"
      ><stop offset="0%" stop-color="#25B4E1" /><stop offset="50%" stop-color="#85C5D0" /><stop
        offset="100%"
        stop-color="#E5D5BE"
      /></linearGradient
    ><linearGradient id="prefix__d" spreadMethod="pad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="41" y2="43"
      ><stop offset="0%" stop-color="#25B4E1" /><stop offset="50%" stop-color="#85C5D0" /><stop
        offset="100%"
        stop-color="#E5D5BE"
      /></linearGradient
    ><clipPath id="prefix__a"><path d="M0 0h30v30H0z" /></clipPath><mask id="prefix__c"
      ><path
        fill-opacity="0"
        stroke="#BAA768"
        stroke-width="3"
        d="M6.782 18.667c-1.673 2.111-5.165 6.8-3.081 6.675 2.686-.162 17.841-11.93 19.689-13.956 1.848-2.025 4.592-4.656 3.545-5.892-.414-.489-2.215.21-3.944 1.048"
        display="block"
      /></mask
    ></defs
  ><g clip-path="url(#prefix__a)"
    ><g display="block"
      ><ellipse
        stroke="url(#prefix__d)"
        stroke-width="2"
        fill="transparent"
        rx="4"
        ry="15"
        cx="14"
        cy="15"
        class="progress-ring__circle"
      /><path
        fill="url(#prefix__b)"
        d="M16.02 14.38c-2.63 2.04-5.21 3.79-7.47 5.11a9.89 9.89 0 004.63 1.15c5.46 0 9.88-4.43 9.88-9.91 0-.78-.09-1.54-.26-2.28-1.83 1.85-4.17 3.9-6.78 5.93zM3.31 10.73c0 1.09.17 2.14.5 3.12l.76 1.73c.2.36.42.7.66 1.03 2.3-1.23 5.21-3.14 8.27-5.51 3.04-2.35 5.61-4.69 7.37-6.6-.29-.36-.61-.7-.95-1.01l-1.49-1.16A9.873 9.873 0 0013.19.82c-5.46 0-9.88 4.44-9.88 9.91z"
        transform="rotate(-.774 346.995 -153.81)"
      /></g
    ></g
  >
</IconBase>

<style lang="postcss">
  .progress-ring__circle {
    @apply origin-1/2 rotate-52;
  }
</style>
