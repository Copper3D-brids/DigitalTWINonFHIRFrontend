<template>
    <n-modal v-model:show="showModal">
        <n-card
            class="w-3/5"
            title="Annotate ImagingStudy"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-infinite-scroll class="max-h-[70vh]" :distance="10">
                <div v-for="name in sortedPatientsSamplesKeys" :key="name" class="px-4 my-2 flex flex-col">
                    <n-divider title-placement="left" class="text-lg font-semibold">
                        {{ name }}
                    </n-divider>
                    <div class="shadow-fancy-inner p-3">
                        <n-form
                            v-for="(imagingStudy, i) in getImagingStudyFromFormDescription(name)"
                            :key="i"
                            ref="formRef"
                            inline
                            :label-width="80"
                            :model="imagingStudy"
                            :size="'large'"
                            class="flex flex-col"
                        >
                            <h3 class="font-semibold text-blue-400">
                                Sample: {{ selectedPatientsSamples[name][i].sampleName }}
                            </h3>
                            <div class="flex flex-row border border-zinc-500 rounded-md p-3 my-2">
                                <n-form-item label="UUID">
                                    <n-input v-model:value="imagingStudy.uuid" placeholder="ImagingStudy UUID" />
                                </n-form-item>
                                <n-form-item label="Endpoint URL">
                                    <n-input v-model:value="imagingStudy.endpointUrl" placeholder="Endpoint url" />
                                </n-form-item>
                                <n-form-item label="Description (dcm or nrrd)">
                                    <n-input v-model:value="imagingStudy.description" placeholder="dcm or nrrd" />
                                </n-form-item>
                            </div>
                        </n-form>
                    </div>
                </div>
            </n-infinite-scroll>
            <template #footer>
                <div class="flex justify-end w-full px-10">
                    <n-button type="warning" @click="showModal = false" class="mr-12">
                        Close
                    </n-button>

                    <n-button type="success" @click="handleGenerateClick">
                        Generate
                    </n-button>
                </div>
            </template>
        </n-card>
    </n-modal>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, computed } from 'vue';
import { IAnnotatorFormDescription, ISelectedPatientsSamples } from '@/models';
import { NButton, NModal, NCard, NSpace, NDivider, NInfiniteScroll, NForm, NFormItem, NInput} from "naive-ui";

const emit = defineEmits(['generate-imaging-study']);

const props = defineProps({
    formDescription: Object as PropType<IAnnotatorFormDescription>,
    selectedPatientsSamples: {
      type: Object as PropType<ISelectedPatientsSamples>,
      required: true
    }
});

const sortedPatientsSamplesKeys = computed(() => {
    
  return Object.keys(props.selectedPatientsSamples).sort()
})

const showModal = defineModel("showModal", {
    type: Boolean,
    default: false
});

onMounted(() => {
  
});

const getImagingStudyFromFormDescription = (patientName: string) => {
    const patientIndex = props.formDescription!.patients.findIndex(p => p.name === patientName);
    if (patientIndex !== -1) {
        props.selectedPatientsSamples[patientName].sort((a, b) => a.sampleName.localeCompare(b.sampleName));
        // Sort the imaging studies by series name
        return props.formDescription!.patients[patientIndex].imagingStudy.sort((a, b) => {
            return a.series[0].name.localeCompare(b.series[0].name);
        })
    }
    return [];
};

const handleGenerateClick = () => {
    // Emit an event to the parent component to handle the generation logic
    // emit('generate-imaging-study', props.selectedPatientsSamples);
    showModal.value = false; // Close the modal after generating
    emit('generate-imaging-study', props.formDescription!.patients);
};

</script>

<style scoped>

</style>