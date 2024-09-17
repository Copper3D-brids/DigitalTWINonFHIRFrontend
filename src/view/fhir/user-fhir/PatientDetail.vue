<template>
    <div ref="mainDiv" class="main p-1 md:px-5">
        <div class="border min-h-48 shadow-fancy-inner rounded-md flex flex-col items-center md:flex-row md:justify-start md:items-center p-3">
            <div class="md:mx-10 my-2">
                <n-avatar
                    round
                    class="size-16 md:size-24 shadow-fancy-inner m-1"
                    :src="patient_img"
                />
            </div>
            <div>
                <div class="my-1 tracking-wide"><span class=" font-semibold md:text-lg mx-2 select-none ">{{ patientDetails?.patient.resourceType }}</span></div>
                <div class="my-1 tracking-wide"><span class=" font-medium mx-2 select-none">Name:</span> <span>{{ patientDetails?.patient.name![0].text }}</span></div>
                <div class="my-1 tracking-wide"><span class=" font-medium mx-2 select-none">UUID:</span> <span class=" text-sm font-light bg-zinc-200 px-1 rounded-md cursor-copy">{{ patientDetails?.patient.identifier[0].value }}</span></div>
            </div>
            <div class="md:ml-auto my-3">
                <n-button tertiary round :type="!showGenerateReport ? 'success' : 'error'" @click="scrollTo()">
                    {{!showGenerateReport ? 'Generate Report' : 'Cancel'}}
                </n-button>
            </div>
        </div>

        <!-- show details -->
        <div class="ml-2 mt-5">
            <n-collapse display-directive="show">
                <n-collapse-item v-for="d, idx in patientDetails?.datasets" :key="d.researchStudy.identifier[0].value" :title="'Dataset '+ (idx+1)" :name="idx">
                    <div class="border shadow-sm m-2 p-1 rounded-lg">
                        <div class="my-1 tracking-wide"><span class="mx-2 select-none">Resource:</span> {{ d.researchStudy.resourceType }}</div>
                        <div class="my-1 tracking-wide"><span class="mx-2 select-none">Title:</span> {{ d.researchStudy.title }}</div>
                        <div class="my-1 tracking-wide"><span class="mx-2 select-none">UUID:</span> <span class="text-xs md:text-sm font-light break-words bg-zinc-100 px-1 rounded-md cursor-copy">{{ d.researchStudy.identifier[0].value }}</span></div>
                    </div>
                    <n-collapse>
                        <n-collapse-item :title="'Researcher'" name="1">
                            <div class="border shadow-sm m-2 p-1 rounded-lg">
                                <div class="my-1 tracking-wide"><span class="mx-2 select-none">Resource:</span> {{ d.relatedResources.researcher.resourceType }}</div>
                                <div class="my-1 tracking-wide"><span class="mx-2 select-none">Name:</span> {{ d.relatedResources.researcher.name![0].text }}</div>
                                <div class="my-1 tracking-wide"><span class="mx-2 select-none">UUID:</span> <span class="text-xs md:text-sm font-light break-words bg-zinc-100 px-1 rounded-md cursor-copy">{{ d.relatedResources.researcher.identifier[0].value }}</span></div>
                            </div>
                        </n-collapse-item>
                        <n-collapse-item title="Consent" name="2">
                            <div class="border shadow-sm m-2 p-1 rounded-lg flex flex-col md:flex-row md:items-center">
                                <div>
                                    <div class="my-1 tracking-wide"><span class="mx-2 select-none">Resource:</span> {{ d.relatedResources.consent.resourceType }}</div>
                                    <!-- <div class="my-1 tracking-wide"><span class="mx-2 select-none">UUID:</span> <span class="text-xs md:text-sm break-words font-light bg-zinc-100 px-1 rounded-md cursor-copy">{{ d.relatedResources.consent.identifier[0].value }}</span></div> -->
                                </div>
                                <div class="mx-auto md:ml-auto md:mx-0">
                                    <ConsentModal :resource="d.relatedResources.consent"/>
                                </div>
                            </div>
                        </n-collapse-item>
                        <n-collapse-item title="Measurements" name="3">
                            <div class="border shadow-sm rounded-lg -ml-8 md:ml-0 m-2 p-1">
                                <n-data-table
                                    :columns="columnsPageSize.measurement.column"
                                    :data="createMeasurementData(d.relatedResources.measurements)"
                                    :pagination="columnsPageSize.measurement.pagination"
                                    :single-line="false"
                                />
                            </div>
                        </n-collapse-item>
                        <n-collapse-item title="Workflow Tool Processes" name="4">
                            <div class="border shadow-sm rounded-lg -ml-8 md:ml-0 m-2 p-1">
                                <n-data-table
                                    :columns="columnsPageSize.process.column"
                                    :data="createProcessData(d.relatedResources.workflow_tool_processes)"
                                    :pagination="columnsPageSize.process.pagination"
                                    :single-line="false"
                                />
                            </div>
                        </n-collapse-item>
                    </n-collapse>
                </n-collapse-item>
            </n-collapse>
        </div>

        <!-- Generate report -->
         <div ref="reportDiv" v-if="showGenerateReport" class="mt-5">
            <n-divider title-placement="left">
                Generate Diagnostic Report for {{ patientDetails?.patient.name![0].text }}
            </n-divider>
            <patient-report-step :screen-size="screenSize"/>
         </div>
    </div>
