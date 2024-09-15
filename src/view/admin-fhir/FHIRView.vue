<template>
    <div class="p-3">
        <h1>Overall Information</h1>
        <div v-for="(value, key) in overall" :key="key" class="mt-2">
            <h2>{{ key }}</h2>
            <div v-for="d in value" :key="d.id">
                <div>
                <span class="m-1">
                        {{ d.resourceType }}:
                </span>
                <span class="m-1">
                        {{ d.identifier[0].value }}
                </span>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from "vue";
import { useOverallInfoStore } from '@/store/app';
import { storeToRefs } from "pinia";

const { overall } = storeToRefs(useOverallInfoStore());
const { getOverall } = useOverallInfoStore();

onBeforeMount(async () => {
    await getOverall();
})  

</script>

<style scoped>

</style>