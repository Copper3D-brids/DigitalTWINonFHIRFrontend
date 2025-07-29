<template>
    <div class="my-2 py-1 bg-stone-50 rounded-md border-solid border-2 border-zinc-300 shadow-md">
        <n-h6 prefix="bar" align-text type="success">
            <n-text type="info" class="pl-3">
                Please select MRI samples for the patient: <n-text class="pl-3" type="error"> {{ props.patient }} </n-text>
            </n-text>
        </n-h6>

        <div class="flex flex-row justify-start px-2 pb-2">
            <n-transfer
                v-model:value="values"
                virtual-scroll
                :options="options"
                source-filterable
                target-filterable
                @update:value="handleUpdate"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {NH6, NText, NTransfer} from 'naive-ui';
import { onMounted, PropType, ref } from 'vue';
import {  ISelectedPatientsSamples, ISelectedPatientsSample } from "@/models";

const props = defineProps({
    patient: String, 
    patientDirectoryHandle: Object as PropType<CustomFileSystemDirectoryHandle>,
    selectedSamples: {
        type: Array<ISelectedPatientsSample>,
        default: () => []
    },
    selectedPatientsSamples: {
      type: Object as PropType<ISelectedPatientsSamples>,
      required: true
    }
    });

const allPatientDCMandNrrdSamples = ref<Array<{
        sampleName: string;
        description: string;
    }>>([]);
const values = ref<Array<string|number>>([]);
const options = ref<Array<{
    label: string,
    value: string,
}>>([]);

const emit = defineEmits(['update:selectedPatientsSamples']);


onMounted(() => {
    options.value = props.patientDirectoryHandle ? props.patientDirectoryHandle.children.map((child:any) => {
        return {
            label: child.name,
            value: child.name
        }
    }) : [];
    values.value = props.selectedSamples.map((sample) => sample.sampleName).sort((a, b) => a.localeCompare(b));
    if (values.value.length === 0){
        generateImagingStudySamples();
    }
});

const handleUpdate = (value: Array<string | number>) => {

    props.selectedPatientsSamples[props.patient!] = value.map((v) => {
        return {
            sampleName: v as string,
            description: allPatientDCMandNrrdSamples.value.find(sample => sample.sampleName === v)?.description || ''
        };
    });
    emit('update:selectedPatientsSamples', props.selectedPatientsSamples);
}


const generateImagingStudySamples = ()=>{

    props.patientDirectoryHandle?.children.forEach(async (sample: CustomFileSystemDirectoryHandle | FileSystemFileHandle) => {
        if (sample.kind === "directory"){
            for(const file of sample.children){
                if (file.kind === "file"){
                    detectFileType(file).then((fileFormat) => {
                        console.log(file.name, fileFormat);
                        if (fileFormat === 'dcm' || fileFormat === 'nrrd') {
                            values.value.push(sample.name);
                            allPatientDCMandNrrdSamples.value.push({
                                sampleName: sample.name,
                                description: fileFormat
                            });
                            handleUpdate(values.value);
                        }
                        
                    })
                    return
                }
            }
        }
    })
}

async function detectFileType(fileHandle: FileSystemFileHandle): Promise<'dcm' | 'nrrd' | null> {
    const file = await fileHandle.getFile();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const buffer = reader.result as ArrayBuffer;

            // Check for DICOM
            if (buffer.byteLength >= 132) {
                const view = new DataView(buffer);
                const isDicom =
                    view.getUint8(128) === 'D'.charCodeAt(0) &&
                    view.getUint8(129) === 'I'.charCodeAt(0) &&
                    view.getUint8(130) === 'C'.charCodeAt(0) &&
                    view.getUint8(131) === 'M'.charCodeAt(0);
                if (isDicom) {
                    resolve('dcm');
                    return;
                }
            }

            // Check for NRRD
            if (buffer.byteLength >= 8) {
                const text = new TextDecoder().decode(buffer.slice(0, 8));
                if (text.startsWith('NRRD000')) {
                    resolve('nrrd');
                    return;
                }
            }

            resolve(null);
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(file.slice(0, 132)); // Read enough bytes for both checks
    });
}

</script>

<style scoped>

</style>