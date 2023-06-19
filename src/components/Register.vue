<script>
export default {
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


        /* RULES */
        usernameRules: [value => {
            if (!value) return 'write something'
            if (value.toLowerCase() !== value) return 'Must be all in lowercase'
            if (value.includes(" ")) return 'Cannot contain spacebar'

            return true
        }],
        emailRules: [value => {
            if (!value) return 'write something'
            if ((!value.includes("@")) || (!value.includes(".com"))) return 'Invalid email type'
            return true
        }],
        passwordRules: [value => {
            let regexSpecialCaractere = /\W|_/;
            let regexNumber = /(\d+)| /g

            if (value?.split('').length <= 7) return 'Must contain at least 8 characters'
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
        handleSubmit() {
            console.log({
                username: this.username,
                email: this.email,
                password: this.password
            });

            this.loading = true
            setTimeout(() => {
                this.$emit('openModelSucess')
                this.loading = false
                this.$refs.form.reset()
            }, 2000)
        }
    }
}
</script>

<template>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent="handleSubmit" v-model="isInvalidInfos" ref="form">
            <v-text-field v-model="username" :rules="usernameRules" label="Type your Username"></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="Type an Email"></v-text-field>

            <v-text-field v-model="password" :rules="passwordRules" label="Choose a Password"
                :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"></v-text-field>
            <v-text-field v-model="confirmPassword" :rules="[checkPass]" label="Confirm yout password"
                :type="showPassConfirm ? 'text' : 'password'" :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassConfirm = !showPassConfirm" type="password"></v-text-field>

            <v-btn variant="tonal" size="large" type="submit" :loading="loading" block class="mt-2"
                :disabled="!isInvalidInfos">Register</v-btn>
        </v-form>

    </v-sheet>
</template>

