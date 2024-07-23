import {ref} from "vue";
import { defineStore } from "pinia";


export const useFolderPickerStore = defineStore("folderPicker", () => { 
    const {root, folderPicker, folderDrop} = useFolderPicker()
    return {root, folderPicker, folderDrop}
});
export function useFolderPicker(){

    const root = ref<CustomFileSystemDirectoryHandle>();

    const processHandle = async (handle: any)=>{

        if (handle.kind === 'file'){
            return handle;
        }
        handle.children = [];
        const iter = handle.entries();
        for await (const item of iter){
            handle.children.push(await processHandle(item[1])) 
        }
        return handle;
    }

    const folderPicker = async () => {
       try {
            if (!window.showDirectoryPicker) {
                alert('Your browser is not support showDirectoryPicker');
                return;
            }

            const handle = await window.showDirectoryPicker();

            root.value = await processHandle(handle)

       } catch (error) {
            console.log(error);
       }
    }

    const folderDrop = async (item:DataTransferItem) => {
        try {
            if (item.kind === 'file') {
                const handle = await (item as any).getAsFileSystemHandle();
                root.value = await processHandle(handle)
            }
        } catch (error) {
           console.log(error);
            
        }
        
    }

    return {root, folderPicker, folderDrop}
}