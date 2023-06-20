<script>

export default {
  data: () => ({
    email: '',
    password: '',
    isInvalidInfos: '',
    loading: false,
    showPass: false,

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
  }
}
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="handleSubmit" v-model="isInvalidInfos">
      <v-text-field v-model="email" :rules="emailRules" label="Type your Email"></v-text-field>
      <v-text-field v-model="password" :rules="passwordRules" label="Now, your password"
        :type="showPass ? 'text' : 'password'" :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass = !showPass"></v-text-field>

      <v-btn variant="tonal" type="submit" size="large" block class="mt-2" :loading="loading"
        :disabled="!isInvalidInfos">Login</v-btn>

    </v-form>
  </v-sheet>
</template>

