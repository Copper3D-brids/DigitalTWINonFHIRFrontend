<template>
    <div class="flex flex-col pb-5">
        <ImagingStudySeries v-for="p in patients" :key="p" :patient="p" :patient-directory-handle="getPatientDirectoryHandle(p)" :selected-samples="selectedPatientsSamples[p]" v-model:selected-patients-samples ="selectedPatientsSamples"/>
        <ImagingStudyAnnotatorModal v-model:show-modal="showModal" :formDescription="formDescription" :selected-patients-samples="selectedPatientsSamples" @generate-imaging-study="onHandleGenerateImagingStudy"/>   
        <fancy-button @click="onHandleAnnotateImagingStudy"> 
            <n-text class="p-1 text-lg subpixel-antialiased font-semibold text-zinc-900 " >
                Annotating 
                <!-- <n-text class="text-zinc-900" v-if="patients.length>1?true:false">ImagingStudies</n-text>  -->
                <!-- <n-text class="text-zinc-900" v-else>ImagingStudy</n-text> -->
                selecting patients:  
                <n-text v-for="(p, index) in displayedPatients" :key="index" class="mx-1 text-gray-500">
                    {{ p }}
                </n-text>
                <n-text v-if="patients.length > 3" class="mx-1 text-gray-500">...</n-text>
            </n-text>
        </fancy-button>
    </div>
</template>

<script setup lang="ts">
import { IAnnotatorFormDescription, ISelectedPatientsSamples, IAnnotatorImagingStudySeries, IAnnotatorImagingStudySeriesInstance, IAnnotatorImagingStudy} from "@/models";
import { PropType, onMounted, ref, watch, computed, onBeforeMount } from "vue";
import ImagingStudySeries from "./ImagingStudySeries.vue";
import ImagingStudyAnnotatorModal from "./ImagingStudyAnnotatorModal.vue";
import { NText, useMessage} from "naive-ui";
import { readDicom, SNOMEDCT, SOP_CLASS_NAMES, parseNrrdHeader } from "./utils";
import FancyButton from "@/components/FancyButton.vue";

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
const showModal = ref(false);

// onMounted(() => {
    
// });

onBeforeMount(() => {
    props.patients.forEach((patient) => {
        // when user swicth to ImagingStudy tab again, we need to update the base info of the imagingStudy
        updateImagingStudyBaseInfo(patient);
    });
});

watch(() => props.patients, (newVal, oldVal) => {
    const addedPatients = newVal.filter(p => !oldVal.includes(p));
    const removedPatients = oldVal.filter(p => !newVal.includes(p));
    addedPatients.forEach((patient) => {
        // when user change the patients, we need to update the base info of the imagingStudy
        updateImagingStudyBaseInfo(patient);  
    });
});

watch(()=> selectedPatientsSamples, (newVal, oldVal) => {
    
    // When selectedPatientsSamples changes, we need to reload and initiation the formDescription patients imagingStudy
    props.patients.forEach((patientName) => {
        if (newVal.value.hasOwnProperty(patientName)) {
            const patientSamples = newVal.value[patientName];
            const index = props.formDescription?.patients.findIndex((p)=>p.name===patientName);
            if (props.formDescription!.patients[index!].imagingStudy.length !== patientSamples.length) {
                // add 
                if (props.formDescription!.patients[index!].imagingStudy.length < patientSamples.length){
                    patientSamples.filter((sample)=>{
                        return !props.formDescription!.patients[index!].imagingStudy.some((study) => study.series[0].name === sample.sampleName);
                    }).forEach((sample) => {
                        !props.formDescription!.patients[index!].imagingStudy.push({
                            uuid: "",
                            endpointUrl: "",
                            description: sample.description,
                            series: [{
                                uid: "",
                                name: sample.sampleName,
                                endpointUrl: "",
                                numberOfInstances: 0,
                                instances: [],
                                bodySite: {
                                    system: "http://snomed.info/sct",
                                    code: "",
                                    display: ""
                                }
                            }]
                        });
                    })
                }else {
                    // remove
                    props.formDescription!.patients[index!].imagingStudy = props.formDescription!.patients[index!].imagingStudy.filter((study) => {
                        return patientSamples.some((sample) => sample.sampleName === study.series[0].name);
                    });
                }
            }
            
            // if (props.formDescription!.patients[index!].imagingStudy.length !== imagingStudies.length) {
            //     props.formDescription!.patients[index!].imagingStudy = imagingStudies;
            // }
        }
    }); 
}, { deep: true });



const displayedPatients = computed(() => {
    if (props.patients.length <= 3) {
        return props.patients;
    } else {
        return props.patients.slice(0, 3);
    }
});

