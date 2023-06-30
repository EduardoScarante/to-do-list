<script>
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"

export default {
  components: {
    Login,
    Register
  },
  methods: {
    handleAlertModal() {
      this.showAlertModel = !this.showAlertModel;
      this.tab = "one";
    },
    toogleTab() {
      this.tab == "one" ? this.tab = "two" : this.tab = "one"
    }
  },
  data() {
    return {
      tab: null,
      showAlertModel: false,
    }
  },
}
</script>

<template>
  <v-app class="bg">
    <v-snackbar v-model="showAlertModel" color="green">
      <p class="font-weight-bold">User created successfully</p>
      <p>Log in now!</p>
      <template v-slot:actions>
        <v-btn color="white" @click="handleAlertModal">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!--  -->

    <v-card width="1000" height="auto" class="d-flex align-center ma-auto bg-white elevation-20 rounded-lg">
      <!--       <v-tabs v-model="tab">
        <v-tab value="one" class="w-50">Login</v-tab>
        <v-tab value="two" class="w-50">Register</v-tab>
      </v-tabs> -->

      <v-card-text class="pa-0">
        <v-window v-model="tab">
          <v-window-item value="one">
            <login v-on:changeTag="toogleTab" />
          </v-window-item>

          <v-window-item value="two">
            <Register v-on:changeTag="toogleTab" v-on:openModelSucess="handleAlertModal" />
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>

    <router-view @user-created="handleAlertModal"/>
  </v-app>
</template>

<style scoped>
.bg {
  background: linear-gradient(144deg, rgba(254, 254, 254, 1) 25%, #F6CA9B 100%);
}
</style>
