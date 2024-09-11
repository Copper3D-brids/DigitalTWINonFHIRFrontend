<template>
    <div class="fixed z-10 top-0 left-0 right-0 h-[8vh] pt-3 px-3 shadow-sm">
        <app-layout-header/>
    </div>
    <!-- bg-gradient-to-r from-zinc-100 to-neutral-500 -->
    <div class="fixed bg-fancy-gradient " >
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import AppLayoutHeader from '@/layout/AppLayoutHeader.vue';
</script>

<style scoped>

</style>