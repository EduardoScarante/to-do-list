<script>

export default {
    props: {
        list: Object,
        summaryInfos: Array,
        imgPexel: String,
    },
    data() {
        return {
            itens: [],
            imgBkp: 'https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    },
    methods: {
        RedirectDetailItem() {
            this.$emit('redict-to-detail', this.list.id)
        },
        openModalUpdateList() {
            this.$emit('modal-update-list', this.list.id, this.list.title)
        },
        openModalDeleteItem() {
            this.$emit('modal-delete-item', this.list.id, this.list.title)
        },
    },
    computed: {
        itens() {
            const specificItem = this.summaryInfos.filter(e => e.listId == this.list.id);
            return [specificItem.filter(el => el.done == true).length, specificItem.filter(el => el.done == false).length]
        },
    },
}
</script>

<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card class="ma-2" width="400px" :elevation="isHovering ? 10 : 2" v-bind="props">
            <v-img class="align-end text-white" height="200" :src="imgPexel ? imgPexel : imgBkp" cover>
                <v-card-title style="background: rgb(0, 0, 0, 0.5);">{{ list.title }}</v-card-title>
            </v-img>

            <v-card-text>
                <v-card-subtitle>Open items from this list: {{ itens[1] }}</v-card-subtitle>
                <v-card-subtitle>Items completed from this list: {{ itens[0] }}</v-card-subtitle>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-around">
                <v-btn @click="RedirectDetailItem(list.id)" :color="isHovering ? 'black' : 'grey-lighten-1'">
                    <span class="material-symbols-outlined">
                        info
                    </span>
                </v-btn>

                <v-btn @click="openModalUpdateList(list.id, list.title)" :color="isHovering ? 'black' : 'grey-lighten-1'">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </v-btn>

                <v-btn @click="openModalDeleteItem(list.id, list.title)" :color="isHovering ? 'black' : 'grey-lighten-1'">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<style scoped>
</style>