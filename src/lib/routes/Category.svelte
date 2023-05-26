<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import Router, { location, replace } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';

  import { Game, Story, TalkShow } from '@/lib/routes';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Tab from '@/ui/components/tab/Tab.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconInbox, IconMenu } from '@/ui/icons';

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
  ];

  const routes = {
    '/story': Story,
    '/game': Game,
    '/talk-show': TalkShow,
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
  <ViewFooter>
    <SoftKey>
      <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
      <div><Icon size={IconSize.Small}><IconInbox /></Icon></div>
    </SoftKey>
  </ViewFooter>
</View>
