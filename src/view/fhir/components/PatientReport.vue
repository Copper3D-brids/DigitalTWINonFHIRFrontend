<template>
    <div class="relative border rounded-lg shadow-md p-2 mt-10 min-h-96">
        <n-button type="success" round @click="downloadReport" class="absolute right-2 top-2">Download Report</n-button>
        <div ref="reportDisplayDiv" class="w-full flex flex-col justify-center items-center">
            <h1 class=" font-bold text-lg">{{ capitalizeEachWord(reportData.process.workflow.title)}} Report</h1>
            <div class="w-full flex flex-col justify-start mt-10 px-10">
                <div class="flex flex-row">
                    <h2 class=" font-semibold text-md">Patient:</h2>
                    <span class="ml-3">{{ patientDetails?.patient.name![0].text }}</span>
                    <span class="ml-3">{{ patientDetails?.patient.identifier[0].value }}</span>
                </div>
                <div class="flex flex-row">
                    <h2 class=" font-semibold text-md">Researcher:</h2>
                    <span class="ml-3">{{ reportData.dataset.relatedResources.researcher.name![0].text }}</span>
                    <span class="ml-3">{{ reportData.dataset.relatedResources.researcher.identifier[0].value }}</span>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row">
                        <h2 class=" font-semibold text-md">Workflow:</h2>
                        <span class="ml-3">{{ reportData.process.workflow.title }}</span>
                    </div>
                    <div>
                        <span class="ml-3">{{ reportData.process.workflow.description }}</span>
                        <div class="ml-3">
                            <h3>Workflow tools:</h3>
                            <div class="ml-3" v-for="action, idx in reportData.process.workflow.action" :key="idx">{{ action.title }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row">
                    <h2 class=" font-semibold text-md">Dataset:</h2>
                    <span class="ml-3">{{ reportData.dataset.researchStudy.title }}</span>
                    <span class="ml-3">{{ reportData.dataset.researchStudy.identifier[0].value }}</span>
                </div>
                <div>
                    <h2 class=" font-semibold text-md">Measurements:</h2>
                    <div class="flex flex-col ml-3" v-for="m, idx in reportData.measurements" :key="idx">
                        <div v-if="m.resourceType==='Observation'">
                            <div class="flex flex-row">
                                <span class=" font-semibold">{{ m.resourceType }}:</span>
                                <span class="ml-3">{{ m.code.coding[0].display }}</span>
                            </div>
                            <div class="ml-3">
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Code:</span>
                                    <span class="ml-3">{{ m.code.coding[0].code }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Value:</span>
                                    <span class="ml-3">{{ m.valueQuantity!.value }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Unit:</span>
                                    <span class="ml-3">{{ m.valueQuantity!.unit }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="m.resourceType==='ImagingStudy'">
                            <div class="flex flex-row">
                                <span class=" font-semibold">{{ m.resourceType }}:</span>
                                <span class="ml-3">{{ m.identifier[0].value }}</span>
                            </div>
                            <div class="ml-3">
                                <div class="flex flex-row">
                                    <span class="font-semibold">Number Of Series:</span>
                                    <span class="ml-3">{{ m.numberOfSeries }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Number Of Instance:</span>
                                    <span class="ml-3">{{ m.numberOfInstances }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Modality</span>
                                    <span class="ml-3">{{ m.series[0].modality.display }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Body site</span>
                                    <span class="ml-3">{{ m.series[0].bodySite.display }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="mt-5">After excuting workflow tools for the patient: {{ patientDetails?.patient.name![0].text }}, the results:</p>
                <div>
                    <h2 class="text-md font-semibold">Results:</h2>
                    <div class="flex flex-row">
                        <h3>Executing time:</h3>
                        <span class="ml-3">{{ reportData.process.workflow_tool_process.lastModified }}</span>
                    </div>
                    <div v-if="reportData.process.output.length > 0" class="flex flex-col">
                        <h3>Outputs:</h3>
                        <div class="ml-3" v-for="output, idx in reportData.process.output" :key="idx"> 
                            <div class="flex flex-row">
                                <span class=" font-semibold">{{ output.resourceType }}:</span>
                                <span class="ml-3">{{ output.code.coding[0].display }}</span>
                            </div>
                            <div class="ml-3">
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Code:</span>
                                    <span class="ml-3">{{ output.code.coding[0].code }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Value:</span>
                                    <span class="ml-3">{{ output.valueQuantity!.value }}</span>
                                </div>
                                <div class="flex flex-row">
                                    <span class=" font-semibold">Unit:</span>
                                    <span class="ml-3">{{ output.valueQuantity!.unit }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="my-1 text-red-300">
                        No output for selecting workflow tool process: <span class="text-red-500">{{ reportData.process.workflow_tool_process.description }}</span> , uuid: <span>{{ reportData.process.workflow_tool_process.identifier[0].value }}</span>.
                    </div>
                </div>
            </div>
            <div class="mt-20">
                This report is generated by Auckland Bioengineering Institute DigitalTWINs on FHIR project.
            </div>
            <div class="w-full px-10 my-1">
                <n-divider />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import html2pdf from 'html2pdf.js';
import { ref } from 'vue';
import { IPatientDetails, ReportData } from '@/models';
import { NButton, NDivider } from 'naive-ui';

defineProps({
    reportData: {
        type: Object as () => ReportData,
        default: () => {}
    },
    patientDetails: {
        type: Object as () => IPatientDetails,
        default: () => {}
    }
})
const reportDisplayDiv = ref<HTMLDivElement>();
const downloadReport = () => {
    const reportDiv = reportDisplayDiv.value;
    if(reportDiv){
        const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      html2pdf()
        .from(reportDiv)
        .set(options)
        .save();
    }
}

function capitalizeFirstLetter(str:string) {
  if (!str) return str; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeEachWord(str:string) {
  return str
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}
</script>

<style scoped>

</style>