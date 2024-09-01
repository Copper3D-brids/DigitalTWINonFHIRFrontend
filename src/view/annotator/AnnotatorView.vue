<template>
    <div class="w-full h-[87vh] flex flex-col justify-center items-center">
     <drop-zone :category="validCategory" @on-change="handleOnchange"/>
    </div>
</template>

<script setup lang="ts">
import DropZone from "@/components/DropZone.vue";
import Carousel from "@/components/Carousel.vue";
import {ref} from "vue";
import { useRoute } from 'vue-router';


const route = useRoute();

// Define your category type
type Category = "Measurements" | "Workflow" | "Workflow tool" | "Workflow tool process" | undefined;

// Extract and validate category
const queryCategory = route.query.category;
const category: Category | undefined = Array.isArray(queryCategory) 
  ? queryCategory[0] as Category // If array, take the first value
  : queryCategory as Category;   // If single value, use it

// Provide a default value if necessary
const validCategory: Category = category && ["Measurements", "Workflow", "Workflow tool", "Workflow tool process"].includes(category) 
  ? category 
  : undefined;

const rootDir = ref<CustomFileSystemDirectoryHandle>()

const handleOnchange = (root:CustomFileSystemDirectoryHandle)=>{
    rootDir.value = root;
}

</script>

<style scoped>

</style>