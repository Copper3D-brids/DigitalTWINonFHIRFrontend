<template>
    <div class="flex flex-col">
        <ImagingStudySeries v-for="p in patients" :key="p" :patient="p" :patient-directory-handle="getPatientDirectoryHandle(p)" :selected-samples="selectedPatientsSamples[p]" v-model:selected-patients-samples ="selectedPatientsSamples"/>
        <n-button  class="w-4/5 ml-auto mr-auto rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-300 hover:to-orange-400 shadow-sm my-1" @click="onHandleGenerateImagingStudy">
            <n-text class="p-1 text-lg subpixel-antialiased font-semibold text-zinc-100 " >
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
import { IAnnotatorFormDescription, ISelectedPatientsSamples, IAnnotatorImagingStudySeries, IAnnotatorImagingStudySeriesInstance} from "@/models";
import { PropType, onMounted, ref, watch } from "vue";
import ImagingStudySeries from "./ImagingStudySeries.vue";
import { NButton, NText, useMessage} from "naive-ui";
import { readDicom, SNOMEDCT, SOP_CLASS_NAMES } from "./utils";


const props = defineProps({
    formDescription: Object as PropType<IAnnotatorFormDescription>,
    patientsDirectoryHandle: Object as PropType<CustomFileSystemDirectoryHandle>,
    patients: {
        type: Array<string>,
        default: () => []
    }
});
const emit = defineEmits();
const message = useMessage();

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

const onHandleGenerateImagingStudy = () => {
    for (let key in selectedPatientsSamples.value){
        const index = props.formDescription?.patients.findIndex((p)=>p.name===key);
        if (index !==undefined){
            props.formDescription!.patients[index!].imagingStudy!.series = [];
            for (let s of selectedPatientsSamples.value[key]){
                generateSeries(key, s).then((series) => {
                    props.formDescription!.patients[index!].imagingStudy!.series.push(series);
                    emit('updateImagingStudy', props.formDescription);
                }).catch((err) => {
                    message.error(`The folder ${s} includes non-dcm files. Errors: `+ err);
                })
            }
        }
    }
    emit('updateImagingStudy', props.formDescription);
};

const generateSeries = (patinet:string, series: string):  Promise<IAnnotatorImagingStudySeries>=>{
    return new Promise((resolve, reject)=>{
        const sampleHandle = (props.patientsDirectoryHandle?.children?.find((c)=>c.name===patinet) as CustomFileSystemDirectoryHandle)?.children?.find((c)=>c.name===series) as CustomFileSystemDirectoryHandle;
        const fristDcm = sampleHandle?.children?.find((c)=>c.name.endsWith(".dcm")) as FileSystemFileHandle;
        readDicom(fristDcm).then((dcm)=>{
            const uid = dcm.string('x0020000e');
            const bodyPartExamined:string = dcm.string('x00180015') as string;

            const seriesData: IAnnotatorImagingStudySeries = {
                    uid, 
                    name: series,
                    endpointUrl: "",
                    numberOfInstances: sampleHandle?.children?.length,
                    instances: []
                }
            if (!!bodyPartExamined){
                const snomed = SNOMEDCT[bodyPartExamined];
                if (snomed){
                    seriesData.bodySite = snomed;
                }
            }
            generateInstances(sampleHandle).then((instances)=>{
                seriesData.instances = instances;
                resolve(seriesData)
            }).catch((err)=>{
                reject(err);
            })
        }).catch((err:string)=>{
            reject(err);
        })
    }) 
}

const generateInstances = (sampleHandle: CustomFileSystemDirectoryHandle): Promise<Array<IAnnotatorImagingStudySeriesInstance>> => {
    return new Promise((resolve, reject) => {
        const instances = sampleHandle.children as FileSystemFileHandle[];
        const promises = instances.map((instance) => {
            return readDicom(instance);
        });
        Promise.all(promises).then((dcmInstances) => {
            const instancesData = dcmInstances.map((dcm) => {
                const instance:IAnnotatorImagingStudySeriesInstance = {
                    uid: dcm.string('x00080018'),
                    sopClassUid: dcm.string('x00080016'),
                    sopClassName: SOP_CLASS_NAMES[dcm.string('x00080016')],
                    number: dcm.string('x00200013'),
                }
                return instance;
            });
            resolve(instancesData);
        }).catch((err) => {
            reject(err);
        });
    });
}

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