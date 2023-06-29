<script>

export default {
    data() {
        return {
            listName: '',

            inputRule:[
                value => {
                    if(!value) return 'white something' 
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
            <v-card-actions>
                <v-btn @click="handleCreateList" class="w-50" variant="flat" color="light-green-lighten-4" :disabled="!listName">
                    Create
                </v-btn>
                <v-btn @click="closeModal" class="w-50" variant="flat" color="deep-orange-lighten-4">
                    Close
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