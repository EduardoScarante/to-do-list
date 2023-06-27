<script>

import { listApiMixin } from "@/api/todolists";
import { toDoItemsApiMixin} from "@/api/todoitems"

import ModalNewList from '@/components/modal/new-list.vue'
import EditListTitle from "@/components/modal/edit-name-list.vue";
import Loading from "@/components/Loading.vue";

import Summary from "@/components/Summary.vue";
import { renderSlot } from "vue";

export default {
  components: {
    ModalNewList,
    EditListTitle,
    Loading,
    Summary,
  },

  mixins: [listApiMixin, toDoItemsApiMixin],

  data() {
    return {
      lists: '',
      items: '',
      titleDialog: '',
      openDialog: false,
      openNewList: false,

      showModalEditList: false,
      currenteId: "",
      currentTitle: "",

      loading: false,
      showModalSummary: false,
      summaryInfos: '',
    }
  },

  methods: {
    async getLists() {
      this.loading = true;
      try {
        const { data } = await this.list();
        this.lists = data;
      } catch (err) {
        alert("Algo deu errado");
      } finally {
        this.loading = false;
      }
    },

    async createNewList(title) {
      this.loading = true;

      const { status } = await this.createList(title);
      this.openNewList = false;
      this.handleWithError(status)
    },
    async handleDeleteItem(id) {
      this.loading = true;

      const { status } = await this.deleteList(id);
      this.handleWithError(status)
    },
    

    /* FUNÇÂO PARA EDITAR NOME DA LIST */
    openModalUpdateList(id, title) {
      this.currenteId = id
      this.currentTitle = title

      this.showModalEditList = true
    },
    async handleEditNameList(newName, id) {
      this.loading = true
      const { status } = await this.editNameList(id, newName)
      this.handleWithError(status)
      this.showModalEditList = false
    },

    /* FUNÇÂO QUE TRATA RETORNO DA API */
    handleWithError(status){
      this.loading = false
      if (status >= 200 && status < 300) {
        this.getLists()
      } else {
        alert("Deu erro")
      }
    },

    /* REDIRECIONA PARA TELA DE DETALHE DA LISTA */
    RedirectDetailItem(id) {
      this.$router.push(`/app/${id}`)
    },
/* MONTA INFORMAÇÂO DE COMPONENTE RESUMO */
async HandleSummary(){
      this.loading = true
      const {status, data} = await this.GetAllItens()
      this.summaryInfos = data
      this.handleWithError(status)
      this.showModalSummary = true
  }
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
      <v-btn @click="HandleSummary" variant="plain">
        RESUMO
      </v-btn>
    </nav>

    <!-- COMPONENTE EM POTENCIAL -->
    <v-card v-for="list in lists">
      <v-card-title> {{ list.title }} </v-card-title>
      <v-card-subtitle> {{ list.id }} </v-card-subtitle>
      <v-card-actions>
        <v-btn color="blue" @click="RedirectDetailItem(list.id)">
          DETALHE
        </v-btn>
        <v-btn color="blue" @click="openModalUpdateList(list.id, list.title)">
          EDITAR
        </v-btn>
        <v-btn color="blue" @click="handleDeleteItem(list.id)"> 
          DELETAR 
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- CRIAR NOVA LISTA -->
    <ModalNewList @new-list="createNewList" @close-modal="this.openNewList = false" v-if="openNewList"></ModalNewList>

    <!-- MODAL DE EDITAR LISTA -->
    <EditListTitle
      @new-name-list="handleEditNameList"
      @close-modal="this.showModalEditList = false"
      v-if="showModalEditList"
      :id="this.currenteId"
      :name="this.currentTitle"
    ></EditListTitle>

     <!-- LOADING MODAL -->
     <Loading v-if="loading"></Loading>

     <Summary :summaryInfos="this.summaryInfos" @close-modal="this.showModalSummary = false" v-if="showModalSummary"></Summary>

  </div>
</template>

<style></style>