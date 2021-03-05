
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <Title></Title>
    <div v-if="state == 'form'">
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

    <div v-if="state == 'result'">
      <div class="text-center">
        Now {{ aliasUrl }} is pointed to {{ target }}
      </div>
    </div>
  </div>
</template>

<script>

import isUrl from '../../common/isUrl.js';

import { post } from '../api.js';

import Notification from './Notification.vue';
import Title from './Title.vue';

import getDomainName from '../utils/getDomain.js';


export default {
  data: () => {
    return {
      alias: '',
      state: 'form',
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

      this.alias = alias;

      this.switchToResult();
    },
    switchToResult: function () {
      this.state = 'result';
    }
  },
  components: {
    Title,
    Notification,
  },
}

</script>