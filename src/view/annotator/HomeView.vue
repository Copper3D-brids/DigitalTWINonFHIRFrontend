<template>
    <div class="w-full h-[87vh] flex flex-col justify-center items-center">
     <drop-zone @on-change="handleOnchange"/>
    </div>
</template>

<script setup lang="ts">
import DropZone from "@/components/DropZone.vue"
import {ref} from "vue";
// import { useFolderPickerStore} from "@/components/composables/folderpicker";
// import { storeToRefs } from "pinia";

const rootDir = ref<CustomFileSystemDirectoryHandle>()

const handleOnchange = (root:CustomFileSystemDirectoryHandle)=>{
    rootDir.value = root
    // for (let c of root.children){
    //     console.log(c.kind, c.name);
    // }
    
}

</script>

<style scoped>

</style>