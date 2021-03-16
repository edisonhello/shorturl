
<template>
  <div class="position-fixed p-3" style="right: 0; bottom: 0;">
    <div class="toast hide" v-bind:id="id" v-bind:class="styleClass">
      <div class="toast-body">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>

import { getRandomString } from '../../common/randomString.js';

export default {
  data: () => {
    return {
      id: getRandomString(10),
    }
  },
  props: ['text', 'type'],
  methods: {
    show: function (option = {}) {
      if (!option.delay) option.delay = 2500;

      $(`#${this.id}`).toast(option);
      $(`#${this.id}`).toast('show');
    },
    hide: function () {
      $(`#${this.id}`).toast('hide');
    }
  },
  computed: {
    bgClass: function () {
      return `bg-${this.type}`;
    },
    textClass: function () {
      if (['danger', 'success'].includes('danger')) return 'text-white';
    },
    styleClass: function () {
      return [this.bgClass, this.textClass];
    }
  }
}

</script>