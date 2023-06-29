<script>

import imgLogin from '@/assets/imgs/login-img.jpg'
import { authApiMixin } from '@/api/auth'
import { setupPrivateApi } from '@/api';


export default {
  mixins: [authApiMixin],
  data: () => ({
    email: 'eduardo@mail.com',
    password: '1234',
    isInvalidInfos: '',
    loading: false,
    showPass: false,

    imgLogin,

    emailRules: [
      value => {
        if (!value) return 'write something'

        let regexEmail = /.+@.+\..+/;
        if (!regexEmail.test(value)) return 'Invalid email type'

        return true
      }
    ],
    passwordRules: [
      value => {
        if (value?.split('').length <= 2) return 'Must contain at least 2 characters'
        if (!value) return 'You have to write something.'
        return true
      }
    ],
  }
  ),
  methods: {
    async handleSubmit() {
      const payload = {
        "email": this.email,
        "password": this.password
      }

      try{
        const { data } = await this.login(payload)
        const { access_token } = data
        setupPrivateApi(access_token)
        localStorage.setItem("access_token", access_token)

        this.$router.push("app")
      } catch (err) {
        console.log(err);
        alert("erro")
      }
    },
    changeTab() {
      this.$emit('changeTag')
    },
    forgotPass() {

    }
  }
}
</script>

<template>
  <div class="container d-flex">

    <div class="w-100 d-flex justify-center align-center">
      <img :src="imgLogin" class="h-100" alt="">
    </div>

    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">

      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">Hello Again!</p>


      <v-form @submit.prevent="handleSubmit" v-model="isInvalidInfos">
        <v-text-field variant="underlined" v-model="email" :rules="emailRules" label="Type your Email"></v-text-field>
        <v-text-field variant="underlined" v-model="password" :rules="passwordRules" label="Now, your password"
          :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"></v-text-field>

        <v-btn variant="tonal" type="submit" size="large" block class="mt-2" :loading="loading"
          :disabled="!isInvalidInfos">Login
        </v-btn>
      </v-form>

      <button @click="forgotPass" class="d-flex justify-center mt-5 pb-5 text-orange-darken-4 font-weight-medium">Forgot
        your password?!</button>

      <v-divider></v-divider>

      <button @click="changeTab" class="d-flex justify-center mt-5 text-purple text-grey">Don't have an account?!</button>


    </v-sheet>
  </div>
</template>


<style scoped>
.container {
  height: 600px;
}
</style>