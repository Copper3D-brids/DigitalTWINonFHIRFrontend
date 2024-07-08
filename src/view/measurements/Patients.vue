<template>


    <div v-for="p, i in patients" :key="i" >
        <div>"Resource Type: " {{ p.resourceType }}</div>
        <div>"Id: " {{ p.id }}</div>
        <div>"uuid: " {{ p.identifier[0].value }}</div>
        <div>"GP: " {{ p.generalPractitioner[0].display }}</div>
        <div>"Name: " {{ p.name? p.name[0].text : "none"}}</div>
        <br/>
    </div>
    <n-flex class="container">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-flex>Long! Long! Cross the line!sadcsacsacsadcascacdsacsacsadcsadcdascda</n-flex>
  </n-flex>

    
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePatientsInfoStore } from "@/store/app";
import { NFlex, NButton } from "naive-ui";


const {patients} = storeToRefs(usePatientsInfoStore());
const {getPatients} = usePatientsInfoStore();

onMounted(async () => {
    await getPatients();
    
})
</script>

<style scoped>
.container {

    background: red
}
</style>

