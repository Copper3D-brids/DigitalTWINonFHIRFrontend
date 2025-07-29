<template>
    <div class="w-full h-[87vh] flex justify-around items-center">
        <div>
            <FancyRouterCard title="Annotator for LocalDataset" route="local-annotator" :query="customQuery" /> 
        </div>
         
         <div>
            <FancyRouterCard title="Annotator for DigitalTWINS" route="measurements-digital-twin" :query="customQuery"/>
         </div>
    </div>
</template>

<script setup lang="ts">
import FancyRouterCard from '@/components/FancyRouterCard.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const queryCategory = route.query.category
const customQuery = ref({
    category: queryCategory
})


</script>

<style scoped>
</style>
