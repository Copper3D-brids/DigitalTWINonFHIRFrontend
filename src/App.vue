<script setup lang="ts">
import { NMessageProvider, NModalProvider } from 'naive-ui';
</script>

<template>
<n-message-provider>
    <n-modal-provider>
        <RouterView />
    </n-modal-provider>
</n-message-provider>
  
</template>

<style scoped>

</style>
