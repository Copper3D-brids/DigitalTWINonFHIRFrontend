<template>
    <div class="w-full h-[87vh] flex flex-col justify-center">
        <div class="flex-1 mt-3 mx-3">
            <n-tabs type="segment" animated>
                <n-tab-pane
                    name="LocalAnnotator"
                    tab="Annotator for local dataset"
                    class="w-full h-[80vh] flex-1 flex justify-center items-center"
                >
                    <drop-zone :category="validCategory" @on-change="handleOnchange" />
                </n-tab-pane>
                <n-tab-pane
                    name="DigitalTWINSAnnotator"
                    tab="Annotator for DigitalTWINS Platform"
                    class="w-full h-[80vh] flex-1 flex justify-center items-center"
                >
                    Dataset comes from DigitalTWINS Platform
                </n-tab-pane>
            </n-tabs>
        </div>
        <div class=""></div>
    </div>
</template>

<script setup lang="ts">
import DropZone from '@/components/DropZone.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NTabs, NTabPane } from 'naive-ui'

const route = useRoute()

// Define your category type
type Category = 'Measurements' | 'Workflow' | 'Workflow tool' | 'Workflow tool process' | undefined

// Extract and validate category
const queryCategory = route.query.category
const category: Category | undefined = Array.isArray(queryCategory)
    ? (queryCategory[0] as Category) // If array, take the first value
    : (queryCategory as Category) // If single value, use it

// Provide a default value if necessary
const validCategory: Category =
    category && ['Measurements', 'Workflow', 'Workflow tool', 'Workflow tool process'].includes(category)
        ? category
        : undefined

const rootDir = ref<CustomFileSystemDirectoryHandle>()

const handleOnchange = (root: CustomFileSystemDirectoryHandle) => {
    rootDir.value = root
}
</script>

<style scoped></style>
