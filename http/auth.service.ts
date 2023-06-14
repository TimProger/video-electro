import {$api} from "./axios";

class AuthService {

  async confirm_phone(phone: number) {
    $api
      .post<{ code: number }>('/profile/confirm_phone', {
        phone
      })
      .then((res)=>{
        return res
      })
      .catch((e)=>{
        throw e
      })
  }

  async confirm_code(phone: number, code: number) {
    return await $api
      .post('/profile/confirm_code', {
        phone,
        code
      })
      .then((res)=>{
        return res
      })
      .catch((e)=>{
        throw e
      })
  }

  async patchProfile(first_name?: string,
                     last_name?: string,
                     middle_name?: string,
                     email?: string,
                     password?: string) {
    return await $api
      .patch('/profile/', {
        first_name,
        last_name,
        middle_name,
        email,
        password
      })
      .then((res)=>{
        return res
      })
      .catch((e)=>{
        throw e
      })
  }

  async createProfile(code?: number,
                      phone?: number,
                      first_name?: string,
                      last_name?: string,
                      middle_name?: string,
                      email?: string,
                      password?: string) {
    return await $api
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
        return res
      })
      .catch((e)=>{
        throw e
      })
  }

  async getProfile() {
    return await $api
      .get('/profile')
      .then((res)=>{
        return res
      })
      .catch((e)=>{
        throw e
      })
  }
}

export default new AuthService()