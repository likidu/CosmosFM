<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { focus } from '../../actions/focus';
  import FormRow from './FormRow.svelte';

  export let type = 'text';
  export let label: string = null;
  export let icon: typeof SvelteComponent = null;
  export let value: string = '';
  export let placeholder: string = undefined;
  export let disabled = false;
  export let align: 'left' | 'right' | 'edges' = 'edges';
  export let onChange: (val: string) => void;
  export let onSubmit: () => void = undefined;

  const itemId = uuidv4();
  let focused = false;

  function handleChange(ev: Event) {
    onChange((ev.target as HTMLInputElement).value);
  }
</script>

<FormRow
  {icon}
  {label}
  {disabled}
  {align}
  navi={{
    itemId,
    onFocus: () => (focused = true),
    onBlur: () => (focused = false),
    onSelect: () => onSubmit?.(),
  }}
>
  <input
    class="input"
    id="username"
    {type}
    {value}
    {disabled}
    {placeholder}
    use:focus={{ focused }}
    on:input={handleChange}
    on:keydown={(ev) => {
      if (ev.key === 'Enter') ev.preventDefault();
    }}
    on:keyup={(ev) => {
      if (ev.key === 'Enter') ev.preventDefault();
    }}
    class:align-right={align === 'right'}
    class:align-edges={align === 'edges'}
  />
</FormRow>

<style lang="postcss">
  .input {
    @apply flex appearance-none bg-transparent border-none rounded-none w-full leading-tight focus:outline-none;
    min-height: 24px;
  }
  .align-right,
  .align-edges {
    @apply text-right;
  }
</style>
