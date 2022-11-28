<script lang="ts">
  import NavItem from '@/ui/components/nav/NavItem.svelte';

  import type { DiscoveryBanner } from '@/lib/models';

  export let content: DiscoveryBanner;

  const { data } = content;
</script>

<NavItem navi={{ itemId: 'banner' }}>
  <div>
    <img src={data[0].image} alt="Disovery Banner" />
  </div>
</NavItem>
