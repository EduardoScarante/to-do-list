<script>
export default {
  props: {
    title: Array,
  },
  methods: {
    closed (){
        this.$emit("closed-modal")
    },
    confirm (){
        this.$emit("confirm-modal", this.title[0])
    }
  }
};
</script>

<template>
  <div class="modal h-100 w-100 d-flex align-center justify-center">
    <div class="d-flex flex-column align-center justify-space-between w-25 rounded-lg pa-2 bg-white">
      <p>Are you sure you want to delete the item: <b>{{ title[1] }}</b>?</p>
      <div>
        <v-btn @click="closed"> Cancel </v-btn>
        <v-btn @click="confirm"> Confirm </v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.3);
  top: 0;
  right: 0;
}
</style>
