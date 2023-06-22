<template>
  <router-view />
</template>

<script>
import { setupPrivateApi } from './api';
export default {
  mounted() {
    const token = localStorage.getItem("access_token")
    if(!token){
      this.$router.push("/")
      return
    }
    setupPrivateApi(token)
  },
}

</script>

