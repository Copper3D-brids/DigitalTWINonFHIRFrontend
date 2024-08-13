<template>
    <n-tabs type="segment" animated>
        <n-tab-pane name="Observation" tab="Observation">
            <slot name="observation"></slot>
        </n-tab-pane>
        <n-tab-pane name="ImagingStudy" tab="ImagingStudy">
            <slot name="imagingstudy"></slot>
        </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { NTabs, NTabPane} from 'naive-ui';
</script>

<style scoped>

</style>