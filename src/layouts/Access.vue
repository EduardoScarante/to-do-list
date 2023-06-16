<script>
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"

export default {
  components: {
    Login,
    Register
  },
  data: () => ({
    tab: null,
  }),
}
</script>

<template>
  <v-app>
    <v-card width="400" class="ma-auto bg-white elevation-10 ">
      <v-tabs v-model="tab">
        <v-tab value="one" class="w-50">Login</v-tab>
        <v-tab value="two" class="w-50">Register</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab" class="py-6">
          <v-window-item value="one">
            <login />
          </v-window-item>

          <v-window-item value="two">
            <Register />
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>

    <router-view />
  </v-app>
</template>
