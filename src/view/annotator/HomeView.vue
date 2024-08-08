<template>
    <div class="w-full h-[87vh] flex flex-col justify-center items-center">
     <drop-zone @on-change="handleOnchange"/>
    </div>
</template>

<script setup lang="ts">
import DropZone from "@/components/DropZone.vue"
import {ref} from "vue";

const rootDir = ref<CustomFileSystemDirectoryHandle>()

const handleOnchange = (root:CustomFileSystemDirectoryHandle)=>{
    rootDir.value = root;
}

</script>

<style scoped>

</style>