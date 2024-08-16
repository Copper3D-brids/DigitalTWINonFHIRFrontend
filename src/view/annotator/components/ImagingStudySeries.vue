<template>
    <div class="my-2 py-1 bg-stone-50 rounded-md border-solid border-2 border-zinc-300 shadow-md">
        <n-h6 prefix="bar" align-text type="success"  >
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
import {NH6, NText, NTransfer} from 'naive-ui'
import { onMounted, PropType, ref } from 'vue';
import {  ISelectedPatientsSamples} from "@/models";


// const props = defineProps<{patient:string, patientDirectoryHandle:CustomFileSystemDirectoryHandle}>();
const props = defineProps({
    patient: String, 
    patientDirectoryHandle: Object as PropType<CustomFileSystemDirectoryHandle>,
    selectedSamples: {
        type: Array<string>,
        default: () => []
    },
    selectedPatientsSamples: {
      type: Object as PropType<ISelectedPatientsSamples>,
      required: true
    }
    });

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
    values.value = [...props.selectedSamples];
    if (values.value.length === 0){
        generateDicomSamples();
    }
});

const handleUpdate = (value: Array<string | number>) => {
    props.selectedPatientsSamples[props.patient!] = value.map((v) => v.toString());
    emit('update:selectedPatientsSamples', props.selectedPatientsSamples);
}


const generateDicomSamples = ()=>{

    props.patientDirectoryHandle?.children.forEach(async (sample: CustomFileSystemDirectoryHandle | FileSystemFileHandle) => {
        if (sample.kind === "directory"){
            for(const dcm of sample.children){
                if (dcm.kind === "file"){
                    isDcmFile(dcm).then((isDcm) => {
                        if (isDcm){
                            values.value.push(sample.name);
                            handleUpdate(values.value);
                        }
                    })
                    return
                }
            }
        }
    })
}

async function isDcmFile(fileHandle: FileSystemFileHandle): Promise<boolean> {
    const file = await fileHandle.getFile();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const view = new DataView(reader.result! as ArrayBuffer);
            // DICOM files usually start with "DICM" at position 128.
            const isDicom = view.getUint8(128) === 'D'.charCodeAt(0) &&
                            view.getUint8(129) === 'I'.charCodeAt(0) &&
                            view.getUint8(130) === 'C'.charCodeAt(0) &&
                            view.getUint8(131) === 'M'.charCodeAt(0);
            resolve(isDicom);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file.slice(0, 132));  // Read the first 132 bytes of the file
    });
}

</script>

<style scoped>

</style>