<template>
    <AnnotatorPageSummary :title="'Workflow Annotator'" :avatar="logo" :annotator="annotator" subtitle="Add descriptions for workflow" @updateAnnotator="onHandleAnnotator">
      <n-statistic label="Number of workflows" :value="workflows.length" />
      <n-statistic label="Number of goals" :value="goalCount" />
      <n-statistic label="Number of actions" :value="actionCount" />
   </AnnotatorPageSummary>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AnnotatorPageSummary from "../components/AnnotatorPageSummary.vue";
import { NStatistic } from "naive-ui";
import { useRoute } from 'vue-router';
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";
import {readCWL} from "../components/utils";
import logo from "@/assets/images/2.png";


const route = useRoute();
const filename = ref(route.query.name);
const { root } = storeToRefs(useFolderPickerStore());
const annotator = ref("Annotate");
const goalCount = ref(0);
const actionCount = ref(0);

const workflowDirectoryHandle = ref<CustomFileSystemDirectoryHandle>();
workflowDirectoryHandle.value = root.value?.children.filter((item: any) => item.name === filename.value)[0] as CustomFileSystemDirectoryHandle;

const workflows = workflowDirectoryHandle.value.children.filter((item: any) => {
    if (item.kind === "file" && item.name.endsWith(".cwl")) {
        return item;
    }
}) as CustomFileSystemDirectoryHandle[];

console.log("workflowDirectoryHandle", workflowDirectoryHandle.value);

readCWL(workflowDirectoryHandle.value.children[0] as FileSystemFileHandle).then((data) => {
    console.log("data", data.steps);
    
    const keys = Object.keys(data.steps);
    console.log("keys", keys);
    
});


const onHandleAnnotator = (value: string) => {
  annotator.value === "Annotate" ? annotator.value = "Submit" : annotator.value = "Annotate";
}

</script>

<style scoped>

</style>