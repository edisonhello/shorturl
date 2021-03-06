
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <Title></Title>
    <div class="row">
      <div class="input-group my-3">
        <input type="text" class="form-control" placeholder="https://google.com" v-model="target">
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button" v-on:click="submit">ニャ！</button>
        </div>
      </div>
    </div>
    <Notification ref="urlerror" type="danger" text="Oops, this is not an url"></Notification>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

import isUrl from '../../common/isUrl.js';

import { post } from '../api.js';

import Notification from './Notification.vue';
import Title from './Title.vue';

import getDomainName from '../utils/getDomain.js';

export default {
  data: () => {
    return {
      target: '',
    }
  },
  computed: {
    aliasUrl: function () {
      return `${getDomainName()}/${this.alias}`;
    }
  },
  methods: {
    submit: async function () {
      const { target } = this;

      if (!isUrl(target)) {
        return this.$refs.urlerror.show();
      }

      const { alias } = await post('createNew', { target });

      this.setAlias(alias);
      this.$router.push({ path: 'preview' });
    },
    ...mapMutations('aliasRecord', [
      'setAlias',
      'setTarget',
    ]),
  },
  watch: {
    target: function(target) {
      this.setTarget(target);
    }
  },
  components: {
    Title,
    Notification,
  },
}

</script>