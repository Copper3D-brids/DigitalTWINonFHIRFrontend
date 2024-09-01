<template>
    <div 
        @dragenter.prevent="toggleActive" 
        @dragleave.prevent="toggleActive" 
        @dragover.prevent
        @drop.prevent="(event) => onChange(event, 'drop')"
        @click="(event) => onChange(event, 'click')" 
        :class="{'active-dropzone': active}"
        class="w-3/5 h-2/5 md:h-80 file-upload ease-in-out duration-300"
    >
        <n-avatar
            round
            class="animate-bounce"
            :size="40"
            :src="uploadImg"
        />
        <div className='file-upload_label'>
            <p className='text-14-regular'>
                <span className='text-orange-500'>
                    Click to upload
                </span> or drag and drop
            </p>
            <p class="font-bold">
                SPARC {{ !!props.category && props.category  }} SDS dataset
            </p>
        </div>
        <!-- <input type="file" ref="fileInput" webkitdirectory  @change="handleFileChange" style="display: none" /> -->
    </div>
    
</template>

<script setup lang="ts">
import uploadImg from "@/assets/upload-w.svg"
import { NAvatar } from "naive-ui";
import {ref, onMounted} from "vue";
import {useFolderPicker, useFolderPickerStore} from "./composables/folderpicker";
import { storeToRefs } from "pinia";

const props = defineProps<{
  category?: Category
}>();

const active = ref(false);
// const {root, folderPicker} = useFolderPicker();
const {root} = storeToRefs(useFolderPickerStore());
const {folderPicker, folderDrop} = useFolderPickerStore();

const emit = defineEmits([
  "onChange",
]);

const onChange = async (e:DragEvent | MouseEvent, type:string) => {
    if( type === "drop"){
        await triggerFolderDrop(e as DragEvent)
    }else if( type === 'click'){
        await triggerFolderInput()
    }
    try {        
        // const fileHandle = root.value.children[10]
        // const file = await fileHandle.getFile();
        // const reader = new FileReader()
        // reader.onload = e =>{
        //     console.log(e.target?.result);
            
        // }
        // reader.readAsText(file, 'utf-8')
        emit("onChange", root.value);
    } catch (error) {
        console.log(error);
        
    }
    
};


onMounted(()=>{

})

const triggerFolderDrop = async (e:DragEvent) => {
    toggleActive();
    const item = e.dataTransfer!.items[0];
    await folderDrop(item, props.category);

}

const triggerFolderInput = async () => {
    // fileInput.value?.click();
    await folderPicker(props.category);
};

const toggleActive = () => {
    active.value = !active.value;

}

// const handleFileChange = (event:Event) => {
//     const target = event.target as HTMLInputElement;
//     const files = target.files;
//       if (files) {
//         // Process each file in the directory
//         for (let i = 0; i < files.length; i++) {
//           const file = files[i];
//           console.log('Selected file:', file.name);
//           console.log('Relative path:', file.webkitRelativePath);
//           // You can handle the file processing logic here
//         }
//       }
// };
</script>

<style scoped>
.active-dropzone{
    @apply text-white bg-green-500 border-white
}
</style>