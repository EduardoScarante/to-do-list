<script>

export default {
    props: {
        summaryInfos: Array,
        userInfo: Array,
    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
    },
    computed: {
        formatInfo() {
            const counterDoneTasks = this.summaryInfos.filter(el => el.done == true).length
            const AllTasks = this.summaryInfos.length
            return [counterDoneTasks, AllTasks]
        }
    }
}

</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="pa-4 w-50">

            <v-card class="elevation-0">
                <v-card-title>Hello {{userInfo.username}} !</v-card-title>
                <v-card-subtitle><i>{{ userInfo.email }}</i></v-card-subtitle>
                <v-card-subtitle><i>{{ userInfo.id }}</i></v-card-subtitle>
                <v-card-text><b>here is a summary of your activities:</b></v-card-text>
            </v-card>
            
            <v-divider></v-divider>

            <div>
                <p class="ma-4 d-flex">
                    <span class="material-symbols-outlined text-orange mr-4">
                        info
                    </span>
                    Total tasks: {{ formatInfo[1] }}
                </p>
                <p class="ma-4 d-flex">
                    <span class="material-symbols-outlined text-green mr-4">
                        done
                    </span>
                    Total completed tasks: {{ formatInfo[0] }}</p>

                <p class="ma-4 d-flex">
                    <span class="material-symbols-outlined text-red mr-4">
                        warning
                    </span>
                    Total open tasks: {{ formatInfo[1] - formatInfo[0] }}
                </p>
            </div>

            <v-card-actions>
                <v-btn class="elevation-2 mx-auto" @click="closeModal">
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