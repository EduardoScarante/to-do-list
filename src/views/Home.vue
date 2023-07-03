<script>

import { createClient } from 'pexels';

import { listApiMixin } from "@/api/todolists";
import { toDoItemsApiMixin } from "@/api/todoitems"

import ModalNewList from '@/components/modal/new-list.vue'
import EditListTitle from "@/components/modal/edit-name-list.vue";
import Loading from "@/components/Loading.vue";

import Summary from "@/components/Summary.vue";
import alertDelete from "@/components/modal/alertDelete.vue";
import HomeList from "@/components/HomeList.vue";

import Error from '@/components/Error.vue';

export default {
  components: {
    ModalNewList,
    EditListTitle,
    Loading,
    Summary,
    alertDelete,
    HomeList,
    Error,
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

      modalDeleteInfos: [],
      showModalDelete: false,

      imgArray: [],

      ErrorModal: false,
      errorMessage: '',

    }
  },

  methods: {
    logOut() {
      localStorage.removeItem("access_token")
      location.replace("/");
    },
    
    redirectToGitHub(){
      window.open('https://github.com/EduardoScarante/to-do-list', '_blank')
    },

    async getLists() {
      this.loading = true
      try {
        const { data } = await this.list();
        const res = await this.GetAllItens()
        this.lists = data;
        this.summaryInfos = res.data
      } catch (err) {
        this.ErrorModal = false
        this.errorMessage = err.response.data.message
      } finally {
        await this.pexels()
        this.loading = false
      }
    },

    HandleSummary() {
      this.showModalSummary = true
    },

    createNewList(title) {
      this.handleWithResponse(this.createList(title))
      this.openNewList = false
    },


    openModalDeleteItem(id, title) {
      this.modalDeleteInfos = [id, title]
      this.showModalDelete = true
    },

    async handleDeleteItem(id) {
      this.showModalDeleteInfos = false
      this.handleWithResponse(this.deleteList(id))
    },

    openModalUpdateList(id, title) {
      this.currenteId = id
      this.currentTitle = title
      this.showModalEditList = true
    },

    handleEditNameList(newName, id) {
      this.handleWithResponse(this.editNameList(id, newName))
      this.showModalEditList = false
    },

    RedirectDetailItem(id) {
      this.$router.push(`/${id}`)
    },

    /* FUNÇÂO QUE TRATA RETORNO DA API */
    async handleWithResponse(promise) {
      try {
        this.loading = true
        return await promise
      } catch(err) {
        this.errorMessage = err.response.data.message
        this.ErrorModal = true
      } finally {
        this.getLists()
        this.loading = false
      }
    },

    async pexels() {
      const client = createClient(import.meta.env.VITE_PEXELS);
      const topicList = ['Academia' ,'to-do list', 'Sunshine', 'Sunrise', 'tree', 'office', 'house'];
      const query = topicList[(Math.floor(Math.random()*topicList.length))];
      const { photos } = await client.photos.search({ query, per_page: this.lists.length }).then(photos => photos)
      this.imgArray = photos.map(el => el.src.portrait)
    }

  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <div>
    <div class="w-100 bg-white d-flex justify-space-between">

      <v-btn color=black @click="redirectToGitHub()" variant="plain"> TO DO LIST </v-btn>
      <v-btn color=black @click="HandleSummary" variant="plain"> RESUME </v-btn>
      <v-btn color=black @click="logOut" variant="plain"> LOG OUT </v-btn>

    </div>

    <!-- COMPONENTE QUE LISTA AS LISTAS -->
    <div class="d-flex mx-auto justify-space-around w-75 flex-wrap">
      <div v-for="list, index in lists">
        <HomeList :imgPexel="this.imgArray[index]" :summaryInfos="this.summaryInfos" :list=list
          @redict-to-detail="RedirectDetailItem" @modal-update-list="openModalUpdateList"
          @modal-delete-item="openModalDeleteItem"></HomeList>
      </div>
    </div>

    <!-- NEW LIST BTN -->
    <v-card class="w-100 stick_btn d-flex justify-center elevation-0" color="transparent">
      <v-btn color="rgb(200, 200, 200, 0.7)" class="ma-2 rounded-md" @click="openNewList = true" variant="flat">
        NOVA LISTA
      </v-btn>
    </v-card>

    <!-- NEW LIST MODAL -->
    <ModalNewList @new-list="createNewList" @close="this.openNewList = false" v-if="openNewList"></ModalNewList>

    <!-- UPDATE LIST MODAL -->
    <EditListTitle @new-name-list="handleEditNameList" @close-modal="this.showModalEditList = false"
      v-if="showModalEditList" :id="this.currenteId" :name="this.currentTitle"></EditListTitle>

    <!-- LOADING MODAL -->
    <Loading v-if="loading"></Loading>

    <Summary :summaryInfos="this.summaryInfos" @close-modal="this.showModalSummary = false" v-if="showModalSummary">
    </Summary>

    <!-- DELETE MODAL -->
    <alertDelete :title="modalDeleteInfos" v-if="showModalDelete" @closed-modal="this.showModalDelete = false"
      @confirm-modal="handleDeleteItem"></alertDelete>

      <Error v-if="ErrorModal" :error="errorMessage" @close="ErrorModal = false"></Error>
  </div>
</template>

<style>
.stick_btn {
  position: sticky;
  bottom: 0;
}
</style>