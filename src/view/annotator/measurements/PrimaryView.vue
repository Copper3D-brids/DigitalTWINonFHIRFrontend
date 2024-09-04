<template>

   <AnnotatorPageSummary :title="'Measurements Annotator'" :avatar="logo" :annotator="annotator" subtitle="Add clinic descriptions for patients" @updateAnnotator="onHandleAnnotator">
      <n-statistic label="Number of patients" :value="patientsDirectoryHandle?.children.length" />
      <n-statistic label="Number of samples" :value="samples" />
      <n-statistic label="Number of dicoms" :value="dicoms" />
   </AnnotatorPageSummary>

   <div v-show="annotator==='Annotate'? false : true">
    <div class="p-3 m-3">
      <n-h3>Select Patients:</n-h3>
      <n-switch v-model:value="activePatientsSwitch"  @update:value="handleSwitchBtn">
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
          <ImagingStudy :patients="patients" :formDescription="formDescription" :patientsDirectoryHandle="patientsDirectoryHandle" @updateImagingStudy="updateImagingStudy"/>
        </template>
      </FormTab>
      <n-divider />
    </div>  
   </div>

   <div>
    <div class="p-3 m-3">
      <n-h3>Measurements:</n-h3>
      <n-switch
      :rubber-band="false"
      :rail-style="railStyle"
      :value="activeImagingDetailSwitchRef"
      :loading="loadingSwitchRef"
      @update:value="handleUpdateSwitchValue"
    >
    <template #checked>
        Back to normal Measurements
      </template>
      <template #unchecked>
        Show Measurements Details
      </template>
    </n-switch>
      <pre class="my-1 p-2 rounded-md shadow-fancy-inner">{{ JSON.stringify(descriptions, null, 2) }}</pre>
    </div>
   </div>
   
    
</template>

<script setup lang="ts">
import { ref, onMounted, watch, CSSProperties} from "vue";

import { useRoute, useRouter } from 'vue-router';
import AnnotatorPageSummary from "../components/AnnotatorPageSummary.vue";

import FormTab from "../components/FormTab.vue";
import Observation from "../components/Observation.vue";
import ImagingStudy from "../components/ImagingStudy.vue";
import { NStatistic, NButton, NSpace, NCheckbox, NCheckboxGroup, NH3, NH6, NDivider, NSwitch} from 'naive-ui';
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";
import { IAnnotatorDescription, IAnnotatorImagingStudySeries, IAnnotatorFormDescription, IAnnotatorImagingStudy} from "@/models";
import logo from "@/assets/images/3.png";


const { root } = storeToRefs(useFolderPickerStore());

const route = useRoute();
const router = useRouter();

const filename = ref(route.query.name);

const patientsDirectoryHandle = ref<CustomFileSystemDirectoryHandle>();
const samples = ref(0);
const dicoms = ref(0);
const annotator = ref("Annotate");

const patients = ref<Array<string>>([]);

const activeImagingDetailSwitchRef = ref(false)
const loadingSwitchRef = ref(false)

const formDescription = ref<IAnnotatorFormDescription>({dataset:{id: "", uuid: "", name: root.value?.name!, path: "/"}, patients:[]})
const descriptions= ref<IAnnotatorDescription>({dataset:{id: "", uuid: "", name: root.value?.name!, path: "/"}, patients:[]})

const activePatientsSwitch = ref(false);
const railStyle = ({
  focused,
  checked
}: {
  focused: boolean
  checked: boolean
}): CSSProperties => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#a1a1aa'
    if (focused) {
      style.boxShadow = '0 0 0 2px #a1a1aa40'
    }
  } else {
    style.background = '#38bdf8'
    if (focused) {
      style.boxShadow = '0 0 0 2px #38bdf840'
    }
  }
  return style
}


const onHandleAnnotator = (value: string) => {
  annotator.value === "Annotate" ? annotator.value = "Submit" : annotator.value = "Annotate";
}

const handleUpdateSwitchValue = (value: boolean) => {
  loadingSwitchRef.value = true;
  setTimeout(() => {
    activeImagingDetailSwitchRef.value = value;
    loadingSwitchRef.value = false;
  }, 1000)
}

watch(activeImagingDetailSwitchRef, (newVal) => {
  updateDescriptions("imagingstudy")
})

onMounted(()=>{
  patientsDirectoryHandle.value = root.value?.children.filter((item: any) => item.name === filename.value)[0] as CustomFileSystemDirectoryHandle;

  if (!patientsDirectoryHandle.value || !patientsDirectoryHandle.value.children){
    // router.push({name: "home-annotator"})
    router.push('/')
  }else{
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
  }
})

watch(patients, (newVal) => {
  if(newVal.length > 0){
    if (newVal.length === formDescription.value.patients.length){
      activePatientsSwitch.value = true;
    }
  }else{
    activePatientsSwitch.value = false;
  }
})


// @ts-ignore
const updateObservations = (data: IAnnotatorFormDescription) => {
  updateDescriptions("observation");
}

// @ts-ignore
const updateImagingStudy = (data: IAnnotatorFormDescription) => {
  updateDescriptions("imagingstudy");
}

const updateDescriptions = (type:"observation"|"imagingstudy") => {

  descriptions.value.patients.forEach((p) => {
    const index = formDescription.value.patients.findIndex((item) => item.name === p.name);
    if(type === "observation"){
      p.observations = [];
      formDescription.value.patients[index].observations.forEach((o) => {
        p.observations.push(o.observation);
      })
    }
    if(type === "imagingstudy"){
      if(activeImagingDetailSwitchRef.value){
        p.imagingStudy = formDescription.value.patients[index].imagingStudy;
      }else{
        p.imagingStudy = {
          ...formDescription.value.patients[index].imagingStudy,
          series: formDescription.value.patients[index].imagingStudy?.series.map((s) => {
            return {
              ...s,
              instances: []
            }
          }) as Array<IAnnotatorImagingStudySeries>
        } as IAnnotatorImagingStudy
      }
    }
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