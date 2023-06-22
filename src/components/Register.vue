<script>

import imgRegister from '@/assets/imgs/register-img.jpg'
import { authApiMixin } from '@/api/auth'

export default {
    mixins: [authApiMixin],
    data: () => ({
        /* VARIAVEIS */
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isInvalidInfos: '',

        showPass: false,
        showPassConfirm: false,

        /* LOADING */
        loading: false,

        /* IMG IMPORT */
        imgRegister,


        /* RULES */
        usernameRules: [value => {
            if (!value) return 'write something'
            if (value.toLowerCase() !== value) return 'Must be all in lowercase'
            if (value.includes(" ")) return 'Cannot contain spacebar'

            return true
        }],
        emailRules: [value => {
            let regexEmail = /.+@.+\..+/;
            if (!regexEmail.test(value)) return 'Invalid email type'

            if (!value) return 'write something'

            return true
        }],
        passwordRules: [value => {
            let regexSpecialCaractere = /\W|_/;
            let regexNumber = /(\d+)| /g

            if (value?.split('').length <= 7) return 'Must contain at least 8 characters'
            if (value?.includes(' ')) return 'Cannot contain a space bar'
            if (value?.includes('.')) return 'Cannot contain a dot'
            if (!regexSpecialCaractere.test(value)) return 'Must contain a special character'
            if (!regexNumber.test(value)) return 'Must contain a Number'

            return true
        }]
    }
    ),
    methods: {
        checkPass(value) {
            if (!value) return 'Must contain something'
            if (this.password != value) return 'Passwords different'
            return true
        },
        async handleSubmit() {
            const data = {
                username: this.username,
                email: this.email,
                password: this.password
            };

            try {
                await this.register(data)
                alert("Deu boa!")
            } 
            catch (err) {
                const status = err.response.status
                alert(status + err)
            }

            /* this.loading = true
            setTimeout(() => {
                this.$emit('openModelSucess')
                this.loading = false
                this.$refs.form.reset()
            }, 2000) */
        },
        changeTag() {
            this.$emit('changeTag')
        },
    }
}
</script>

<template>
    <div class="container d-flex">

        <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">

            <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">Register</p>

            <v-form @submit.prevent="handleSubmit" v-model="isInvalidInfos" ref="form">
                <v-text-field variant="underlined" v-model="username" :rules="usernameRules"
                    label="Type your Username"></v-text-field>
                <v-text-field variant="underlined" v-model="email" :rules="emailRules" label="Type an Email"></v-text-field>

                <v-text-field variant="underlined" v-model="password" :rules="passwordRules" label="Choose a Password"
                    :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"></v-text-field>
                <v-text-field variant="underlined" v-model="confirmPassword" :rules="[checkPass]"
                    label="Confirm your password" :type="showPassConfirm ? 'text' : 'password'"
                    :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassConfirm = !showPassConfirm" type="password"></v-text-field>

                <v-btn variant="tonal" size="large" type="submit" :loading="loading" block class="mt-2"
                    :disabled="!isInvalidInfos">Register</v-btn>
            </v-form>

            <button class="pt-10 text-grey" @click="changeTag">Already have an account?</button>
        </v-sheet>

        <div class="w-100 d-flex justify-center align-center">
            <img :src="imgRegister" class="h-100" alt="">
        </div>

    </div>
</template>

<style scoped>
.container {
    height: 600px;
}
</style>
