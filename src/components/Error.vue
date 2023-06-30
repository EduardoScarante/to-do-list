<template>
    <div class="modal">
        <div class="pa-10 d-flex flex-column align-center justify-space-around rounded-lg bg-white pa-2">
            <h2>Sorry about that</h2>
            <h3>An error occurred with new services, please try again later... ):</h3>
            <iframe src="https://embed.lottiefiles.com/animation/98642" width="300px" height="300px"></iframe>
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
