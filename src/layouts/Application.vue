<script>

export default {
  methods: {
    logOut() {
      localStorage.removeItem("access_token")
      location.replace("/");
      //this.$router.push('/')
    }
  }
}

</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>To Do List</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn>
        <div @click="logOut">Log Out</div>
      </v-btn>
    </v-app-bar>

    <br><br>

    <router-view />
  </v-app>
</template>
