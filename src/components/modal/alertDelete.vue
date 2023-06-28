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
  <div class="modal">
    <div class="confirm">
      <p>Deseja excluir o item: {{ title[1] }}?</p>
      <div>
        <v-btn @click="confirm"> CONFIRMAR </v-btn>
        <v-btn @click="closed"> CANCELAR </v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100px;
  width: 400px;
  background-color: white;
}
</style>
