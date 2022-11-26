<script lang="ts">
  import { querystring, replace } from 'svelte-spa-router';

  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import Button from '@/ui/components/buttons/Button.svelte';
  import InputRow from '@/ui/components/form/InputRow.svelte';
  import SelectRow from '@/ui/components/form/SelectRow.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import { Onyx } from '@/ui/services';
  import { delay } from '@/ui/utils';

  import svelteLogo from '@/assets/svelte.svg';

  import { Cosmos } from '@/lib/services';
  import { user } from '@/lib/stores/user';
  import { PhoneArea } from '@/lib/models';
  import type { AuthError, User } from '@/lib/models';

  let params: URLSearchParams;

  // Input fields
  let area = '+1';
  let mobile = '2067711184';
  let code = '';

  // Step specific texts
  let title = 'Step 1';
  let toast = '';

  // Wait for x second before resend verification code
  const SECOND = 1000;
  const WAIT = 30;
  let counter: number;
  let resend: Button;

  const Step = {
    SendSMS: 'sendsms',
    Login: 'login',
  };

  $: params = new URLSearchParams($querystring);

  function resendCountDown() {
    if (counter > 0) {
      counter--;
      setTimeout(resendCountDown, SECOND);
    }
  }

  async function updateResend() {
    // Update resend button countdown
    counter = WAIT;
    resendCountDown();
    // Wait...
    await delay(WAIT * SECOND);
    // After done waiting, update resend button
    resend.disabled = false;
    resend.title = 'Resend';
  }

  async function sendSMS() {
    // Reset toast
    toast = '';

    const result = await Cosmos.sendCode({
      mobilePhoneNumber: mobile,
      areaCode: area,
    });

    // sendCode returns 200 response, and data: {}
    if (Object.keys(result).length === 0) {
      replace(`/login?step=${Step.Login}`);
      updateResend();
    } else {
      toast = (result as AuthError).toast;
      Onyx.toaster.show({ type: 'error', title: toast });
    }
  }

  async function login() {
    // Reset toast
    toast = '';

    const result = await Cosmos.loginWithSMS({
      mobilePhoneNumber: mobile,
      areaCode: area,
      verifyCode: code,
    });

    if (!(result.hasOwnProperty('success') && result['success'] === false)) {
      // Save to User store
      user.update(result as User);
      replace('/');
    } else {
      toast = (result as AuthError).toast;
      Onyx.toaster.show({ type: 'error', title: toast });
    }
  }

  function next(step: Number = 1) {
    if (!params.get('step')) {
      title = 'Step 2';
      replace(`/login?step=${Step.SendSMS}`);
    }

    if (params.get('step') === Step.SendSMS) {
      title = 'Step 3';
      sendSMS();
    }

    if (params.get('step') === Step.Login) {
      if (step === -1) {
        title = 'Step 2';
        replace(`/login?step=${Step.SendSMS}`);
      } else {
        login();
      }
    }
  }
</script>

<View>
  <ViewHeader {title} />
  <ViewContent>
    {#if !params.get('step')}
      <div class="flex flex-col items-center justify-center">
        <h2>Cosmos.FM</h2>
        <img src={svelteLogo} class="w-32 h-32" alt="Svelte Logo" />
      </div>
      <Button
        title="Login with SMS"
        navi={{
          itemId: 'START',
          onSelect: async () => next(),
        }}
      />
    {:else if params.get('step') === Step.SendSMS}
      <Typography align="center" padding="both">Enter your mobile phone</Typography>
      <SelectRow
        label="Area"
        value={area}
        options={[
          { id: PhoneArea.US, label: 'US' },
          { id: PhoneArea.China, label: 'China' },
        ]}
        onChange={(val) => (area = val.toString())}
      />
      <InputRow label="Mobile" value={mobile} placeholder="Mobile number..." onChange={(val) => (mobile = val)} />
      <Button
        title="Send Code"
        navi={{
          itemId: 'SEND',
          onSelect: async () => next(),
        }}
      />
    {:else if params.get('step') === Step.Login}
      <Typography align="center" padding="both">Enter your verification code</Typography>
      <InputRow label="Verify code" value={code} placeholder="Verify code..." onChange={(val) => (code = val)} />
      <Button
        title="Login"
        navi={{
          itemId: 'LOGIN',
          onSelect: async () => next(),
        }}
      />
      <Button
        title={`Wait ${counter} sec to resend`}
        disabled={true}
        navi={{
          itemId: 'RESEND',
          onSelect: async () => next(-1),
        }}
        bind:this={resend}
      />
    {/if}
  </ViewContent>
</View>
