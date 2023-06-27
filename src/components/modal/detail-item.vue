<script>
import { dateFormater } from '@/mixin/dataFormater'
export default {
    mixins: [dateFormater],
    props: {
        infos: Object
    },
    methods:{
        closeModal(){
            this.$emit("closeModal")
        },
        colorPicker(el) {
            console.log(el);
            return el === true ? 'bg-green' : 'bg-red'
        }
    }
}
</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-75 pa-4">
            <div class='d-flex align-center'>
                <v-card-text :class=colorPicker(infos.done) class="rounded-lg"></v-card-text>
                <v-card-title class="w-100"> {{ infos.title }}</v-card-title>
            </div>

            <span class="d-flex align-center">
            <h4>DeadLine:</h4>
            <v-card class="elevation-0" :text="formatDate(infos.deadline)" />
            </span>

            <span class="d-flex align-center">
            <h4>Criado em:</h4>
            <v-card class="elevation-0" :text="formatDateRes(infos.createdAt)" />
            </span>

            <span class="d-flex align-center" v-if="infos.done">
            <h4>Finalizada em:</h4>
            <v-card class="elevation-0" :text="formatDateRes(infos.updatedAt)" />
            </span>

            <v-card-actions>
                <v-btn class="elevation-2 mx-auto" @click="closeModal">
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-card>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
}
</style>