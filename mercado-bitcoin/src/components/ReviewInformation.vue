<template>
  <div class="container">
    <div>
      <span for="" class="form-label">Endereço de e-mail</span>
      <input type="text" class="form-input" v-model="fields.email">
      <p v-show="!emailValidation" class="error"> Digite um e-mail válido</p>
    </div>

  
    <template v-if="showTypePersonFields">
      <div>
        <span for="" class="form-label">Nome</span>
        <input type="text" class="form-input" v-model="fields.name">
        <p v-show="!nameValidation" class="error"> Digite um valor com mais de 3 caracteres</p>
      </div>

      <div>
        <span for="" class="form-label">Cpf</span>
        <input type="text" class="form-input" v-model="fields.document" placeholder="xxx.xxx.xxx-xx">
        <p v-show="!cpfValidation" class="error"> Digite um cpf válido</p>
      </div>

      <div>
        <span for="" class="form-label">Data de nascimento</span>
        <input type="text" class="form-input" v-model="fields.date" placeholder="xx/xx/xxxx">
        <p v-show="!dateValidation" class="error"> Digite uma data válida </p>
      </div>

      <div>
        <span for="" class="form-label">Telefone</span>
        <input type="text" class="form-input" v-model="fields.phone" placeholder="xx xxxxx-xxxx">
        <p v-show="!phoneValidation" class="error"> Digite um formato de telefone válido</p>
    </div>

    </template>

    <template v-else>
      <div>
        <span for="" class="form-label">Razão social</span>
        <input type="text" class="form-input" v-model="fields.name">
        <p v-show="!nameValidation" class="error"> Digite um valor com mais de 3 caracteres</p>
      </div>

      <div>
        <span for="" class="form-label">Cnpj</span>
        <input type="text" class="form-input" v-model="fields.document" placeholder="xx.xxx.xxx/xxxx-xx">
        <p v-show="!cnpjValidation" class="error"> Digite um cnpj válido</p>
      </div>

      <div>
        <span for="" class="form-label">Data de abertura</span>
        <input type="text" class="form-input" v-model="fields.date" placeholder="xx/xx/xxxx">
        <p v-show="!dateValidation" class="error"> Digite uma data válida</p>
      </div>

      <div>
        <span for="" class="form-label">Telefone</span>
        <input type="text" class="form-input" v-model="fields.phone" placeholder="xx xxxxx-xxxx">
        <p v-show="!phoneValidation" class="error"> Digite um formato de telefone válido</p>
    </div>

    </template>

    <div>
      <span for="" class="form-label">Senha</span>
      <input type="password" class="form-input" v-model="fields.password" placeholder="Deve conter mais de 4 caracteres">
      <p v-show="!passwordValidation" class="error"> Digite uma senha válida</p>
    </div>

    <div class="btn-container">
      <button type="button" class="btn-back" @click="goBackStep">Voltar</button>
      <button type="button" class="btn-continue" @click="sendInformation" :disabled="isDisabled">
        Confirmar <i class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse" v-if="showLoading"></i>
      </button>
    </div>

    <Alert v-show="returnMessage" :message="returnMessage" :type="messageType" />

  </div>
</template>
  
<script setup>
  import { defineEmits, ref, watch, onMounted } from "vue";
  import Alert from '../components/common/Alert.vue'
  import validation from "../utils/validation";
  
  const isDisabled = ref(true);

  const showTypePersonFields = ref(null);
  const showLoading = ref(false);

  const emailValidation = ref(false);
  const nameValidation = ref(false);
  const dateValidation = ref(false);
  const phoneValidation = ref(false);
  const cpfValidation = ref(false);
  const cnpjValidation = ref(false);
  const passwordValidation = ref(false);
  const document = ref(null);

  const returnMessage = ref(null);
  const messageType = ref(null);

  const emit = defineEmits();

  const fields = ref({
    email: null,
    name: null,
    document: null,
    date: null,
    phone: null,
    password: null,
  });


  onMounted( async() => {
    const savedPersonFields = await sessionStorage.getItem("allInformation");
    const paramsParse = JSON.parse(savedPersonFields);
    document.value = paramsParse.typePerson;
    showTypePersonFields.value = paramsParse.typePerson == 'CPF';

    if(savedPersonFields) {
      try {
        if (Object.keys(paramsParse).length > 0 && paramsParse) {
          fields.value.email = paramsParse.email;
          fields.value.name = paramsParse.typePerson == 'CPF'  ? paramsParse.name : paramsParse.corporateName;
          fields.value.document = paramsParse.typePerson == 'CPF' ? paramsParse.cpf : paramsParse.cnpj;
          fields.value.date = paramsParse.typePerson == 'CPF'  ? paramsParse.birthayDate : paramsParse.establishmentDate;
          fields.value.phone = paramsParse.phone;
          fields.value.password = paramsParse.password;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  });

  const paramsFromReview = ref({
    fields: fields.value,
  });

  const goBackStep = () => {
    emit('backStep', {step:3, title:'Senha de acesso'});
  };

  const goBackStepOne = () => {
    emit('backStepOne', {step:1, title:'Seja bem-vindo(a)'});
  };

  const sendInformation = async () => {
    showLoading.value = true;
    try {
      const response = await fetch('http://localhost:3220/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...fields.value
        })
      });

      const { message } = await response.json();
      showLoading.value = false;
      returnMessage.value = message;
      messageType.value = 'success';
      clearFields();
    } catch (error) {
      showLoading.value = false;
      returnMessage.value = "Erro ao enviar Dados";
      messageType.value = 'error';
    }
  };

  const clearFields = () => {
    setTimeout(() => {
      sessionStorage.clear();
      goBackStepOne();
    }, 1500);
  };

  watch(fields, (newValue) => {
    const validateFields = {
      email: validation.isEmailValid,
      name: validation.isNameValid,
      document: !showTypePersonFields.value ? validation.isCnpjValid: validation.isCpfValid,
      date: validation.isDateValid,
      phone: validation.isPhoneValid,
      password: validation.isValidPassword,
    };

    const allFieldsFilled = Object.keys(validateFields).every((field) => newValue[field]);

    emailValidation.value = validateFields.email(newValue.email);
    nameValidation.value = validateFields.name(newValue.name);
    dateValidation.value = validateFields.date(newValue.date);
    cnpjValidation.value = validateFields.document(newValue.document);   
    cpfValidation.value = validateFields.document(newValue.document);
    
    phoneValidation.value = validateFields.phone(newValue.phone);
    passwordValidation.value = validateFields.password(newValue.password);

    const validationEveryField = {
      emailValidation: validateFields.email(newValue.email),
      nameValidation: validateFields.name(newValue.name),
      dateValidation: validateFields.date(newValue.date),
      documentValidation: validateFields.document(newValue.document),
      phoneValidation: validateFields.phone(newValue.phone),
      passwordValidation: validateFields.password(newValue.password),
    };

    const validationReponse = Object.keys(validationEveryField).every((fieldValidation) => validationEveryField[fieldValidation]);
    
    isDisabled.value = !(allFieldsFilled && validationReponse)

  }, { deep: true });
  
  watch(showTypePersonFields, (newValue) => showTypePersonFields.value = newValue);
  
</script>
  
<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: auto;

    div {
      margin-bottom: 10px;
    }

    .error {
      color: red;
      font-size: 13px;
      padding: 0;
      margin: 0;
    }
  
    .form-label {
      display: block;
      font-size: 14px;
      margin-bottom: 3px;
    }

    .form-input { 
      border-radius: 4px;
      padding: 5px 10px;
      width: 92%;
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