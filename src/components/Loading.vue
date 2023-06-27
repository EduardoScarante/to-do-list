<template>
    <v-card class="loading d-flex align-center justify-center">
        <v-progress-circular indeterminate color="amber"></v-progress-circular>
    </v-card>
</template>

<style>
.loading {
    position: fixed;
    width: 100vw;
    height: 100vh;
    
    top: 0px;
    left: 0;
    background: rgb(0, 0, 0, 0.2);
}
</style>