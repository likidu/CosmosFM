<script lang="ts">
  export let columns = 3;

  let cls = '';
  export { cls as class };
</script>

<div class={`root ${cls}`} style={`grid-template-columns: repeat(${columns}, 1fr)`}>
  <slot />
</div>

<style lang="postcss">
  .root {
    @apply grid auto-rows-max;
  }
</style>
