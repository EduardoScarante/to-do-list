<script>

export default {
    data(){
        return{
            itemName: '',
        }
    },
    methods: {
        handleCreateList(){
            this.$emit('new-item', this.itemName)
        }
    }
}

</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="h-25 w-25 pa-4">
            <v-card-title>Nome da Tarefa</v-card-title>
            <v-text-field v-model="itemName"></v-text-field>
            <v-btn @click="handleCreateList">Criar</v-btn>
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