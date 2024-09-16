<template>
    <div class="main">
        <Modal :title="resource.resourceType + ' for patient: '+ resource.patient.display">
            <div class="border shadow-sm m-2 p-1 rounded-lg">
                <div class="my-1 md:my-2 tracking-wide"><span class="mx-2 font-semibold select-none">Category:</span> {{ resource.category[0].coding[0].display }}</div>
                <div class="my-1 md:my-2 tracking-wide"><span class="mx-2 font-semibold select-none">Category System:</span> <span class="span-text">{{ resource.category[0].coding[0].system }}</span></div>
                <div class="my-1 md:my-2 tracking-wide"><span class="mx-2 font-semibold select-none">UUID:</span> <span class="span-text">{{ resource.identifier[0].value }}</span></div>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { IConsent } from '@/models';

 defineProps<{
    resource: IConsent
}>()
</script>

<style scoped>
@import '@/assets/css/google-front.css';

.main {
    font-family: 'Poppins', sans-serif;
}
.span-text {
    @apply text-xs md:text-sm font-light break-words bg-zinc-100 px-1 md:py-1 md:px-2 rounded-md cursor-copy;
}
</style>