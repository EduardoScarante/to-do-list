<script>

export default {
    props: {
        id: String,
        name: String,
    },
    data() {
        return {
            newNameList: '',
            inputRule: [
                value => {
                    if (!value) return 'white something'
                }
            ]
        }
    },
    methods: {
        handleUpdateListName() {
            this.$emit('new-name-list', this.newNameList, this.id)
        },
        closeModal() {
            this.$emit('close-modal')
        }
    }
}

</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-25 pa-4">
            <v-card-title>New name list</v-card-title>
            <v-text-field :label="name" v-model="newNameList" placeholder="Novo Nome" :rules="inputRule"></v-text-field>
            <v-action class="d-flex justify-center">
                <v-btn @click="closeModal" class="w-25 mx-2">
                    Close
                </v-btn>
                <v-btn @click="handleUpdateListName" class="w-25 mx-2">
                    Update
                </v-btn>
            </v-action>
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