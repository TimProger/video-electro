import {$api} from "./axios";

class AuthService {

  async confirm_phone(phone: number) {
    return new Promise((resolve, reject) => {
      $api
        .post<{ code: number }>('/profile/confirm_phone', {
          phone
        })
        .then((res)=>{
          resolve(res)
        })
        .catch(()=>{
          reject('Неверный номер телефона');
        })
    });
  }

  async confirm_code(phone: number, code: number) {
    return new Promise((resolve, reject) => {
      $api
        .post('/profile/confirm_code', {
          phone,
          code
        })
        .then((res)=>{
          resolve(res)
        })
        .catch(()=>{
          reject('Неверные код');
        })
    });
  }

  async jwt(phone: number, password: string) {
    return new Promise((resolve, reject) => {
      $api
        .post('/jwt', {
          phone,
          password
        })
        .then((res)=>{
          resolve(res);
        })
        .catch(()=>{
          reject('Неверные учетные данные');
        })
    });
  }

  async patchProfile(first_name?: string,
                     last_name?: string,
                     middle_name?: string,
                     email?: string,
                     password?: string) {
    return new Promise((resolve, reject) => {
      $api
        .patch('/profile/', {
          first_name,
          last_name,
          middle_name,
          email,
          password
        })
        .then((res)=>{
          resolve(res);
        })
        .catch(()=>{
          reject('Ошибка');
        })
    });
  }

  async createProfile(code?: number,
                      phone?: number,
                      first_name?: string,
                      last_name?: string,
                      middle_name?: string,
                      email?: string,
                      password?: string) {
    return new Promise((resolve, reject) => {
      $api
        .post('/profile/createUser', {
          code,
          phone,
          first_name,
          last_name,
          middle_name,
          email,
          password
        })
        .then((res)=>{
          resolve(res);
        })
        .catch(()=>{
          reject('Ошибка');
        })
    });
  }

  async getProfile() {
    return new Promise((resolve, reject) => {
      $api
        .get('/profile')
        .then((res)=>{
          resolve(res);
        })
        .catch(()=>{
          reject('Ошибка');
        })
    });
  }
}

export default new AuthService()