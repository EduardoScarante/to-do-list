<script>

export default{
    props:{
        error: String
    }
}

</script>

<template>
    <div class="modal">
        <div class="pa-10 d-flex flex-column align-center justify-space-around rounded-lg bg-white pa-2">
            <h3>{{error}}</h3>
            <h2 v-if="!error">Sorry about that</h2>
            <h3 v-if="!error">An error occurred with new services, please try again later... ):</h3>
            <iframe v-if="!error" src="https://embed.lottiefiles.com/animation/98642" class="ma-4" width="200px" height="auto"></iframe>
            <iframe v-if="error" src="https://embed.lottiefiles.com/animation/100705" class="ma-4" width="200px" height="auto"></iframe>
            <div>
                <v-btn @click="this.$emit('close')"> Ok </v-btn>
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

iframe {
    border: none;
}
</style>
