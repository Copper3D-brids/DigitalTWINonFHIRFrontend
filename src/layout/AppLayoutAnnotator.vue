<template>
   <n-layout class="flex flex-col bg-gradient-to-r from-zinc-100 to-neutral-300 h-screen">
    <n-layout-header class="bg-transparent h-[8vh] mt-auto shadow-sm">
        <app-layout-header />
    </n-layout-header>
    

    <n-layout class="flex-1 h-[87vh] bg-transparent" has-sider @dragover.prevent @drop="(e)=>e.preventDefault()">
      <app-layout-sider v-if="root ? true : false" :menu-options="menuOptions" :width="320"/>

      <n-layout  :native-scrollbar="false" class="bg-transparent">
        <router-view></router-view>
      </n-layout>
    </n-layout>
    <n-layout-footer
      class="h-[5vh] mt-auto bg-transparent footer"
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
import { useRoute } from 'vue-router';


const { renderIcon, generateRouterLabel } = useLayout();
const {FolderIcon, FolderOpenIcon, DocumentIcon, GridIcon} = useIcons();

const route = useRoute();


// const {root, folderPicker} = useFolderPicker();
const {root} = storeToRefs(useFolderPickerStore());
const menuOptions = ref<any[]>([{
  label: () => generateRouterLabel("home-fhir", "Home")
}]) 

onMounted(()=>{
  if(!!root && root.value?.children){
    const queryCategory = route.query.category;
    console.log("query",queryCategory);
    console.log("root",root.value.category);
    generateSideMenu(root.value);
  }
})

const generateLable = (name:string) => {
  switch (name) {
    case "primary":
      if(root.value?.category === "Measurements"){
        return () => generateRouterLabel("measurements", name, undefined, {name})
      }
      break;
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

const generateSideMenu = (root: CustomFileSystemDirectoryHandle)=>{
  menuOptions.value = [{
          label: () => generateRouterLabel("home-annotator", root!.name, undefined, {category: root!.category}),
          key: root.name,
          icon: renderIcon(GridIcon)
      }, ...generate(root.children)]
}

watch(root, () => {
  
  if(!!root && root.value?.children){
    
      generateSideMenu(root.value);
  }
})




</script>

<style scoped>
.test{

background: linear-gradient(145deg, #ffffff, #dcdcdd);
box-shadow:  5px 5px 10px #cfcfd0,
             -5px -5px 10px #ffffff;
}
.footer {
background: linear-gradient(45deg, #ffffff, #dcdcdd);
box-shadow:  5px -5px 10px #cfcfd0,
             -5px 5px 10px #ffffff;
}
</style>