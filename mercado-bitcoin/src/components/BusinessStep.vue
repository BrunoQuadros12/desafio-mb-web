<template>
  <div class="container">
    <div>
      <span for="" class="form-label">Razão social</span>
      <input type="text" class="form-input" v-model="fields.corporateName">
    </div>

    <div>
      <span for="" class="form-label">Cnpj</span>
      <input type="text" class="form-input" v-model="fields.cnpj" placeholder="xx.xxx.xxx/xxxx-xx">
    </div>

    <div>
      <span for="" class="form-label">Data de abertura</span>
      <input type="text" class="form-input" v-model="fields.establishmentDate" placeholder="xx/xx/xxxx">
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
    corporateName: null,
    cnpj: null,
    establishmentDate: null,
    phone: null
  });

  onMounted(() => {
    const savedBusinessFields = sessionStorage.getItem("business");

    if(savedBusinessFields) {
      try {
        const fieldsParse = JSON.parse(savedBusinessFields);
        if (Object.keys(fieldsParse.fields).length > 0 && fieldsParse?.fields) {
          fields.value.corporateName = fieldsParse.fields.corporateName;
          fields.value.cnpj = fieldsParse.fields.cnpj;
          fields.value.establishmentDate = fieldsParse.fields.establishmentDate;
          fields.value.phone = fieldsParse.fields.phone;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  const paramsFromCnpj = ref({
    fields: fields.value,
    step: 3,
    title: 'Senha de acesso'
  });

  watch(fields, (newValue) => {
    if(newValue.corporateName && newValue.cnpj && newValue.establishmentDate && newValue.phone) isDisabled.value = false;
    else if(!newValue.corporateName || !newValue.cnpj || !newValue.establishmentDate || !newValue.phone) isDisabled.value = true;

  }, { deep: true });

  const goBackStep = () => {
    emit('backStep', {step:1, title:'Seja bem vindo(a)'});
  }

  const nextStep = () => {
    emit('paramsFromCnpj', paramsFromCnpj.value);
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