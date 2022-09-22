import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ILoginFormState } from "../../models";

  // Здесь может быть валидатор username
  export const isUsernameValid = (value: string) => value.length;

  // Здесь может быть валидатор пароля
  export const isPasswordValid = (value: string) => value.length;

  export const isPasswordsIdentical = (password: string, passwordRepeat: string) => password === passwordRepeat;

  export const getPasswordErrorMessage = (form: ILoginFormState) => {
    if (form.register && form.errorPasswordsDiffer) return "Пароли не совпадают";
    if (form.errorPassword) return "Введите пароль";
    return '';
  }

  export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
    if ('status' in error && 'data' in error) {
      const resArray = [];
      const tempData = Object(error.data);
      for (let item in tempData) resArray.push(tempData[item]);
      return resArray.join(', ');
    }
    return '';
  }
