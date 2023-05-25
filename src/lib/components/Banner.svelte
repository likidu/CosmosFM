<script lang="ts">
  import NavItem from '@/ui/components/nav/NavItem.svelte';

  import type { DiscoveryBanner } from '@/lib/models';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';

  export let content: DiscoveryBanner;

  const { data } = content;
</script>

<NavItem navi={{ itemId: 'banner' }}>
  <div>
    <img src={`${data[0].image}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS}`} alt="Disovery Banner" />
  </div>
</NavItem>
