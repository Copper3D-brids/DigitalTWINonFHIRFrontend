<template>
    <div class="flex-1 flex flex-col justify-center items-center w-full">
        <n-form class="w-full">
          <n-form-item-row label="Username">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          Sign In
        </n-button>

        <div class="mt-5">
            Don't have an account? <router-link to="#" class="text-blue-700 hover:bg-blue-300 p-1 rounded-md" >Sign up</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NForm, NFormItemRow, NInput, NButton } from 'naive-ui';
</script>

<style scoped>

</style>