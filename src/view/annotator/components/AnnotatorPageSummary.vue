<template>
    <PageSummary :breadcrumbs="breadcrumbs" :avatar="avatar" :title="title" :subtitle="subtitle" footer="© 2024 Clinic Description Annotator">
      <slot></slot>
      <template #extra>
        <n-space>
        <n-button strong ghost class="w-[100px]" :color="annotator==='Annotate'?'#ff69b4':'#22c55e'" @click="onHandleAnnotator">{{ annotator }}</n-button>
      </n-space>
      </template>
   </PageSummary>
</template>

<script setup lang="ts">
import PageSummary from "@/components/PageSummary.vue";
import { NButton, NSpace } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import { ref, defineProps, defineEmits } from 'vue';
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";



const { root } = storeToRefs(useFolderPickerStore());

const route = useRoute();

const filename = ref(route.query.name);

const props = defineProps<{
    avatar: string,
    subtitle: string,
    title: string,
    annotator: string,
}>();

const emit = defineEmits();

const breadcrumbs = [root.value?.name, filename.value] as Array<string>;

const onHandleAnnotator = () => {
    emit("updateAnnotator", props.annotator);
}

</script>

<style scoped>

</style>