<script>

import imgRegister from '@/assets/imgs/register-img.jpg'
import { authApiMixin } from '@/api/auth'

import Error from '@/components/Error.vue'

export default {
    components:{
        Error
    },
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

        /* ERROR MODAL */
        ErrorModal: false,


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

            this.loading = true
            try {
                console.log("try");
                await this.register(data)
                this.$emit('user-created')
            } 
            catch (err) {
                console.log("catch");
                console.log(err);
                this.ErrorModal = true
                this.loading = false
            }
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

        <div class="h-100 d-flex justify-center align-center">
            <img :src="imgRegister" class="h-100" alt="">
        </div>

        <Error v-if="ErrorModal" @close="ErrorModal = false"></Error>

    </div>
</template>

<style scoped>
.container {
    height: 600px;
}
</style>
