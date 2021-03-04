
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <div class="row">
      <div class="col text-center" style="font-family: 'RocknRoll One', sans-serif; color: #777777; font-size: 60px;">
        Meow!
      </div>
    </div>
    <div class="row">
      <div class="input-group my-3">
        <input type="text" class="form-control" placeholder="https://google.com" v-model="target">
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button" v-on:click="submit">ニャ！</button>
        </div>
      </div>
    </div>

    <notification ref="urlerror" type="danger" text="Oops, this is not an url"></notification>
  </div>
</template>

<script>

import isUrl from '../../common/isUrl.js';
import notification from './Notification.vue';

import { post } from '../api.js';

export default {
  data: () => {
    return {
      target: '',
    }
  },
  methods: {
    submit: async function () {
      const { target } = this;

      if (!isUrl(target)) {
        return this.$refs.urlerror.show();
      }

      const { alias } = await post('createNew', { target });

      console.log(alias, target);
    },
  },
  components: {
    notification,
  },
}

</script>