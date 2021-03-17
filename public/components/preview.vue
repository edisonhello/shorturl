
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <Title text="Success!"></Title>
    <div class="text-center">
      Now 
      <span class="fake-link" v-on:click="routeTo(aliasUrl)"> {{ aliasUrl }} </span>
      (<span v-on:click="copyToClipboard"> copy </span>)
      is pointed to 
      <span class="fake-link" v-on:click="routeTo(target)"> {{ target }} </span>
    </div>
  </div>
</template>

<style scoped>
.fake-link {
  color: #1273BA;
  cursor: pointer;
}
</style>

<script>
import { mapState } from 'vuex';
import getDomain from '../utils/getDomain.js';

import Title from './Title.vue';

import clipboard from '../utils/clipboard.js';
import routeTo from '../utils/routeTo.js';

export default {
  computed: {
    aliasUrl: function () {
      return `${getDomain()}/${this.alias}`;
    },
    ...mapState('aliasRecord', ['alias', 'target']),
  },
  methods: {
    routeTo,
    copyToClipboard: async function () {
      try {
        await clipboard(this.aliasUrl);
        this.showCopySuccess();
      } catch (e) {
        this.showCopyFailed();
      }
    },
    showCopySuccess() {
      this.$bvToast.toast('Alias link is copied to your clipboard.', {
        variant: 'success',
        title: 'Success!',
        toaster: 'b-toaster-bottom-right',
        append: true,
        autoHideDelay: 2500,
      });
    },
    showCopyFailed() {
      this.$bvToast.toast('Alias link copied failed!', {
        variant: 'danger',
        title: 'Oops!',
        toaster: 'b-toaster-bottom-right',
        append: true,
        autoHideDelay: 2500,
      });
    }
  },
  components: {
    Title,
  },
}

</script>