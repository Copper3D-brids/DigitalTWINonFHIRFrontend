<template>
    <div class="m-card">
        <card :data="data">
            <template v-for="(p, i) in patients" v-slot:[`card-slot-${i}`]>
                <div>"Resource Type: " {{ p.resourceType }}</div>
                <div>"Id: " {{ p.id }}</div>
                <div>"uuid: " {{ p.identifier[0].value }}</div>
                <div>"GP: " {{ p.generalPractitioner[0].display }}</div>
                <div>"Name: " {{ p.name? p.name[0].text : "none"}}</div>
                <br/>
            </template>
        </card>
    </div>
   

   <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePatientsInfoStore } from "@/store/app";
import Card from "@/components/Card.vue"
import img1 from "@/assets/images/1.png";
import img2 from "@/assets/images/2.png";
import img3 from "@/assets/images/3.png";


const {patients} = storeToRefs(usePatientsInfoStore());

const data = ref([
    {
        title: "Patients",
        icon: img1,
        text:"波雅·汉库克，日本漫画《航海王》及其衍生作品中的角色。人称：海贼女帝。 是位于无风带九蛇岛的海贼国家亚马逊·百合王国的现任皇帝，同时也是九蛇海贼团的现任船长。 其绝世的容颜被世人评价为“世界第一美女”."
    },
    {
        title: "Observations",
        icon: img2,
        text: "妮可·罗宾，日本漫画《航海王》及其衍生作品中的角色，草帽一伙的考古学家，出生在西海的考古学之岛“奥哈拉”，年仅8岁就被悬赏千万的奥哈拉幸存者。 “花花果实”能力者，能让身体的任何部位像开花一样绽放在视线范围内的任何有形体的事物上并作出攻击或其他用途。"
    },
    {
        title: "ImagingStudy",
        icon: img3,
        text: "娜美，日本漫画《航海王》及衍生作品中的女主角。 草帽一伙航海士，草帽大船团大干部之一，人称“小贼猫”，悬赏金3亿6600万贝里。 小时候为了救回家乡被迫加入了阿龙一伙。 从橘子镇开始和草帽一伙合作，在路飞打倒了阿龙后正式加入了草帽一伙。"
    },
])

onMounted(async () => {
    console.log("Measurements: ", patients.value);
})
</script>

<style scoped>
.m-card{
    width: 50vw;
    height: 40vh;
}

@media (max-width: 1200px) {
}

@media (max-width: 992px) {
    .m-card {
        width: 30rem;
        height: 20rem;
    }
    
}

@media (max-width: 768px) {

    .m-card {
        width: 25rem;
        height: 20rem;
    }
}

@media (max-width: 576px) {

    .m-card {
        width: 15rem;
        height: 20rem;
    }
    
} 
</style>