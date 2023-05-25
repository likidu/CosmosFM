<script lang="ts">
  import NavItem from '@/ui/components/nav/NavItem.svelte';

  import type { Banner } from '@/lib/models';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';

  export let banners: Banner[];
</script>

<NavItem navi={{ itemId: 'banner' }}>
  <div>
    <img src={`${banners[0].image}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_4}`} alt="Disovery Banner" />
  </div>
</NavItem>
