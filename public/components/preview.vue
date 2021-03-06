
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <Title text="Success!"></Title>
    <div class="text-center">
      Now 
      <a v-bind:href="aliasUrl"> {{ aliasUrl }} </a>
      is pointed to 
      <a v-bind:href="target"> {{ target }} </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getDomain from '../utils/getDomain.js';

import Title from './Title.vue';

export default {
  computed: {
    aliasUrl: function () {
      return `${getDomain()}/${this.alias}`;
    },
    ...mapState('aliasRecord', ['alias', 'target']),
  },
  components: {
    Title,
  },
}

</script>