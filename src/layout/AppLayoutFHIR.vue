<template>
   <n-layout style="height: 100vh">

    <n-layout-header bordered style="height: 8vh;">
        <app-layout-header />
    </n-layout-header>
    

    <n-layout position="absolute" style="top: 8vh; bottom: 5vh" has-sider @dragover.prevent @drop="(e)=>e.preventDefault()">
        
        <app-layout-sider :menu-options="menuOptions" :collapsed="true"/>

      <n-layout class="p-2 md:p-10" :native-scrollbar="false">
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
import AppLayoutSider from "@/layout/AppLayoutSider.vue";
import { NLayout,  NLayoutFooter, NLayoutHeader} from 'naive-ui';


import { useLayout } from '@/layout/composables/layout';
import { useIcons } from '@/layout/composables/icons';


const { renderIcon, generateRouterLabel } = useLayout();
const {CogIcon, LaptopIcon, GameControllerIcon, RocketIcon, LibraryIcon, PlanetIcon} = useIcons();



const menuOptions = [
  {
    label: () => generateRouterLabel("admin-home-fhir", "Home"),
    key: 'admin',
    icon: renderIcon(PlanetIcon)
  },
  {
    // label: () => generateRouterLabel("home-fhir", "Home"),
    label: () => generateRouterLabel("index-annotator", "Go Annotator"),
    key: 'annotator',
    icon: renderIcon(LaptopIcon)
  },
  {
    label: () => generateRouterLabel("admin-fhir-measurements", "Measurements"),
    key: 'primary-measurements',
    disabled: false,
    icon: renderIcon(LibraryIcon),
    children: [
        {
          label: () => generateRouterLabel("admin-fhir-patients", "Patients"),
          key: 'patients',
          icon: renderIcon(CogIcon),
        },
    ]
  },
  {
    label: 'Workflow',
    key: 'Workflow',
    icon: renderIcon(RocketIcon),
    children: [
      {
        label: 'Workflow Tools',
        key: 'tools',
        icon: renderIcon(CogIcon),
      },
      {
        label: 'Workflow process',
        key: 'process',
        icon: renderIcon(GameControllerIcon)
      },
    ]
  }
]


</script>

<style scoped>


</style>