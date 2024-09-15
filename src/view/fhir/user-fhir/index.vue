<template>
    <div>
       <div v-if="resourceType==='Patient'">
           <PatientDetail :uuid="uuid" :resource="resource"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PatientDetail from './PatientDetail.vue';

const route = useRoute()

const resource = JSON.parse(decodeURIComponent(route.query.resource || '{}'))
const uuid = route.query.uuid as string;
const resourceType = route.query.resourceType as string;



</script>

<style scoped>

</style>