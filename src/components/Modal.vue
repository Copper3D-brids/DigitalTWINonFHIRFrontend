<template>
     <n-button  tertiary round type="info" @click="showModal = true">
        View More
    </n-button>
    <n-modal v-model:show="showModal" preset="card" class="mx-5 md:w-2/3 md:mx-auto" :title="title">
        <slot></slot>
    </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NModal } from 'naive-ui'

defineProps<{
    title: string
}>()

const showModal = ref(false)
</script>

<style scoped>

</style>