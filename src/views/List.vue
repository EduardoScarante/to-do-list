<script>

import { listApiMixin } from "@/api/todolists.js"

export default {
    data() {
        return {
            toDoLists: ''
        }
    },
    mixins: [listApiMixin],
    methods: {
        async getList() {
            try {
                const { data } = await this.list()
                this.toDoLists = data
            } catch {
                alert("Algo deu errado")
            }
        }
    },
    mounted() {
        this.getList()
    }
}

</script>

<template>
    <br>
    <v-card v-for="list in toDoLists" class="d-flex align-center ">
        <v-card-title>
            {{ list.title }}
        </v-card-title>
        <v-card-subtitle>
            {{ list.id }}
        </v-card-subtitle>
    </v-card>
    <br>
</template>
    