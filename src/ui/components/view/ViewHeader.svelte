<script lang="ts">
  export let title: string = undefined;
  let css: string = '';
  export { css as style };
</script>

<div class="flex items-center overflow-hidden whitespace-nowrap px-1 py-0.5" style={css}>
  <h1 class="flex-auto text-center overflow-hidden text-ellipsis px-3">
    {title}
  </h1>
</div>
