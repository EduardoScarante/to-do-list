<script>

export default {
    props: {
        summaryInfos: Array,
    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
    },
    computed: {
        formatInfo() {
            const counterDoneTasks = this.summaryInfos.filter( el => el.done == true).length
            const AllTasks = this.summaryInfos.length
            return [counterDoneTasks, AllTasks]
        }
    }
}

</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-50 pa-4">

            <div>
                <p>Total de tarefas: {{ formatInfo[1] }}</p>
                <p>Total de tarefas concluidas: {{ formatInfo[0] }}</p>
                <p>Total de tarefas em aberto: {{ formatInfo[1] - formatInfo[0]}}</p>
            </div>

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