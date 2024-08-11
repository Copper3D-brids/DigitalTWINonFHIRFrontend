<template>
    <div>
        test
        {{ root }}
    </div>
</template>

<script setup lang="ts">
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";

const { root } = storeToRefs(useFolderPickerStore());
console.log("test", root);

</script>

<style scoped>

</style>