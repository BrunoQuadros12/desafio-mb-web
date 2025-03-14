<template>
  <div class="container">
    <div>
      <span for="" class="form-label">Nome</span>
      <input type="text" class="form-input" v-model="fields.name">
    </div>

    <div>
      <span for="" class="form-label">Cpf</span>
      <input type="text" class="form-input" v-model="fields.cpf" placeholder="xxx.xxx.xxx-xx">
    </div>

    <div>
      <span for="" class="form-label">Data de nascimento</span>
      <input type="text" class="form-input" v-model="fields.birthayDate" placeholder="xx/xx/xxxx">
    </div>

    <div>
      <span for="" class="form-label">Telefone</span>
      <input type="text" class="form-input" v-model="fields.phone" placeholder="xx xxxxx-xxxx">
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
    name: null,
    cpf: null,
    birthayDate: null,
    phone: null
  });

  onMounted(() => {
    const savedPersonFields = sessionStorage.getItem("person");

    if(savedPersonFields) {
      try {
        const fieldsParse = JSON.parse(savedPersonFields);
        if (Object.keys(fieldsParse.fields).length > 0 && fieldsParse?.fields) {
          fields.value.name = fieldsParse.fields.name;
          fields.value.cpf = fieldsParse.fields.cpf;
          fields.value.birthayDate = fieldsParse.fields.birthayDate;
          fields.value.phone = fieldsParse.fields.phone;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  const paramsFromCpf = ref({
    fields: fields.value,
    step: 3,
    title: 'Senha de acesso'
  });

  watch(fields, (newValue) => {
    if(newValue.name && newValue.cpf && newValue.birthayDate && newValue.phone) isDisabled.value = false;
    else if(!newValue.name || !newValue.cpf || !newValue.birthayDate || !newValue.phone) isDisabled.value = true;

  }, { deep: true });

  const goBackStep = () => {
    emit('backStep', {step:1, title:'Seja bem vindo(a)'});
  }

  const nextStep = () => {
    emit('paramsFromPerson', paramsFromCpf.value);
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