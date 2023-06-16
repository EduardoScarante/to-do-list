<script>

export default {
  data: () => ({
    email: '',
    password: '',
    isInvalidInfos: '',
    loading: false,

    emailRules: [
      value => {
        if (!value) return 'write something'
        if ((!value.includes("@")) || (!value.includes(".com"))) return 'Invalid email type'
        return true
      }
    ],
    passwordRules: [
      value => {
        if (!value) return 'You have to write something.'
        return true
      }
    ],
  }
  ),
  methods:{
    handleSubmit(){
      this.loading = true
            setTimeout( () => {
                this.loading = false
                this.$router.push("app")
            }, 2000)
    }
  }
}
</script>

<template>

    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="handleSubmit" v-model="isInvalidInfos">
        <v-text-field v-model="email" :rules="emailRules" label="Type your Email"></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" label="Now, your password" type="password"></v-text-field>
        <v-btn variant="tonal" type="submit" size="large" block class="mt-2" :loading="loading"  :disabled="!isInvalidInfos">Login</v-btn>
        
      </v-form>
    </v-sheet>
</template>

