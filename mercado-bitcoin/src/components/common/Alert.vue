<template>
  <div class="container">
    <div :class="[props.type == 'success' ? 'success' : 'error']">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    message: String,
    type: String,
  });
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;

    .success {
      background-color: #90EE90;
      border: 1px solid #006400;
      border-radius: 6px;
      color: #006400;
      padding: 10px;
    }

    .error {
      background-color: #FA8072;
      border: 1px solid #8B0000;
      border-radius: 6px;
      color: #8B0000;
      padding: 10px;
    } 
  }
</style>