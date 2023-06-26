<script>

import { listApiMixin } from "@/api/todolists";
import { toDoItemsApiMixin } from "@/api/todoitems";
import modalDetail from "@/components/modal-detail-item.vue"
import ModalNewList from '@/components/modal-new-item.vue'

export default {
    components: {
        modalDetail,
        ModalNewList
    },
    mixins: [listApiMixin, toDoItemsApiMixin],
    data() {
        return {
            items: '',
            itemDetailInfos: {},
            showModalDetail: false,
            showNewItemForm: false,
        }
    },
    async mounted() {
        this.getItems()
    },
    methods: {
        async getItems() {
            const id = this.$route.params.id
            try {
                const { data } = await this.detailList(id)
                this.items = data.items;
            } catch {
                alert("Deu erro... D:")
            }
        },

        async handleResolveItem(id) {
            const { status } = await this.ResolveItem(id)
            this.handleWithError(status)
        },
        async handleShowDetail(id) {
            const { status, data } = await this.DetailItem(id)
            console.log(data);
            this.handleWithError(status)
            this.itemDetailInfos = data
            this.showModalDetail = true
        },
        async handleDeleleItem(id) {
            const { status } = await this.deleteItem(id)
            this.handleWithError(status)
        },

        async newItem(title) {
            const id = this.$route.params.id
            const { status } = await this.createItem(title, id)
            this.handleWithError(status)
            this.showNewItemForm = false
            this.getItems()
        },

        /* FUNÇÂO QUE TRATA RETORNO DA API */
        handleWithError(status) {
            if (status >= 200 && status < 300) {
                this.getItems()
                alert("Deu boa!")
            } else {
                alert("Deu erro")
            }
        },

        /* METODO DE ESTILIZAÇÂO */
        btnColor(a) {
            console.log(a);
            return a == true ? 'success' : 'error'
        },
    }
}

</script>

<template>
    <v-card>
        <v-card class="w-100 d-flex justify-center pa-4">
            <v-btn @click="showNewItemForm = true">
                CRIAR NOVO ITEM
            </v-btn>
        </v-card>

        <v-card v-for="item in items">
            <v-card class="d-flex align-center ma-2 elevation-2">
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-text>{{ item.done }}</v-card-text>
                <v-card-actions>
                    <v-btn @click="handleResolveItem(item.id)">MARCAR COMO RESOLVIDO</v-btn>
                    <v-btn @click="handleShowDetail(item.id)">VER DETALHES</v-btn>
                    <v-btn @click="handleDeleleItem(item.id)">APAGAR</v-btn>
                </v-card-actions>
            </v-card>

        </v-card>
    </v-card>

    <ModalNewList v-if="showNewItemForm" @new-item="newItem"></ModalNewList>

    <modalDetail v-if="showModalDetail" :infos="itemDetailInfos" @click="showModalDetail = false"></modalDetail>
</template>