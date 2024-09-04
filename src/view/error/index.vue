<template>
    <div class="flex justify-center items-center inset-0 absolute">
        <n-result
            status="404"
            title="404 Not Found"
            description="You know life is always ridiculous."
        >
            <template #footer>
            <n-button>
                <router-link to="/" >
                    Let's go back home
                </router-link>
            </n-button>
            </template>
        </n-result>
    </div>
    
</template>

<script setup lang="ts">
import { NResult, NButton } from 'naive-ui';
</script>

<style scoped>

</style>