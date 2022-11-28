<script lang="ts">
  import { Color } from '../../enums';

  // TODO: Use TailwindCSS from Progress
  export let height = 7;
  export let color: Color = Color.Accent;
  export let value: number;
  export let shade: number = 0;
</script>

<div class="root" style={`height: ${height}px`}>
  <div class="progress" style={`right: calc(100% - ${value}%); background-color: ${color}`} />
  {#if shade > 0}
    <div class="shade" style={`right: calc(100% - ${shade}%)`} />
  {/if}
</div>

<style>
  .root {
    position: relative;
    height: 10px;
    margin: 5px 0;
    border-radius: var(--radius);
    overflow: hidden;
    background-color: var(--divider-color);
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: var(--radius);
  }
  .shade {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: var(--radius);
    background-color: var(--focus-color);
  }
</style>
