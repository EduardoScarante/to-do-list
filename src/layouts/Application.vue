<script>
export default {
  methods: {
    goToRegister() {
      console.log("work");
    },
  },
};
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>To Do List</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="goToRegister()">
        <v-icon>mdi-account-multiple-plus </v-icon>
      </v-btn>
    </v-app-bar>

    <router-view />
  </v-app>
</template>
