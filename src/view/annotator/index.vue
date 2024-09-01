<template>
    <div>
        <div class="fixed top-0 left-0 right-0 h-[8vh] pt-3 px-3 shadow-sm z-50">
            <app-layout-header/>
        </div>
        <Carousel />
    </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import AppLayoutHeader from '@/layout/AppLayoutHeader.vue';
import { onMounted } from 'vue';
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";

const { root } = storeToRefs(useFolderPickerStore());

onMounted(()=>{
    if(!!root){
        root.value = undefined;
    }
})


</script>

<style scoped>

</style>