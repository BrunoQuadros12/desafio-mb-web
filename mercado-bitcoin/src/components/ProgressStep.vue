<template>
  <div class="container">
    <div class="progress">
      Etapa <span class="step-number">{{ step }}</span> de 4
    </div>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: String,
    step: String
  })
</script>

<style lang="scss" scoped>
  .container {
    .title {
      font-size: 23px;
      font-weight: bolder;
    }

    .progress {
      font-size: 12px;

      .step-number{
        color: #ff9900;
        font-weight: 700;
      }
    }
  }
</style>