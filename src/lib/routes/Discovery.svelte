<script lang="ts">
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import Button from '@/ui/components/buttons/Button.svelte';
  import Typography from '@/ui/components/Typography.svelte';
</script>

<View>
  <ViewContent>
    <Typography align="center">Error!</Typography>
    <Button
      title="Keep discovering"
      disabled={true}
      navi={{
        itemId: 'DISCOVERY_LOAD_MORE',
      }}
    />
  </ViewContent>
</View>
