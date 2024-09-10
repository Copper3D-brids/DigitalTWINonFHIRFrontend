<template>
    <div class="flex flex-col py-16 md:flex-row inset-0 w-svw h-svh">
        
        <div class="w-1/3 hidden md:flex justify-center items-center">
            <div v-show="loaded" class="size-[20rem]">
                <Spline :url="'https://prod.spline.design/82UMsxlOWfp8t2zQ/scene.splinecode'"  @loaded="handleSplineLoaded" :class="'rounded-fancy-3 shadow-fancy-1  hover:rounded-full transition-all duration-500 ease-in-out'"/> 
            </div>
        </div> 
        <div class="w-full h-full md:w-2/3 flex items-center justify-center ">
            <div class="p-10 w-4/5 h-full md:h-2/3 xl:h-3/4 overflow-y-auto form-container shadow-lg">
                <n-tabs default-value="signin" size="large" justify-content="space-evenly" class="flex h-full"> 
                    <n-tab-pane name="signin" tab="Sign in" class="flex h-full">
                        <Login />
                    </n-tab-pane>
                    <n-tab-pane name="admin" tab="Admin" class="flex h-full">
                        <Admin />
                    </n-tab-pane>
                </n-tabs>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Admin from './components/Admin.vue';
import Spline from '@/components/Spline.vue';
import { ref } from 'vue';

const loaded = ref(false);

const handleSplineLoaded = (spline:any) => {

    (spline as any)._camera.zoom =0.6;
    setTimeout(() => {
        loaded.value = true;
    }, 500);
}
</script>

<style scoped>
::-webkit-scrollbar-track {
  background: transparent;
  /* border-radius: 10px; */
}
.form-container{
    border-radius: 15px;
    font-size: 14px;
    color: #fff;
    letter-spacing: 3px;
    background: rgba(255, 254, 254, 0.3);
    }
</style>
