<script>

import imgLogin from '@/assets/imgs/login-img.jpg'

export default {
  data: () => ({
    email: '',
    password: '',
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
        if (value?.split('').length <= 7) return 'Must contain at least 8 characters'
        if (!value) return 'You have to write something.'
        return true
      }
    ],
  }
  ),
  methods: {
    handleSubmit() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$router.push("app")
      }, 2000)
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
      
      <button @click="forgotPass" class="d-flex justify-center mt-5 pb-5 text-orange-darken-4 font-weight-medium">Forgot your password?!</button>
      
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