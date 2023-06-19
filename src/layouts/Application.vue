<script>
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>To Do List</v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn>
        <v-icon>mdi-account-multiple-plus </v-icon>
      </v-btn>
    </v-app-bar>
    
    <br><br>

    <router-view />
  </v-app>
</template>
