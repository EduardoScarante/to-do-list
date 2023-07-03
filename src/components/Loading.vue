<script>
import loading from "@/assets/lotties/loading.json";

export default {
    data() {
        return {
            loading,
        };
    },
};
</script>

<template>
    <v-card class="loading d-flex align-center justify-center bg-white flex-column">
        <lottie-player :src="loading" background="transparent" speed="1" style="height: 600px" loop
            autoplay></lottie-player>
    </v-card>
</template>

<style>
.loading {
    position: fixed;
    width: 100vw;
    height: 100vh;

    top: 0;
    left: 0;
}
</style>
