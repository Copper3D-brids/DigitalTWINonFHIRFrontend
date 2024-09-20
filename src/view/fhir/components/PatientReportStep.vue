<template>
   <n-steps class="main p-2" :vertical="['md', 'lg', 'xl', '2xl', '3xl'].includes(screenSize)?false:true" :current="current" :status="currentStatus">
    <n-step v-for="(step, idx) in stepsData" :key="idx" :title="step.title">
        <div class="n-step-description">
          <div class="content">
            <n-select v-model:value="step.value" :multiple="(idx + 1) === 2 ? true : false" :options="step.options" :disabled="current !== (idx + 1) ? true : false"/>
          </div>
          <n-button
            v-if="current === idx + 1 && idx !== 0"
            type="info"
            size="small"
            class="btn"
            @click="prev"
          >
            Back
          </n-button>
          <n-button
            v-if="current === idx + 1"
            :type="buttonType"
            size="small"
            class="btn"
            @click="next"
          >
            Next
          </n-button>
        </div>
      </n-step>
      <n-step title="Generate Report">
        <div class="n-step-description">
          <p>
            Click to generate the report, you also can download the report.
          </p>

          <n-button
            v-if="current === 4"
            type="info"
            size="small"
            class="btn"
            @click="prev"
          >
            Back
          </n-button>
          <n-button
            v-if="current === 4"
            size="small"
            color="#ff69b4"
            class="btn"
            @click="generateReport"
          >
            Generate
          </n-button>
        </div>
      </n-step>
    </n-steps>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import type { StepsProps } from 'naive-ui';
import { IPatientDataset } from '@/models';
import { NSteps, NStep, NButton, NRadioGroup, NRadioButton, NSelect, c } from 'naive-ui';
import { useWorkflowToolProcessStore } from '@/store/app';
import { storeToRefs } from "pinia";

const { workflowToolProcess } = storeToRefs(useWorkflowToolProcessStore());
const { getWorkflowToolProcess } = useWorkflowToolProcessStore();

const props = defineProps({
    screenSize: {
        type: String,
        default: 'md'
    },
    datasets: {
        type: Array<IPatientDataset>,
        default: () => []
    },
})
const emit = defineEmits(['onReportData'])

const current = ref(1)
const currentStatus = ref<StepsProps['status']>('process')
const datasetValue = ref('Selecting...')
const measurementsValue = ref<string[]>([]);
const processValue = ref('Selecting...')



const datasetOptions = props.datasets.map((dataset, idx) => {
    return {
        label: `Dataste ${idx + 1}`,
        value: dataset.researchStudy.identifier[0].value
    }
})


const measurementsOptions = computed(() => {
    if (datasetValue.value === 'Selecting...') {
        return []
    }else {
      const filteredDataset = props.datasets.find(dataset => dataset.researchStudy.identifier[0].value === datasetValue.value)
      return filteredDataset?.relatedResources.measurements.map((measurement) => {
          const label = measurement.resourceType === 'Observation' ?`${measurement.resourceType}: ${measurement.code.text}` : measurement.resourceType;
          return {
              label,
              value: measurement.identifier[0].value
          }
      })
    } 
})  

const processOptions = computed(() => {
    if (measurementsValue.value.length === 0) {
        return []
    }else {
      const filteredDataset = props.datasets.find(dataset => dataset.researchStudy.identifier[0].value === datasetValue.value)
      return filteredDataset?.relatedResources.workflow_tool_processes.map((process) => {
          return {
              label: process.description,
              value: process.identifier[0].value
          }
      })
    }
})

const stepsData = ref([
  {
    title: "Select the dataset",
    value: datasetValue,
    options: datasetOptions
  },
  {
    title: "Select primary measurements",
    value: measurementsValue,
    options: measurementsOptions
  }, 
  {
    title: "Select the workflow tool process",
    value: processValue,
    options: processOptions
  },
])

const buttonType = computed(() => {
    switch (currentStatus.value) {
      case 'error':
          return 'error'
      case 'finish':
          return 'success'
      default:
          return 'success'
      }
})

watchEffect(async () => {
  if(processValue.value !== 'Selecting...') {
    await getWorkflowToolProcess(processValue.value);  
  }  
})

const validate = () => {
    if (current.value === 1) {
        if (datasetValue.value === 'Selecting...') {
            currentStatus.value = 'error'
            return false
        }
    }
    if (current.value === 2) {
        if (measurementsValue.value.length === 0) {
            currentStatus.value = 'error'
            return false
        }
    }
    currentStatus.value = 'process';
    return true
}

const next = () => {
    if (validate()) {
        current.value = current.value + 1
    }
}
const prev = () => {
  if (current.value === 2) {
    measurementsValue.value = []
  }else if (current.value === 3) {
    processValue.value = 'Selecting...';
    workflowToolProcess.value = null;
  }
  currentStatus.value = 'process';
  current.value = current.value - 1;
}

const generateReport = () => {
    const datasetSelected = props.datasets.find(dataset => dataset.researchStudy.identifier[0].value === datasetValue.value)
    const measurementsSelected = datasetSelected?.relatedResources.measurements.filter(measurement => measurementsValue.value.includes(measurement.identifier[0].value))
    const data = {
        dataset: datasetSelected,
        measurements: measurementsSelected,
        process: workflowToolProcess.value
    }
  emit('onReportData', data)
}
</script>

<style scoped>
@import '@/assets/css/google-front.css';

.main {
    font-family: 'Poppins', sans-serif;
    overflow: auto;
}

.n-step-description {
    @apply border border-gray-200 p-2 py-3 rounded-lg flex flex-col justify-between;
}
.content {
    @apply my-3;
}
.btn {
    @apply rounded-md m-1;
}
</style>