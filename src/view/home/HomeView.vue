<template>
    <div class="fixed z-10 top-0 left-0 right-0 h-[8vh] pt-3 px-3 shadow-sm">
        <app-layout-header/>
    </div>
    <!-- bg-gradient-to-r from-zinc-100 to-neutral-500 -->
    <div class="fixed flex flex-col py-16 md:flex-row inset-0 w-svw h-svh bg-fancy-gradient " >
        <div class="flex flex-col flex-1">
            <div class="flex-1 flex justify-center items-center">
                <WaterCard :to="'/annotator'" :title="'Annotator'" :class="'rounded-fancy-1'">
                    Clinical Description Annotator
                </WaterCard>
                <!-- <RouterLink to="/annotator"> Annotator </RouterLink> -->
            </div>
            <div class="flex-1 flex justify-center items-center">
                <WaterCard :to="'/fhir'" :header="'02'" :title="'DigitalTWINs'" :class="'rounded-fancy-2'" :color="'#01b4ff'">
                    DigitalTWINs on FHIR
                </WaterCard>
            </div>
        </div>

        <div class="flex-1 hidden md:flex justify-center items-center">
            <div v-show="loaded" class="size-[32rem]">
                <!-- <Spline :url="'https://prod.spline.design/ASj4N78ij3AVUK1T/scene.splinecode'" @loaded="handleSplineLoaded" :class="'rounded-3xl m-1 shadow-lg shadow-zinc-600'"/> -->
                <!-- <Spline :url="'https://prod.spline.design/ASj4N78ij3AVUK1T/scene.splinecode'" @loaded="handleSplineLoaded" :class="'rounded-fancy-4 shadow-fancy hover:rounded-full transition-all duration-500 ease-in-out'"/> -->
                 <!-- Nice track -->
                <!-- <Spline :url="'https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode'" @loaded="handleSplineLoaded" :class="'rounded-fancy-4 shadow-fancy-2 hover:rounded-full transition-all duration-500 ease-in-out'"/>  -->
                <Spline :url="'https://prod.spline.design/82UMsxlOWfp8t2zQ/scene.splinecode'" @loaded="handleSplineLoaded" :class="'rounded-fancy-4 shadow-fancy-2 hover:rounded-full transition-all duration-500 ease-in-out'"/> 
                
            </div>
        </div> 
    </div>
    
</template>


<script setup lang="ts">
import Spline from '@/components/Spline.vue';
import WaterCard from '@/components/WaterCard.vue';
import AppLayoutHeader from '@/layout/AppLayoutHeader.vue';
import { Application } from '@splinetool/runtime';
import { ref, onMounted, onUnmounted } from 'vue';

const loaded = ref(false);

const screenSize = ref('')

const updateScreenSize = () => {
    if (window.matchMedia('(min-width: 1920px)').matches) {
        screenSize.value = '3xl'
    }else if (window.matchMedia('(min-width: 1536px)').matches) {
        screenSize.value = '2xl'
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
        screenSize.value = 'xl'
    } else if (window.matchMedia('(min-width: 1024px)').matches) {
        screenSize.value = 'lg'
    } else if (window.matchMedia('(min-width: 768px)').matches) {
        screenSize.value = 'md'
    } else {
        screenSize.value = 'sm'
    }
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})


const handleSplineLoaded = (spline:Application) => {
    
    console.log("spline loaded", spline);
    (spline as any)._camera.zoom =1;
    // (spline as any)._camera.position.set(-6687.1577352894915, 9188.7482903978407, 1000);
    // screenSize.value === "3xl"? (spline as any)._camera.zoom = 0.15 :(spline as any)._camera.zoom = 0.15;
    setTimeout(() => {
        loaded.value = true;
    }, 500);
}

 

</script>

<style scoped>

</style>