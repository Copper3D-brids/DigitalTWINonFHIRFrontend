<template>
    <div>
        <n-form>
          <n-form-item-row label="Username">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="Reenter Password">
            <n-input />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          Sign up
        </n-button>
    </div>
</template>

<script setup lang="ts">
import { NForm, NFormItemRow, NInput, NButton } from 'naive-ui';
</script>

<style scoped>

</style>