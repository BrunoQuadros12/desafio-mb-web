<template>
  <div class="container">
    <div>
      <span for="" class="form-label">Sua senha</span>
      <input type="password" class="form-input" v-model="fields.password" placeholder="Deve conter mais de 4 caracteres">
    </div>

    <div class="btn-container">
      <button type="button" class="btn-back" @click="goBackStep">Voltar</button>
      <button type="button" class="btn-continue" @click="nextStep" :disabled="isDisabled">Continue</button>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits, ref, watch, onMounted } from "vue";

  const isDisabled = ref(true);

  const emit = defineEmits();

  const fields = ref({
    password: null,
  });

  onMounted(() => {
    const savedPasswordFields = sessionStorage.getItem("password");

    if(savedPasswordFields) {
      try {
        const fieldsParse = JSON.parse(savedPasswordFields);
        if (Object.keys(fieldsParse.fields).length > 0) {
          fields.value.password = fieldsParse.fields.password;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  const paramsFromPassword = ref({
    fields: fields.value,
    step: 4,
    title: 'Revise suas informações'
  });

  watch(fields, (newValue) => {
    if(newValue.password) isDisabled.value = false; 
    else if(!newValue.password) isDisabled.value = true;

  }, { deep: true });


  const goBackStep = () => {
    try {
      const dataParse = JSON.parse(sessionStorage.getItem('email'));
      const title = dataParse.fields.typePerson == 'CPF' ? 'Pessoa física' : 'Pessoa jurídica';
      emit('backStep', {step:2, title});
    } catch (error) {
      throw new Error(error)
    }
  };

  const nextStep = () => {
    emit('paramsFromPassword', paramsFromPassword.value);
  };

</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
  
    .form-label {
      display: block;
      font-size: 14px;
      margin-bottom: 3px;
    }

    .form-input { 
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 5px 10px;
    }

    .btn-container {
      display: flex;
      gap: 20px;
      
      .btn-back {
        background-color: #fff;
        border: 1px solid #ff9900;
        border-radius: 4px;
        color: #ff9900;
        cursor: pointer;
        margin-top: 10px;
        padding: 5px 12px;
        width: 100%;
      }
    }
    
    .btn-continue {
      background-color: #ff9900;
      border: 1px solid #ff9900;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      margin-top: 10px;
      padding: 5px 12px;
      width: 100%;

      &:hover {
        background-color: #ffb341;
        border: 1px solid #ffb341;
      }

      &:disabled {
        background-color: #ccc;
        border: 1px solid #ccc;
        cursor: not-allowed;
      }
    }
  }
</style>