</template>

<script setup lang="ts">
import { usePatientDetailsStore } from '@/store/app';
import { storeToRefs } from "pinia";
import { onBeforeMount, computed, h, ref, onMounted, onUnmounted } from 'vue';
import { NAvatar, NButton, NCollapse, NCollapseItem, NDataTable, NDivider } from 'naive-ui';
import { updateScreenSize } from "@/plugins/utils";
import { IPatient, IObservation, IImagingStudy, IWorkflowToolProcess } from '@/models';
import ConsentModal from '../components/ConsentModal.vue';
import PatientReportStep from '../components/PatientReportStep.vue';
import patient_img from '@/assets/images/fhir/patient.svg';

const props = defineProps<{
    uuid: string
}>()

const { patientDetails } = storeToRefs(usePatientDetailsStore());
const { getpatientDetails } = usePatientDetailsStore();
const screenSize = ref(updateScreenSize());
const showGenerateReport = ref(false);
const mainDiv = ref<HTMLDivElement|null>(null);
const reportDiv = ref<HTMLDivElement>();

const scrollTo = () => {
showGenerateReport.value=!showGenerateReport.value;
if(showGenerateReport.value){
   setTimeout(()=>{
    reportDiv.value?.scrollIntoView({behavior: "smooth", block: "start"});
   }, 100)
}else{
    mainDiv.value?.scrollIntoView({behavior: "smooth"});
}
};


const handleScreenUpdate = () => {
    screenSize.value = updateScreenSize();
}

onBeforeMount(async () => {
    await getpatientDetails(props.uuid);
}) 

onMounted(() => {
    handleScreenUpdate();
    window.addEventListener('resize', handleScreenUpdate);    
})

onUnmounted(() => {
    window.removeEventListener('resize', handleScreenUpdate);
})

