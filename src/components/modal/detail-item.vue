<script>
export default {
    props: {
        infos: Object
    },
    methods:{
        closeModal(){
            this.$emit("closeModal")
        }
    }
}
</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-75 pa-4">
            <v-card-text> <h3>title:</h3> {{ infos.title }}</v-card-text>
            <v-card-text> <h3>deadline:</h3> {{ infos.deadline }}</v-card-text>
            <v-card-text> <h3>done:</h3> {{ infos.done }}</v-card-text>
            <v-card-text> <h3>listId:</h3> {{ infos.listId }}</v-card-text>
            <v-card-text> <h3>createdAt:</h3> {{ infos.createdAt }}</v-card-text>
            <v-card-text> <h3>updatedAt:</h3> {{ infos.updatedAt }}</v-card-text>
            <v-card-text> <h3>authorId:</h3> {{ infos.authorId }}</v-card-text>
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