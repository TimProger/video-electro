import {$api} from "./axios";

class AuthService {

  async confirm_phone(phone: string) {
    return new Promise((resolve, reject) => {
      $api
        .post<{ code: string }>('/profile/confirm_phone', {
          phone
        })
        .then((res)=>{
          resolve(res)
        })
        .catch((error)=>{
          reject(error.response);
        })
    });
  }

  async confirm_code(phone: string, code: string) {
    return new Promise((resolve, reject) => {
      $api
        .post('/profile/confirm_code', {
          phone,
          code
        })
        .then((res)=>{
          resolve(res)
        })
        .catch((error)=>{
          reject(error.response);
        })
    });
  }

  async jwt(phone: string, password: string) {
    return new Promise((resolve, reject) => {
      $api
        .post('/jwt', {
          phone,
          password
        })
        .then((res)=>{
          resolve(res);
        })
        .catch((error)=>{
          reject(error.response);
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
        .catch((error)=>{
          reject(error.response);
        })
    });
  }

  async createProfile(code?: string,
                      phone?: string,
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
        .catch((error)=>{
          reject(error.response);
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
        .catch((error)=>{
          reject(error.response);
        })
    });
  }
}

export default new AuthService()