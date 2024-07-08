<template>
   <n-layout style="height: 100vh">

    <n-layout-header bordered style="height: 8vh;">
        <app-layout-header />
    </n-layout-header>
    

    <n-layout position="absolute" style="top: 8vh; bottom: 5vh" has-sider>
        
        <app-layout-sider />

      <n-layout content-style="padding: 10px 50px;" :native-scrollbar="false">
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
import AppLayoutSider from "@/layout/AppLayoutSider.vue"
import { NLayout,  NLayoutFooter, NLayoutHeader} from 'naive-ui'


</script>

<style scoped>


</style>