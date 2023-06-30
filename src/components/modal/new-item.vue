<script>

export default {
    data(){
        return{
            itemName: '',
            deadLineDate: `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
            deadLineHour: `${new Date().getHours()}:${new Date().getMinutes()}`,     
        }
    },
    methods: {
        handleCreateList(){
            const formatedDate = `${this.deadLineDate}T${this.deadLineHour}:00.000Z`
            this.$emit('new-item', this.itemName, formatedDate)
        },
        closeModal(){
            this.$emit('close')
        }
    },
    
    }

</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-25 pa-4">
            <v-text-field label="Task Name" v-model="itemName"></v-text-field>
            <v-text-field label="What Date?" v-model="deadLineDate" type="date" :value="deadLineDate"></v-text-field>
            <v-text-field label="What Hour?" v-model="deadLineHour" type="time" :value="deadLineHour"></v-text-field>
            <v-action class="d-flex justify-center">
                <v-btn @click="closeModal" class="w-25 mx-2">
                    Close
                </v-btn>
                <v-btn @click="handleCreateList" class="w-25 mx-2">
                    Create
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