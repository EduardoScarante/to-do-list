<script>

import { listApiMixin } from "@/api/todolists";
import { toDoItemsApiMixin } from "@/api/todoitems";
import { dateFormater } from '@/mixin/dateFormater'

import modalDetail from "@/components/modal/detail-item.vue"
import ModalNewList from '@/components/modal/new-item.vue'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        modalDetail,
        ModalNewList,
        Loading,
    },
    mixins: [listApiMixin, toDoItemsApiMixin, dateFormater],

    data() {
        return {
            items: '',
            itemDetailInfos: {},
            showModalDetail: false,
            showNewItemForm: false,
           
            loading: false,
        }
    },
    async mounted() {
        this.loading = true
        this.getItems()
    },
    methods: {
        async getItems() {
            const id = this.$route.params.id
            try {
                const { data } = await this.detailList(id)
                this.items = data.items;
                this.loading = false
            } catch {
                alert("Deu erro... D:")
            }
        },

        async handleResolveItem(id) {
            this.loading = true
            const { status } = await this.ResolveItem(id)
            this.handleWithError(status)
        },
        
        async handleShowDetail(id) {
            this.loading = true
            const { status, data } = await this.DetailItem(id)
            this.handleWithError(status)
            this.itemDetailInfos = data
            this.showModalDetail = true
        },
        async handleDeleleItem(id) {
            this.loading = true
            const { status } = await this.deleteItem(id)
            this.handleWithError(status)
        },

        async newItem(title, deadline) {
            this.loading = true
            const id = this.$route.params.id
            const { status } = await this.createItem(id, title, deadline)
            this.handleWithError(status)
            this.showNewItemForm = false
            this.getItems()
        },

        /* FUNÇÂO QUE TRATA RETORNO DA API */
        handleWithError(status) {
            if (status >= 200 && status < 300) {
                this.getItems()
            } else {
                alert("Deu erro")
            }
            this.loading = false
        },

        /* METODO DE ESTILIZAÇÂO */
        btnColor(a) {
            return a == true ? 'rgb(144, 238, 144)' : 'rgb(240, 128, 128)'
        },
       
        },

    computed: {
        organizeDeadlineDate() {
            if (!this.items) return ''
            const ordened = this.items.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            return ordened.filter(elemento => elemento.done == false).concat(ordened.filter(elemento => elemento.done == true))
      }
    }
}

</script>

<template>
     <span @click="this.$router.go(-1)" class="c-pointer pa-4 material-symbols-outlined">
        arrow_back_ios_new
    </span>

    <v-card>
        <v-card class="w-100 d-flex justify-center pa-4">
            <v-btn @click="showNewItemForm = true">
                CRIAR NOVO ITEM
            </v-btn>
        </v-card>

       <v-card v-for="item in organizeDeadlineDate">
            <v-card class="d-flex align-center ma-2 elevation-2" :color="btnColor(item.done)">
                <v-card :title=formatDate(item.deadline) :color="btnColor(item.done)"></v-card>
                <v-card-title class="w-25">{{ item.title }}</v-card-title>
                <v-card-text class="text-white">.</v-card-text>
                <v-card-actions>
                    <v-btn @click="handleResolveItem(item.id)" v-show="!item.done">MARCAR COMO RESOLVIDO</v-btn>
                    <v-btn @click="handleShowDetail(item.id)">VER DETALHES</v-btn>
                    <v-btn @click="handleDeleleItem(item.id)">APAGAR</v-btn>
                </v-card-actions>
            </v-card>

        </v-card>
    </v-card>

    <!-- MODAL DE NOVO ITEM NA LISTA -->
    <ModalNewList v-if="showNewItemForm" @new-item="newItem" @close-modal="this.showNewItemForm=false"></ModalNewList>

    <!-- MODAL DE DETALHE DO ITEM -->
    <modalDetail v-if="showModalDetail" :infos="itemDetailInfos" @closeModal="this.showModalDetail = false"></modalDetail>
   
    <!-- MODAL DE LOADING -->
    <Loading v-if="loading"></Loading>

</template>

<style>
.c-pointer {
    cursor: pointer;
}
</style>