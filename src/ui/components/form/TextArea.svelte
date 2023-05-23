<script lang="ts">
  import autosize from 'autosize';
  import { onDestroy, onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import { focus } from '../../actions/focus';
  import NavItem from '../nav/NavItem.svelte';

  export let value = '';
  export let maxlength: number = undefined;
  export let placeholder: string = undefined;
  export let disabled = false;
  export let onChange: (val: string) => void;
  export let onSubmit: () => void = undefined;

  const itemId = uuidv4();
  let focused = false;
  let textarea: HTMLTextAreaElement;

  onMount(() => autosize(textarea));

  onDestroy(() => autosize.destroy(textarea));

  function handleChange(ev: Event) {
    onChange((ev.target as HTMLInputElement).value);
  }
</script>

<NavItem
  {disabled}
  navi={{
    itemId,
    onFocus: () => (focused = true),
    onBlur: () => (focused = false),
    onSelect: () => onSubmit?.(),
  }}
>
  <div class="content" use:focus={{ focused }} style={!!focused && 'opacity: 100'}>
    <textarea
      class="input"
      rows="1"
      bind:this={textarea}
      {value}
      {disabled}
      {placeholder}
      {maxlength}
      use:focus={{ focused }}
      on:input={handleChange}
      on:keydown={(ev) => {
        if (ev.key === 'Enter') {
          // TODO: use not obsolete APIs for this
          // document.execCommand('defaultParagraphSeparator', false, 'p');
          ev.preventDefault();
        }
      }}
      on:keyup={(ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault();
        }
      }}
    />
  </div>
</NavItem>

<style lang="postcss">
  .content {
    @apply flex items-center p-3 opacity-70;
    border-bottom: 2px solid var(--accent-color);
  }
  .content:focus {
    @apply opacity-100;
  }
  .input {
    @apply flex appearance-none bg-transparent resize-none border-none rounded-none w-full px-2 leading-tight focus:outline-none;
    line-height: 24px;
    min-height: 24px;
  }
</style>
