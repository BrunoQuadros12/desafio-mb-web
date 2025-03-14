export default {
  isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+.$/;
    return regex.test(email);
  },

  isNameValid(name) {
    const regex = /^(?! )[A-Za-zÁ-Úá-úÀ-Ùà-ùÇç ]{4,}$/;
    return regex.test(name);
  }, 

  isDateValid(date) {
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(date);
  },

  isPhoneValid(phone) {
    const regex = /^(\d{2}) (9\d{4}|\d{4})-\d{4}$/;
    return regex.test(phone);
  },

  isCpfValid(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  },

  isCnpjValid(cnpj) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regex.test(cnpj)
  },

  isValidPassword(password) {
    const regex = /^\S{5,}$/;
    return regex.test(password);
  },

}