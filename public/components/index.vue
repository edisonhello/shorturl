
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <Title></Title>
    <div class="row">
      <div class="input-group my-3">
        <input type="text" class="form-control" placeholder="https://google.com" v-model="target" v-on:keydown="filterSubmit">
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button" v-on:click="submit">ニャ！</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

import isUrl from '../../common/isUrl.js';
import getDomainName from '../utils/getDomain.js';
import { post } from '../api.js';

import Title from './Title.vue';


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
        return this.showNotUrlError();
      }

      const { alias } = await post('record', { target });

      this.setAlias(alias);
      this.setTarget(target);

      this.$router.push({ path: 'preview' });
    },
    filterSubmit: function (e) {
      if (e.key === 'Enter') this.submit();
    },
    showNotUrlError: function () {
      this.$bvToast.toast('This is not an url!', {
        variant: 'danger',
        title: 'Oops!',
        toaster: 'b-toaster-bottom-right',
        append: true,
        autoHideDelay: 2500,
      })
    },
    ...mapMutations('aliasRecord', [
      'setAlias',
      'setTarget',
    ]),
  },
  watch: {
  },
  components: {
    Title,
  },
}

</script>