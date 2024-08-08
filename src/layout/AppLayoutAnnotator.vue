<template>
   <n-layout style="height: 100vh">

    <n-layout-header bordered style="height: 8vh;">
        <app-layout-header />
    </n-layout-header>
    

    <n-layout position="absolute" style="top: 8vh; bottom: 5vh" has-sider @dragover.prevent @drop="(e)=>e.preventDefault()">
      <app-layout-sider v-if="root ? true : false" :menu-options="menuOptions" :width="320"/>

      <n-layout  :native-scrollbar="false">
        <router-view></router-view>
      </n-layout>
    </n-layout>
    <n-layout-footer
      position="absolute"
      style="height: 5vh;"
      bordered
    >
      <app-layout-footer></app-layout-footer>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import AppLayoutHeader from "@/layout/AppLayoutHeader.vue";
import AppLayoutFooter from "@/layout/AppLayoutFooter.vue";
import { NLayout,  NLayoutFooter, NLayoutHeader} from 'naive-ui';
import AppLayoutSider from "@/layout/AppLayoutSider.vue";
import {useFolderPickerStore} from "@/components/composables/folderpicker";
import { storeToRefs } from "pinia";
import { ref, watch, onMounted } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useIcons } from '@/layout/composables/icons';


const { renderIcon, generateRouterLabel } = useLayout();
const {FolderIcon, FolderOpenIcon, DocumentIcon, GridIcon} = useIcons();

// const {root, folderPicker} = useFolderPicker();
const {root} = storeToRefs(useFolderPickerStore());
const menuOptions = ref<any[]>([{
  label: () => generateRouterLabel("home-fhir", "Home")
}]) 

onMounted(()=>{
  console.log("mounted:", root);
  
})

const generateLable = (name:string) => {
  switch (name) {
    case "primary":
      return () => generateRouterLabel("annotator", name, name)
    default:
      return name
  }
}

const generateFolder = (name:string, children:Array<CustomFileSystemDirectoryHandle | FileSystemFileHandle>|null=null):any => {
  if (!!children){
    return {
            label: generateLable(name),
            key: name,
            icon: renderIcon(FolderIcon),
            children: [...generate(children)]
          }
  }

  return {
          label: generateLable(name),
          key: name,
          icon: renderIcon(FolderIcon),
          children: []
      }
}

const generateFile = (name:string) => {
  return {
          label: name,
          key: name,
          icon: renderIcon(DocumentIcon)
      }
}

const generate = (children:Array<CustomFileSystemDirectoryHandle | FileSystemFileHandle>) => {
    const dirs = children.filter((c)=>c.kind === "directory");
    const files = children.filter((c)=>c.kind === "file");
    const options = [];

    for(let c of dirs){
      const dir = generateFolder(c.name, c.children);
      options.push(dir);
    }

    files.forEach( f => {
      const file = generateFile(f.name);
      options.push(file);
    })

    return options;
}

watch(root, () => {
  console.log("watch: ", root);
  
  if(!!root && root.value?.children){
    
    menuOptions.value = [{
          label: () => generateRouterLabel("home-annotator", root.value!.name),
          key: root.value.name,
          icon: renderIcon(GridIcon)
      }, ...generate(root.value.children)]   
  }
})




</script>

<style scoped>


</style>