<script>

import { listApiMixin } from "@/api/todolists";
import ModalNewList from '@/components/modal-new-list.vue'

export default {
  components: {
    ModalNewList,
  },

  mixins: [listApiMixin],

  data() {
    return {
      lists: '',
      items: '',
      titleDialog: '',
      openDialog: false,
      openNewList: false,
    }
  },

  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.lists = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },

    async createNewList(title) {
      const { status } = await this.createList(title)
      this.openNewList = false
      this.handleWithError(status)
    },
    async handleDeleteItem(id) {
      const { status } = await this.deleteList(id);
      this.handleWithError(status)

    },
    
    /* FUNÇÂO QUE TRATA RETORNO DA API */
    handleWithError(status){
      if (status >= 200 && status < 300) {
        this.getLists()
        alert("Deu boa!")
      } else {
        alert("Deu erro")
      }
    },

    /* REDIRECIONA PARA TELA DE DETALHE DA LISTA */
    RedirectDetailItem(id) {
      this.$router.push(`/app/${id}`)
    },

  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <div>
    <nav class="w-100 bg-blue d-flex justify-center">
      <v-btn @click="openNewList = true" variant="plain">
        CRIAR LISTA
      </v-btn>
    </nav>

    <v-card v-for="list in lists">
      <v-card-title> {{ list.title }} </v-card-title>
      <v-card-subtitle> {{ list.id }} </v-card-subtitle>
      <v-card-actions>
        <v-btn color="blue" @click="RedirectDetailItem(list.id)">
          DETALHE
        </v-btn>
        <v-btn color="blue">
          EDITAR
        </v-btn>
        <v-btn color="blue" @click="handleDeleteItem(list.id)">
          DELETAR
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- CRIAR NOVA LISTA -->
    <ModalNewList @new-list="createNewList" v-if="openNewList"></ModalNewList>

  </div>
</template>

<style></style>