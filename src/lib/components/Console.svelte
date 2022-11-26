<script lang="ts">
  let warn: string;

  // console.warn(`sendCode(): ${JSON.stringify(data)}`);
  const console = (function (oldCons) {
    return {
      ...oldCons,
      warn: function (text) {
        oldCons.warn(text);
        warn = text;
      },
    };
  })(window.console);

  window.console = console;
</script>

<div id="console-errors">
  {#if warn}
    <p class="line-clamp-2 text-orange-500 ">{warn}</p>
  {/if}
</div>
