<script lang="ts">
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import CheckboxRow from '@/ui/components/form/CheckboxRow.svelte';
  import InlineSelectRow from '@/ui/components/form/InlineSelectRow.svelte';
  import Typography from '@/ui/components/Typography.svelte';

  import svelteLogo from '@/assets/svelte.svg';

  let values: any = {
    checkbox1: true,
    inlineSelect1: '1',
  };
</script>

<View>
  <ViewContent>
    <Typography align="center">Home</Typography>
    <CheckboxRow label="Checkbox 1" checked={values.checkbox1} onChange={(val) => (values.checkbox1 = val)} />
    <InlineSelectRow
      label="Select 1"
      value={values.inlineSelect1}
      options={[
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
      ]}
      onChange={(val) => (values.inlineSelect1 = val)}
    />
    <div>
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </div>
    <h1 class="text-slate-500">Vite + Svelte</h1>
  </ViewContent>
</View>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
</style>
