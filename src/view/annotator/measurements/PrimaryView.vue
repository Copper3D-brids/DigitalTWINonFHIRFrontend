<template>
   <PageSummary :breadcrumbs="breadcrumbs" :avatar="logo" title="Subjects" subtitle="Add clinic descriptions for patients" footer="© 2024 Clinic Description Annotator">
      <n-statistic label="Number of patients" :value="patientsDirectoryHandle?.children.length" />
      <n-statistic label="Number of samples" :value="samples" />
      <n-statistic label="Number of dicoms" :value="dicoms" />
      <template #extra>
        <n-space>
        <n-button strong ghost class="w-[100px]" :color="annotator==='Annotate'?'#ff69b4':'#22c55e'" @click="onHandleAnnotator">{{ annotator }}</n-button>
      </n-space>
      </template>
   </PageSummary>

   <div v-show="annotator==='Annotate'? false : true">
    <div class="p-3 m-3">
      <n-h3>Select Patients:</n-h3>
      <n-checkbox-group v-model:value="patients"  class="flex flex-row flex-wrap justify-around w-full">
            <n-checkbox v-for="p, i in patientsDirectoryHandle?.children" :key="i" :value="p.name" :label="p.name" size="large" class="checkbox-item"/>
      </n-checkbox-group>
      <n-divider />
    </div>
   </div>

   <div>
    <div class="p-3 m-3">
      <n-h3>Measurements:</n-h3>
      <pre>{{ JSON.stringify(descriptions, null, 2) }}</pre>
    </div>
   </div>
   
    
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router';
import PageSummary from "@/components/PageSummary.vue";
import { NStatistic, NButton, NSpace, NCheckbox, NCheckboxGroup, NH3, NDivider} from 'naive-ui';
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";
import logo from "@/assets/images/2.png";

const { root } = storeToRefs(useFolderPickerStore());

const route = useRoute();

const filename = ref(route.query.name);
const breadcrumbs = [root.value?.name, filename.value] as Array<string>;
const patientsDirectoryHandle = ref<CustomFileSystemDirectoryHandle>();
const samples = ref(0);
const dicoms = ref(0);
const annotator = ref("Annotate");
const patients = ref(null);
const descriptions= ref({dataset:{id: "", uuid: "", name: root.value?.name, path: "/"}, patients:[]})

const onHandleAnnotator = () => {
  annotator.value === "Annotate" ? annotator.value = "Submit" : annotator.value = "Annotate";
}

onMounted(()=>{
  patientsDirectoryHandle.value = root.value?.children.filter((item: any) => item.name === filename.value)[0] as CustomFileSystemDirectoryHandle;
  patientsDirectoryHandle.value.children.forEach((item: CustomFileSystemDirectoryHandle | FileSystemFileHandle) => {
    if(item.kind === "directory"){
      samples.value += item.children.length;
      item.children.forEach((sample: CustomFileSystemDirectoryHandle | FileSystemFileHandle) =>{
        if (sample.kind === "directory"){
            sample.children.forEach((dcm) => {
            if(dcm.kind === "file" && dcm.name.endsWith(".dcm")){
              dicoms.value += 1;
            }
          })  
        }
      })
    }
  }) 
})

</script>

<style scoped>
.checkbox-item{
  @apply flex justify-center items-center w-32 h-10 m-2 rounded-lg border-dotted border-2 border-pink-200 bg-pink-100 shadow-lg shadow-pink-300/50
}

</style>