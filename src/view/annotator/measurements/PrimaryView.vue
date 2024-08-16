<template>
   <PageSummary :breadcrumbs="breadcrumbs" :avatar="logo" title="Annotator" subtitle="Add clinic descriptions for patients" footer="© 2024 Clinic Description Annotator">
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
      <n-switch v-model:value="activeSwitch"  @update:value="handleSwitchBtn">
        <template #checked>
          Selected All Patients
        </template>
        <template #unchecked>
          Deselected All Patients
        </template>
      </n-switch>

      <n-checkbox-group v-model:value="patients"  class="flex flex-row flex-wrap justify-start w-full">
            <n-checkbox v-for="p, i in patientsDirectoryHandle?.children" :key="i" :value="p.name" :label="p.name" size="large" class="checkbox-item"/>
      </n-checkbox-group>
      <n-divider />
    </div>
   </div>
   
   <div v-show="patients.length > 0 && annotator!=='Annotate'? true: false"> 
    <div class="p-3 m-3">
      <FormTab>
        <template #observation>
          <n-h6>Add Observations for selected patients:</n-h6>
          <Observation :patients="patients" :formDescription="formDescription" @updateObservation="updateObservations"/>
        </template>
        <template #imagingstudy>
          <n-h6>Generating ImagingStudy for selected patients:</n-h6>
          <ImagingStudy :patients="patients" :formDescription="formDescription" :patientsDirectoryHandle="patientsDirectoryHandle"/>
        </template>
      </FormTab>
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
import { ref, onMounted, watch} from "vue";

import { useRoute } from 'vue-router';
import PageSummary from "@/components/PageSummary.vue";
import FormTab from "../components/FormTab.vue";
import Observation from "../components/Observation.vue";
import ImagingStudy from "../components/ImagingStudy.vue";
import { NStatistic, NButton, NSpace, NCheckbox, NCheckboxGroup, NH3, NH6, NDivider, NSwitch} from 'naive-ui';
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";
import { IAnnotatorDescription, IFormObservation, IAnnotatorFormDescription} from "@/models";
import logo from "@/assets/images/3.png";


const { root } = storeToRefs(useFolderPickerStore());

const route = useRoute();

const filename = ref(route.query.name);
const breadcrumbs = [root.value?.name, filename.value] as Array<string>;
const patientsDirectoryHandle = ref<CustomFileSystemDirectoryHandle>();
const samples = ref(0);
const dicoms = ref(0);
const annotator = ref("Annotate");
const patients = ref<Array<string>>([]);

const formDescription = ref<IAnnotatorFormDescription>({dataset:{id: "", uuid: "", name: root.value?.name!, path: "/"}, patients:[]})
const descriptions= ref<IAnnotatorDescription>({dataset:{id: "", uuid: "", name: root.value?.name!, path: "/"}, patients:[]})

const activeSwitch = ref(false);

const onHandleAnnotator = () => {
  annotator.value === "Annotate" ? annotator.value = "Submit" : annotator.value = "Annotate";
}

onMounted(()=>{
  patientsDirectoryHandle.value = root.value?.children.filter((item: any) => item.name === filename.value)[0] as CustomFileSystemDirectoryHandle;
  patientsDirectoryHandle.value.children.forEach((item: CustomFileSystemDirectoryHandle | FileSystemFileHandle) => {
    if(item.kind === "directory"){
      samples.value += item.children.length;
      descriptions.value.patients.push({id: "", uuid: "", name: item.name, path: root.value?.name + "/" + item.name, observations: [], imagingStudy: null})
      formDescription.value.patients.push({id: "", uuid: "", name: item.name, path: root.value?.name + "/" + item.name, observations: [], imagingStudy: null})
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

watch(patients, (newVal) => {
  if(newVal.length > 0){
    if (newVal.length === formDescription.value.patients.length){
      activeSwitch.value = true;
    }
  }else{
    activeSwitch.value = false;
  }
})


// @ts-ignore
const updateObservations = (data: IFormObservation) => {
  updateDescriptionsObservations();
}

const updateDescriptionsObservations = () => {
  descriptions.value.patients.forEach((p) => {
    const index = formDescription.value.patients.findIndex((item) => item.name === p.name);
    p.observations = [];
    formDescription.value.patients[index].observations.forEach((o) => {
      p.observations.push(o.observation);
    })
  })
}

const handleSwitchBtn = (value: boolean) => {
  if(value){
    patients.value = formDescription.value.patients.map((p: any) => p.name);
  }else{
    patients.value = [];
  }
}

</script>

<style scoped>
.checkbox-item{
  @apply flex justify-center items-center w-32 h-10 m-2 rounded-lg border-dashed border-2 border-gray-300 bg-pink-50 shadow-md
}

</style>