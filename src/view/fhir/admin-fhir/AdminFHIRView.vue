<template>
    <div class="p-3">
        <div class="flex justify-between">
            <h1 class="md:text-2xl font-semibold">FHIR Data Overall</h1>
            <div class="flex items-center">
                <n-icon class="text-2xl text-blue-400">
                    <FootStepsIcon />
                </n-icon>
            </div>
        </div>
        <n-divider />
        <div class="flex flex-col md:flex-row">
            <div v-if="['md', 'xl','2xl','3xl'].includes(screenSize)?true:false" class="mt-2 md:p-3 border shadow-md rounded-md md:shadow-fancy-1">
                <n-timeline :size="['md', 'xl','2xl','3xl'].includes(screenSize)?'large':'medium'" >
                    <n-timeline-item
                        v-for="(value, key) in overall" :key="key"
                        type="success"
                        :title="(key as string).charAt(0).toUpperCase() + (key as string).slice(1)"
                        :content="'Total: ' + value.length"
                        :time="'View Details'"
                        class="hover:cursor-pointer hover:bg-zinc-100 rounded-lg p-2 select-none"
                        :class="{
                            'bg-zinc-200': key === currentKey,
                        }"
                        @click="handleResourceClick(key as string)"
                    >
                        <template #icon>
                            <n-icon>
                                <FlameIcon />
                            </n-icon>
                        </template>
                    </n-timeline-item>
                </n-timeline>
            </div>
            <div v-else>
                <div class="grid grid-cols-8 gap-4 border rounded-md p-2 shadow-lg">
                    <div v-for="(d, i) in smallSizeData" :key="i" 
                        :class="d.classname" 
                        class="text-center rounded-md p-2 shadow-md m-1"
                        @click="handleResourceClick(d.key)">
                        <span class="font-semibold mr-2">{{ d.title.charAt(0).toUpperCase() + d.title.slice(1)}}:</span>
                        <span>{{ d.count }}</span>
                    </div>
                </div>
            </div>
            <div class="m-1 mt-2 md:ml-20 p-1 md:p-5 rounded-md md:shadow-fancy-inner flex-1 flex flex-row flex-wrap justify-evenly">
                <n-card v-for="d in displayData" size="small" :key="d.uuid" :title="d.resourceType" class="max-w-[300px] shadow-fancy-2 my-1 md:mx-2" >
                    <template #cover>
                        <img :src="d.img" class="p-5 size-52">
                    </template>
                    <div class="font-bold">{{ d.name }}</div>
                    <div>UUID: {{ d.uuid }}</div>
                    <template #action class=" p-0">
                        <div class=" cursor-pointer text-center">
                            <n-button type="info" size="large" class="rounded-md" >
                                <!-- <router-link :to="{name: 'fhir-details', query: {resourceType: d.resourceType, uuid: d.uuid, resource: encodeURIComponent(JSON.stringify(d.value))}}">View Details</router-link> -->
                                <router-link :to="{name: 'fhir-details', query: {resourceType: d.resourceType, uuid: d.uuid}}">View Details</router-link>
                            </n-button>
                        </div>
                    </template>
                </n-card>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, onUnmounted, ref, computed } from "vue";
import { useOverallInfoStore } from '@/store/app';
import { storeToRefs } from "pinia";
import { NTimeline, NTimelineItem, NIcon, NDivider, NCard, NButton } from 'naive-ui';
import { updateScreenSize } from "@/plugins/utils";
import { useIcons } from "@/layout/composables/icons";
import workflow_tool_img from '@/assets/images/fhir/maker_launch.svg';
import dataset_img from '@/assets/images/fhir/science.svg';
import patient_img from '@/assets/images/fhir/patient.svg';
import practitioner_img from '@/assets/images/fhir/doctors.svg';
import workflow_image from '@/assets/images/fhir/animating.svg';

const { overall } = storeToRefs(useOverallInfoStore());
const { getOverall } = useOverallInfoStore();
const { FlameIcon, FootStepsIcon } = useIcons();
const screenSize = ref('')
const currentKey = ref('')

type DisplayResourceData = {
    resourceType: string,
    uuid: string,
    name?: string,
    img: string
    value: string
}



onBeforeMount(async () => {
    await getOverall();
}) 

const handleScreenUpdate = () => {
    screenSize.value = updateScreenSize();
}

const handleResourceClick = (item: string) => {
    currentKey.value = item;
}

const displayData = computed(()=>{
    if(currentKey.value === '' || overall.value === undefined){
        return []
    }
    const data:Array<DisplayResourceData> = [];
    const resourceData = overall.value[currentKey.value] as Array<any>;
    resourceData.forEach(resource => {
        let name = "";
        if (currentKey.value === 'patients' || currentKey.value === 'researchers') {

            const family = !!resource.name[0].family ? resource.name[0].family : '';
            name = resource.name[0].given.join(' ') + ' ' + family;
        }else {
            name =  resource.title;
        }
        data.push({
            resourceType: resource.resourceType,
            uuid: resource.identifier[0].value,
            name: name,
            img: currentKey.value === 'patients' ? patient_img : currentKey.value === 'researchers' ? practitioner_img : currentKey.value === 'datasets' ? dataset_img : currentKey.value === 'workflow_tools' ? workflow_tool_img : workflow_image,
            value: resource
        })
    });

    return data;
})

const smallSizeData = computed(() => {
    const data:Array<{key:string, title:string, classname:string, count:number}> = [];
    let idx = 1;

    !!overall.value && Object.keys(overall.value).forEach(key => {
        if (idx === 1 || idx === 4) {
            const c = key === 'datasets'? 'bg-purple-600': 'bg-green-500'
            data.push({
                key,
                title: key,
                classname: 'col-start-1 col-end-5 ' + c,
                count: overall.value![key].length
            })
        }else if (idx === 2 || idx === 5) {
            const c = key === 'workflow_tools'? 'bg-blue-400': 'bg-orange-500'
            data.push({
                key,
                title: key === 'workflow_tools' ? 'Tools' : key,
                classname: 'col-start-5 col-end-9 ' + c ,
                count: overall.value![key].length
            })
        }else {
            data.push({
                key,
                title: key,
                classname: 'col-start-1 col-end-9 bg-green-500',
                count: overall.value![key].length
            })
        }
        idx++;
    })

    return data;
})

onMounted(() => {
    handleScreenUpdate();
    window.addEventListener('resize', handleScreenUpdate);
})

onUnmounted(() => {
    window.removeEventListener('resize', handleScreenUpdate);
})
function formatDateToDDMMYYYY() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    
    return `${day}/${month}/${year}`;
}

</script>

<style scoped>

</style>