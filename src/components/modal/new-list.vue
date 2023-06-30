<script>

export default {
    data() {
        return {
            listName: '',

            inputRule: [
                value => {
                    if (!value) return 'white something'
                }
            ]
        }
    },
    methods: {
        handleCreateList() {
            this.$emit('new-list', this.listName)
        },
        closeModal() {
            this.$emit('close')
        }
    },

}

</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-25 pa-4">
            <v-text-field label="name of new list" v-model="listName" :rules="inputRule"></v-text-field>
            <v-actions class="mx-auto d-flex justify-center">
                <v-btn @click="closeModal" class="w-25 mx-2">
                    Close
                </v-btn>
                <v-btn @click="handleCreateList" :disabled="!listName" class="w-25 mx-2">
                    Create
                </v-btn>

            </v-actions>
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