const columnsPageSize = computed(()=>{
    if(['md', 'lg', 'xl', '2xl', '3xl'].includes(screenSize.value)){
        return {
            measurement: {
                pagination:{pageSize: 10},
                column: [
                {
                    title: 'Resource',
                    key: 'resource',
                    defaultFilterOptionValues: [],
                    filterOptions: [
                        {
                            label: 'Observation',
                            value: 'Observation'
                        },
                        {
                            label: 'ImagingStudy',
                            value: 'ImagingStudy'
                        }
                    ],
                    filter(value:any, row:any) {
                        return !!~row.resource.indexOf(String(value))
                    }
                },
                {
                    title: 'Code',
                    key: 'code',
                },
                {
                    title: 'Display',
                    key: 'display',
                },
                {
                    title: 'Value',
                    key: 'value',
                },
                {
                    title: 'Unit',
                    key: 'unit',
                },
                {
                    title: 'Endpoint',
                    key: 'endpoint',
                },
                {
                    title: 'Action',
                    key: 'actions',
                    render(row:any) {
                        return h(
                        NButton,
                        {    
                            tertiary: true,
                            round: true,
                            type: "info",
                            size: 'small',
                            onClick: () => handleRowClick(row)
                        },
                        { default: () => 'View More' }
                        )
                    }
                }
            ]
            },
            process: {
                pagination:{pageSize: 10},
                column: [
                {
                    title: 'Resource',
                    key: 'resource',
                },
                // {
                //     title: 'Identifier',
                //     key: 'uuid',
                // },
                {
                    title: 'Workflow',
                    key: 'workflow',
                },
                {
                    title: 'Workflow Tool',
                    key: 'tool',
                },
                {
                    title: 'lastModified',
                    key: 'time',
                },
                {
                    title: 'Action',
                    key: 'actions',
                    render(row:any) {
                        return h(
                        NButton,
                        {    
                            tertiary: true,
                            round: true,
                            type: "info",
                            size: 'small',
                            onClick: () => handleRowClick(row)
                        },
                        { default: () => 'View More' }
                        )
                    }
                }
            ]
            }
        }
    }else{
        return {
            measurement:  {
                pagination:{pageSize: 3},
                column: [
                    {
                        title: 'Resource',
                        key: 'resource',
                    },
                    {
                        title: 'Action',
                        key: 'actions',
                        render(row:any) {
                            return h(
                            NButton,
                            {    
                                tertiary: true,
                                round: true,
                                type: "info",
                                size: 'small',
                                onClick: () => handleRowClick(row)
                            },
                            { default: () => 'View More' }
                            )
                        }
                    }
                ]
            },
            process: {
                pagination:{pageSize: 3},
                column: [
                    {
                        title: 'Resource',
                        key: 'resource',
                    },
                    {
                        title: 'Action',
                        key: 'actions',
                        render(row:any) {
                            return h(
                            NButton,
                            {    
                                tertiary: true,
                                round: true,
                                type: "info",
                                size: 'small',
                                onClick: () => handleRowClick(row)
                            },
                            { default: () => 'View More' }
                            )
                        }
                    }
                ]
            }
        }
    }

})


function createMeasurementData(measurements: Array<IObservation|IImagingStudy>) {
    const data:any = [];
    measurements.forEach((m, idx) => {
        data.push({
            key: idx,
            resource: m.resourceType,
            uuid: m.identifier[0].value,
            code: m.resourceType === "Observation" ? m.code.coding[0].code : '',
            display: m.resourceType === "Observation" ?  m.code.coding[0].display : '',
            value: m.resourceType === "Observation" ? m.valueQuantity?.value : '',
            unit: m.resourceType === "Observation" ? m.valueQuantity?.unit : '',
            endpoint: m.resourceType === "ImagingStudy" ?  m.endpoint[0]?.reference: ''
        })
    })
  return data;
}

function createProcessData(process: Array<IWorkflowToolProcess>) {
    const data:any = [];
    process.forEach((m, idx) => {
        data.push({
            key: idx,
            resource: m.resourceType,
            uuid: m.identifier[0].value,
            workflow: m.for.display,
            tool: m.focus.display,
            time: m.lastModified
        })
    })
  return data;
}

const handleRowClick = (row:any) => {
    console.log(row)
}


</script>

<style scoped>
@import '@/assets/css/google-front.css';

.main {
    font-family: 'Poppins', sans-serif;
    overflow: auto;
}
</style>