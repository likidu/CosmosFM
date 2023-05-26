<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import Router, { location, replace } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';

  import { Game, Social, Story, TalkShow } from '@/lib/routes';
  import Tab from '@/ui/components/tab/Tab.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  const prefix = '/category';
  const tabItems = [
    // {
    //   label: 'Technology',
    //   url: `${prefix}/tech`,
    // },
    // {
    //   label: 'Reading',
    //   url: `${prefix}/reading`,
    // },
    {
      label: 'Story',
      url: `${prefix}/story`,
    },
    {
      label: 'Game',
      url: `${prefix}/game`,
    },
    {
      label: 'Talk Show',
      url: `${prefix}/talk-show`,
    },
    {
      label: 'Social',
      url: `${prefix}/social`,
    },
  ];

  const routes = {
    '/story': Story,
    '/game': Game,
    '/talk-show': TalkShow,
    '/social': Social,
  };

  const keyMan = OnyxKeys.subscribe(
    {
      onSoftLeft: async () => {},
      onSoftRight: async () => {},
    },
    { priority: 4 },
  );

  $: if ($location === prefix) replace(`${prefix}/story`);

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  <ViewHeader>
    <Tab items={tabItems} />
  </ViewHeader>
  <ViewContent>
    <div in:fade={{ duration: 500 }}>
      <Router {routes} {prefix} restoreScrollState={true} />
    </div>
  </ViewContent>
</View>
