<template>
  <div class="container">
    <span for="" class="form-label">Endereço de e-mail</span>
    <input type="text" class="form-input" v-model="fields.email" placeholder="exemplo@exemplo.com">
    <div class="type-person">
      <div>
        <input type="radio" name="radio" v-model="fields.typePerson" value="CPF">
        <span class="radio-person" for="cpf">Pessoa física</span>
      </div>

      <div>
        <input type="radio" name="radio" v-model="fields.typePerson" value="CNPJ">
        <span class="radio-person" for="cnpj">Pessoa jurídica</span>
      </div>

    </div>
    <button type="button" class="btn-continue" @click="nextStep" :disabled="isDisabled">Continue</button>
  </div>
</template>

<script setup>
  import { defineEmits, ref, watch, onMounted } from "vue";
  import validation from '../utils/validation';

  const isDisabled = ref(true);

  const emit = defineEmits();

  const fields = ref({
    email: null,
    typePerson: null,
  });

  const paramsFromEmail = ref({
    fields: fields.value,
    step: 2,
  });

  const nextStep = () => {
    emit('paramsFromEmail', paramsFromEmail.value)
  };

  onMounted(() => {
    const savedEmailFields = sessionStorage.getItem("email");

    if(savedEmailFields) {
      try {
        const fieldsParse = JSON.parse(savedEmailFields);
        if (fieldsParse?.fields && Object.keys(fieldsParse.fields).length > 0) {
          fields.value.email = fieldsParse.fields.email;
          fields.value.typePerson = fieldsParse.fields.typePerson;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  });
  
  watch(fields, (newValue) => {
    if(newValue.email && newValue.typePerson) isDisabled.value = false;
    else if( !newValue.email || !newValue.typePerson) isDisabled.value = true;
    sessionStorage.setItem('email', JSON.stringify(newValue));
  }, { deep: true });


</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  
    .form-label {
      font-size: 14px;
      margin-bottom: 3px;
    }

    .form-input { 
      border-radius: 4px;
      padding: 5px 10px;
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

    .type-person {
      display: flex;
      margin-top: 10px;
      gap: 10px;
    }
  }
</style>