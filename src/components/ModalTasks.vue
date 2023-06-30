<script>

import { dateFormater } from "@/mixin/dateFormater";

export default {
    mixins: [dateFormater]
    ,
    props: {
        item: Object,
    },
    methods: {
        deleteItem() {
            this.$emit('delete-item', this.item.id, this.item.title)
        },
        ResolveItem() {
            this.$emit('resolve-item', this.item.id)
        },
        detailPage() {
            this.$emit('detail-item', this.item.id)
        },
    }

}
</script>


<template>
    <v-card width='1000' class="ma-5">
        <v-img height="75"
            src="https://images.pexels.com/photos/5717409/pexels-photo-5717409.jpeg?auto=compress&cs=tinysrgb&h=600" cover
            class="text-white">
            <v-toolbar height="75" color="rgba(0, 0, 0, 0.6)" theme="dark">

                <v-toolbar-title class="text-h6">
                    {{ item.title }}
                </v-toolbar-title>


                <v-btn variant="tonal mx-2" @click="ResolveItem()" v-if="item.done">SOLVE</v-btn>
                <v-btn variant="tonal mx-2" @click="deleteItem()">DELETE</v-btn>
                <v-btn variant="tonal mx-2" @click=detailPage()>SEE MORE</v-btn>
            </v-toolbar>
        </v-img>

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <v-icon :icon="item.done == true ? 'mdi-check' : 'mdi-close'" :color="item.done == true ? 'green' : 'red'"/> 
                    <p class="ml-3">{{ item.done == true ? 'Done ;)' : 'Not done :(' }}</p>
                    
                    <template v-slot:actions="{ expanded }">
                        <v-icon :color="!expanded ? 'grey' : ''" :icon="!expanded ? 'mdi-menu-down' : 'mdi-minus'"></v-icon>
                    </template>

                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-timeline density="compact" align="start">
                        <v-timeline-item dot-color="green" size="x-small" v-if="item.done">
                            <b>Finished at</b>: {{ formatDateRes(item.updatedAt) }}
                        </v-timeline-item>

                        <v-timeline-item dot-color="red" size="x-small">
                            <b>Deadline</b>: {{ formatDate(item.deadline) }}
                        </v-timeline-item>

                        <v-timeline-item dot-color="blue" size="x-small">
                            <b>Open At:</b> {{ formatDateRes(item.createdAt) }}
                        </v-timeline-item>
                    </v-timeline>
                </v-expansion-panel-text>

            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
