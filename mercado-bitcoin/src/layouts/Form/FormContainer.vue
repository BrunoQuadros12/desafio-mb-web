<template>
  <div class="container">
    <ProgressStep :title="title" :step="step" />
    <div class="generic-form">
      <component :is="customComponent" 
        @paramsFromEmail="paramsFromEmail" 
        @paramsFromPerson="paramsFromPerson" 
        @paramsFromPassword="paramsFromPassword"
        @paramsFromCnpj="paramsFromCnpj"
        @backStep="backStep"
        @backStepOne="backStepOne"
        />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import ProgressStep from '../../components/ProgressStep.vue';
  import EmailStep from '../../components/EmailStep.vue';
  import IndividualStep from '../../components/IndividualStep.vue';
  import BusinessStep from '../../components/BusinessStep.vue';
  import PasswordStep from '../../components/PasswordStep.vue';
  import ReviewInformation from '../../components/ReviewInformation.vue';
  
  const customComponent = ref('');
  const step = ref('1');
  const title = ref("Seja bem-vindo(a)");
  const document = ref(null);

  const backStep = (goBackStep) => {
    step.value = goBackStep.step;
    title.value = goBackStep.title;
  };

  const backStepOne = (goBackStepOne) => {
    step.value = goBackStepOne.step;
    title.value = goBackStepOne.title;
  }

  const paramsFromEmail = (data) => {
    step.value = data.step;
    title.value = data.fields.typePerson == 'CPF' ? 'Pessoa física' : 'Pessoa jurídica';
    document.value = title.value;
    sessionStorage.setItem("email", JSON.stringify(data));
  };

  const paramsFromPerson = (data) => {
    step.value = data.step;
    title.value = data.title;
    sessionStorage.setItem("person", JSON.stringify(data));
  };

  const paramsFromCnpj = (data) => {
    step.value = data.step;
    title.value = data.title;
    sessionStorage.setItem("business", JSON.stringify(data));
  }

  const paramsFromPassword = (data) => {
    step.value = data.step;
    title.value = data.title;
    
    sessionStorage.setItem("password", JSON.stringify(data));
    
    const datasStorage = everyDatasFromStorage();
    
    const paramsFinal = {
      ...datasStorage.email,
      ...datasStorage.person,
      ...datasStorage.business,
      ...datasStorage.password
    };

    sessionStorage.setItem("allInformation", JSON.stringify(paramsFinal));
  };

  const everyDatasFromStorage = () => {
    const email = JSON.parse(sessionStorage.getItem("email"));
    const person = JSON.parse(sessionStorage.getItem("person"));
    const password = JSON.parse(sessionStorage.getItem('password'));
    const business = JSON.parse(sessionStorage.getItem('business'));
    
    const allFields = {
      email: {...email.fields},
      person: {...person?.fields},
      business: {...business?.fields},
      password: {...password.fields},
    };

    return allFields;
  };

  onMounted(() => {
    customComponent.value = EmailStep;
  });

  watch(step, (newStep) => {
    document.value = title.value === 'Pessoa física' ? 'CPF' : 'CNPJ';  

    const stepComponentes = {
      "1": EmailStep,
      "2": document.value === 'CPF' ? IndividualStep : BusinessStep,
      "3": PasswordStep,
      "4": ReviewInformation,
    };

    if (stepComponentes[newStep]) {
      customComponent.value = stepComponentes[newStep];
    }
  });

</script>

<style lang="scss" scoped>
</style>