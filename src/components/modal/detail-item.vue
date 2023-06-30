<script>
import { dateFormater } from '@/mixin/dateFormater'
export default {
    mixins: [dateFormater],
    props: {
        infos: Object,
        listName: Array,
    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
        colorPicker(el) {
            return el === true ? 'bg-green' : 'bg-red'
        }
    }
}
</script>

<template>
    <v-card color="rgba(0, 0, 0, 0.5)" class="modal d-flex align-center justify-center">
        <v-card class="w-75 pa-4">
            <div class='d-flex align-center'>
                <v-card-text :class=colorPicker(infos.done) class="rounded-lg w-25 justify-center d-flex">
                    <b>{{ infos.done
                        == true ? 'done' : 'not done' }}
                    </b>
                </v-card-text>
                <v-card-title class="w-75"> {{ infos.title }}</v-card-title>
            </div>

            <span class="d-flex align-center">
                <h4>Task Id:</h4>
                <v-card class="elevation-0" :text="infos.id" />
            </span>

            <span class="d-flex align-center">
                <h4>List name:</h4>
                <v-card class="elevation-0" :text="listName" />
            </span>

            <span class="d-flex align-center">
                <h4>List Id:</h4>
                <v-card class="elevation-0" :text="infos.listId" />
            </span>

            <span class="d-flex align-center">
                <h4>Author Id:</h4>
                <v-card class="elevation-0" :text="infos.authorId" />
            </span>

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