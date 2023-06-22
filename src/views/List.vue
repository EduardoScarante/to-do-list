<script>

import { listApiMixin } from "@/api/todolists.js"

export default {
    data(){
        return{
            data: ''
        }
    },
    mixins: [listApiMixin],
    methods: {
        async getList() {
            try {
                const { data } = await this.list()
                this.data = data
            } catch {
                alert("Algo deu errado")
            }
        }
    },
    mounted(){
        this.getList()
    }
}

</script>

<template>
    <br>
    List
    {{ data }}
    <br>
</template>
    