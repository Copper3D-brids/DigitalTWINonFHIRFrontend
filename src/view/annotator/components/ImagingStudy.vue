<template>
    <div>
        <ImagingStudySeries v-for="p in patients" :key="p" :patient="p" :patient-directory-handle="getPatientDirectoryHandle(p)" :selected-samples="selectedPatientsSamples[p]" v-model:selected-patients-samples ="selectedPatientsSamples"/>
        <n-button  class="w-full rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 shadow-sm my-1" @click="onHandleImagingStudy">
            <n-text class="p-1 text-lg subpixel-antialiased font-semibold text-zinc-100" >
                Generate 
                <n-text class="text-zinc-100" v-if="patients.length>1?true:false">ImagingStudies</n-text> 
                <n-text class="text-zinc-100" v-else>ImagingStudy</n-text>
                for selecting patients:  
                <n-text v-for="p in patients" class="mx-1 text-gray-500">{{p}}</n-text>
            </n-text>
            
        </n-button>
    </div>
</template>

<script setup lang="ts">
import { IAnnotatorFormDescription, ISelectedPatientsSamples} from "@/models";
import { PropType, onMounted, ref, watch } from "vue";
import ImagingStudySeries from "./ImagingStudySeries.vue";
import { NButton, NText} from "naive-ui";


const props = defineProps({
    formDescription: Object as PropType<IAnnotatorFormDescription>,
    patientsDirectoryHandle: Object as PropType<CustomFileSystemDirectoryHandle>,
    patients: {
        type: Array<string>,
        default: () => []
    }
});

const selectedPatientsSamples = ref<ISelectedPatientsSamples>({});

onMounted(() => {
    props.patients.forEach((patient) => {
        updateImagingStudyBaseInfo(patient);
    });
});

watch(() => props.patients, (newVal) => {
    newVal.forEach((patient) => {
        updateImagingStudyBaseInfo(patient);
    });
});

const onHandleImagingStudy = () => {
    console.log(selectedPatientsSamples.value);
    // emit('updateImagingStudy', selectedSamples.value);
};

const updateImagingStudyBaseInfo = (patient: string) => {
    const index = props.formDescription?.patients.findIndex((p)=>p.name===patient);
    if (index !==undefined && !props.formDescription?.patients[index!].imagingStudy){

        props.formDescription!.patients[index!].imagingStudy = {endpointUrl: "", path: props.formDescription?.patients[index].path!, series: []};
    }
    if (!selectedPatientsSamples.value[patient]){
        selectedPatientsSamples.value[patient] = getPatientSamples(patient);
    }
};

const getPatientSamples = (patient: string) => {
    if (props.formDescription){
        const index = props.formDescription.patients.findIndex((p)=>p.name===patient);
        if (props.formDescription.patients[index].imagingStudy!.series.length >= 1){
            return props.formDescription.patients[index].imagingStudy!.series.map((s) => s.name);
        }
    }
    return [];
};

const getPatientDirectoryHandle = (patientName: string) => {
  return props.patientsDirectoryHandle?.children
    ? Array.from(props.patientsDirectoryHandle.children)
        .find(child => child.name === patientName) as CustomFileSystemDirectoryHandle
    : undefined;
};




</script>

<style scoped>

</style>