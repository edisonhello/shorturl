
<template>
  <div class="position-fixed p-3" style="right: 0; bottom: 0;">
    <div class="toast hide" v-bind:id="toastId">
      <div class="toast-body">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>

export function showNotification(id) {
  $(`#${id}`).toast({ delay: 10000 });
  $(`#${id}`).toast('show');
}

export default {
  props: ['toastId', 'text', 'type'],
  mounted: function () {
    console.log('toast mount', this.toastId, this.text, this.type);
  }
}

</script>