<template>
    <div>
        Patient Detail
    </div>
</template>

<script setup lang="ts">
import { usePatientDetailsStore } from '@/store/app';
import { storeToRefs } from "pinia";
import { onBeforeMount } from 'vue';

const props = defineProps<{
    uuid: string,
    resource: Object
}>()

const { patientDetails } = storeToRefs(usePatientDetailsStore());
const { getpatientDetails } = usePatientDetailsStore();

onBeforeMount(async () => {
    await getpatientDetails(props.uuid);

    console.log(patientDetails.value);
    
}) 
</script>

<style scoped>

</style>