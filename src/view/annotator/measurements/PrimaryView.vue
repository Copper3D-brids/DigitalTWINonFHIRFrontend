<template>
    <div>
        {{ filename }}
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from 'vue-router';
const route = useRoute();

console.log(route);

const filename = ref(route.query.name);

</script>

<style scoped>

</style>