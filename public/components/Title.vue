
<template>
  <div class="row">
    <div class="col text-center" style="font-family: 'RocknRoll One', sans-serif; color: #777777; font-size: 60px;">
      {{ displayText }} 
    </div>
  </div>
</template>

<script>

export default {
  props: ['text'],
  computed: {
    displayText: function () {
      return this.text || 'Meow!';
    }
  }
}

</script>