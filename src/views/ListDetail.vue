<script>
import { listApiMixin } from "@/api/todolists";
import { toDoItemsApiMixin } from "@/api/todoitems";
import { dateFormater } from "@/mixin/dateFormater";

import modalDetail from "@/components/modal/detail-item.vue";
import ModalNewList from "@/components/modal/new-item.vue";
import Loading from "@/components/Loading.vue";
import confirmDelete from "@/components/modal/alertDelete.vue";

export default {
  components: {
    modalDetail,
    ModalNewList,
    Loading,
    confirmDelete,
  },
  mixins: [listApiMixin, toDoItemsApiMixin, dateFormater],
  data() {
    return {
      items: "",
      itemDetailInfos: {},
      showModalDetail: false,
      showNewItemForm: false,

      loading: false,
      snackbar: false,

      selected: [],
      seeAllTasks: "",
      showModalDelete: false,
      titleModalDelete: "",
    };
  },
  async mounted() {
    this.loading = true;
    this.getItems();
  },
  methods: {
    async getItems() {
      const id = this.$route.params.id;
      try {
        const { data } = await this.detailList(id);
        this.items = data.items;
        this.loading = false;
      } catch {
        alert("Deu erro... D:");
        this.loading = false;
      }
    },

    handleResolveItem() {
      this.handleWithResponse(
        Promise.all(this.selected.map((el) => this.ResolveItem(el)))
      );
      this.selected = [];
    },

    async handleShowDetail(id) {
      const res = await this.handleWithResponse(this.DetailItem(id));
      this.itemDetailInfos = res.data;
      this.showModalDetail = true;
    },
    handledOpenDeleteModal(id, title) {
      this.titleModalDelete = [id, title];
      this.showModalDelete = true;
    },

    handleDeleleItem(id) {
      this.showModalDelete = false
      this.handleWithResponse(this.deleteItem(id));

    },

    newItem(title, deadline) {
      const id = this.$route.params.id;
      this.handleWithResponse(this.createItem(id, title, deadline));
      this.showNewItemForm = false;
    },

    /* FUNÇÂO QUE TRATA RETORNO DA API, RECEBE UMA PROMISSE E CONFORME RESULTADO EXECUTA AÇÂO */
    async handleWithResponse(promise) {
      try {
        this.loading = true;
        return await promise;
      } catch {
        alert("Deu erro");
      } finally {
        this.getItems();
        this.loading = false;
      }
    },

    /* METODO DE ESTILIZAÇÂO */
    bgColor(a) {
      return a == true ? "bg-light-green-lighten-2" : "bg-red-lighten-3";
    },

    /* ORGANIZAR A LISTA CONFORME DEADLINE */
    organizeDeadlineDate(state) {
      if (!this.items) return "";
      const ordened = this.items.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      const undone = ordened.filter((elemento) => elemento.done == false);
      const done = ordened.filter((elemento) => elemento.done == true);

      if (state) return undone.concat(done);
      if (undone.length == 0) this.snackbar = true;
      return undone;
    },
  },
};
</script>

<template>
  <div class="w-100 bg-white d-flex justify-space-between">

    <v-btn color=black @click="this.$router.go(-1)" variant="plain"> TO DO LIST </v-btn>
    <v-btn color=black @click="showNewItemForm = true" variant="plain"> NEW ITEM </v-btn>
    <div class="d-flex flex-row justify-center align-center">
      <h5>SEE ALL TASKS:</h5>
      <v-checkbox v-model="seeAllTasks" class="d-flex" />
    </div>
  </div>


  <v-snackbar v-model="snackbar" color="green">
    Não há tarefas abertas!
    <template v-slot:actions>
      <v-btn color="white" variant="tonal" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>



  <div v-for="item in organizeDeadlineDate(seeAllTasks)">
    <v-row class="d-flex align-center ma-2 elevation-2 w-75 mx-auto" :class="bgColor(item.done)">
      <v-col cols="3" :color="bgColor(item.done)">{{
        formatDate(item.deadline)
      }}</v-col>
      <v-col cols="6">{{ item.title }}</v-col>
      <v-col cols="1">
        <v-checkbox class="d-flex" v-model="selected" :value="item.id" v-if="!item.done">
        </v-checkbox>
      </v-col>
      <v-col cols="1">
        <v-btn @click="handleShowDetail(item.id)">
          <span class="material-symbols-outlined"> info </span>
        </v-btn>
      </v-col>
      <v-col cols="1"><v-btn @click="handledOpenDeleteModal(item.id, item.title)">
          <span class="material-symbols-outlined"> delete </span>
        </v-btn>
      </v-col>
    </v-row>
  </div>

  <div class="d-flex justify-center" @click="handleResolveItem">
    <v-btn :disabled="selected.length == 0" color="black" class="ma-2">
      SALVAR
    </v-btn>
  </div>

  <!-- MODAL DE NOVO ITEM NA LISTA -->
  <ModalNewList v-if="showNewItemForm" @new-item="newItem" @close-modal="this.showNewItemForm = false"></ModalNewList>

  <!-- MODAL DE DETALHE DO ITEM -->
  <modalDetail v-if="showModalDetail" :infos="itemDetailInfos" @closeModal="this.showModalDetail = false"></modalDetail>

  <!-- MODAL DE LOADING -->
  <Loading v-if="loading"></Loading>

  <!-- MODAL DE ALERTA PARA DELEÇÃO -->
  <confirmDelete v-if="showModalDelete" :title="titleModalDelete" @closed-modal="this.showModalDelete = false"
    @confirm-modal="handleDeleleItem">
  </confirmDelete>
</template>

<style>
.c-pointer {
  cursor: pointer;
}
</style>
