
<template>
  <div class="container vh-100 d-flex flex-column justify-content-center">
    <Title text="Success!"></Title>
    <div class="text-center">
      Now {{ aliasUrl }} is pointed to {{ target }}
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