const onHandleAnnotateImagingStudy = () => {
    // 1. open the ImageingStudyAnnotatorModal
    showModal.value = true;
    // delete unselected patients' imagingStudy
    selectedPatientsSamples.value = Object.fromEntries(Object.entries(selectedPatientsSamples.value).filter(([key]) => props.patients.includes(key)));
    props.formDescription?.patients.forEach((patient)=>{
        if (!props.patients.includes(patient.name)){
            patient.imagingStudy = [];
        }
    })
};

const onHandleGenerateImagingStudy = () => {

    for (let [sampleName, sampleValue] of Object.entries(selectedPatientsSamples.value)){
        const index = props.formDescription?.patients.findIndex((p)=>p.name===sampleName);
        if (index !==undefined){
            for (let imaging of props.formDescription!.patients[index!].imagingStudy){
                if (imaging.description == "dcm"){
                    generateDcmSeries(sampleName, imaging.series[0].name).then((series) => {
                        imaging.series[0] = series;
                        emit('updateImagingStudy', props.formDescription);
                    }).catch((err) => {
                        message.error(`The folder ${imaging.series[0].name} includes non-dcm files. Errors: `+ err);
                    })
                }else if (imaging.description == "nrrd"){
                    generateNrrdSeries(sampleName, imaging.series[0].name).then((series) => {
                        imaging.series[0] = series;
                        emit('updateImagingStudy', props.formDescription);
                    }).catch((err) => {
                        message.error(`The folder ${imaging.series[0].name} includes non-nrrd files. Errors: `+ err);
                    })
                }
                
            }
        }
    }
};

const generateDcmSeries = (patinet:string, series: string):  Promise<IAnnotatorImagingStudySeries>=>{
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
            generateDcmInstances(sampleHandle).then((instances)=>{
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

const generateDcmInstances = (sampleHandle: CustomFileSystemDirectoryHandle): Promise<Array<IAnnotatorImagingStudySeriesInstance>> => {
    return new Promise((resolve, reject) => {
        const instances = sampleHandle.children as FileSystemFileHandle[];
        const promises = instances.map((instance) => {
            return readDicom(instance);
        });
        Promise.all(promises).then((dcmInstances) => {
            const instancesData = dcmInstances.map((dcm, index) => {
                if (index == 0)
                    console.log("Series Description",dcm.string('x00080033'));
                
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

const generateNrrdSeries = (patinet:string, series: string):  Promise<IAnnotatorImagingStudySeries>=>{
    return new Promise((resolve, reject)=>{
        const sampleHandle = (props.patientsDirectoryHandle?.children?.find((c)=>c.name===patinet) as CustomFileSystemDirectoryHandle)?.children?.find((c)=>c.name===series) as CustomFileSystemDirectoryHandle;
        const fristNrrd = sampleHandle?.children?.find((c)=>c.name.endsWith(".nrrd")) as FileSystemFileHandle;
        parseNrrdHeader(fristNrrd).then((nrrdHeader)=>{ 
            const uid = nrrdHeader['uid'] || '';
            const bodyPartExamined:string = nrrdHeader['bodyPartExamined'] || '';

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
            generateNrrdInstances(sampleHandle).then((instances)=>{
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

const generateNrrdInstances = (sampleHandle: CustomFileSystemDirectoryHandle): Promise<Array<IAnnotatorImagingStudySeriesInstance>> => {
    return new Promise((resolve, reject) => {
        const instances = sampleHandle.children as FileSystemFileHandle[];
        const promises = instances.map((instance) => {
            return parseNrrdHeader(instance);
        });
        Promise.all(promises).then((nrrdHeaders) => {
            const instancesData = nrrdHeaders.map((nrrdHeader, index) => {
                if (index == 0)
                    console.log("Series Description", nrrdHeader['description']);
                
                const instance:IAnnotatorImagingStudySeriesInstance = {
                    uid: nrrdHeader['uid'] || '',
                    sopClassUid: 'nrrd',
                    sopClassName: 'NRRD',
                    number: (index + 1).toString(),
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
    /**
     * 1. get the patient index in the formDescription
     * 2. if the patient does not have an imagingStudy, create one with an empty series-
     */
    const index = props.formDescription?.patients.findIndex((p)=>p.name===patient);

    if (props.formDescription?.patients[index!].imagingStudy.length !== 0) {
        selectedPatientsSamples.value[patient] = props.formDescription!.patients[index!].imagingStudy.map((study) => {
            return {
                sampleName: study.series[0].name,
                description: study.description
            };
        });
    }
};

const getPatientSamples = (patient: string) => {
    if (props.formDescription){
        const index = props.formDescription.patients.findIndex((p)=>p.name===patient);
        // if (props.formDescription.patients[index].imagingStudy![0].series.length >= 1){
            // return props.formDescription.patients[index].imagingStudy![0].series.map((s) => s.name);
        // }
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