<script>
  import CategoryList from '@/lib/components/CategoryList.svelte';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';
</script>

<CategoryList key="game" categoryId={COSMOS_FM_CONFIG.CATEGORY_ID.GAME} />
