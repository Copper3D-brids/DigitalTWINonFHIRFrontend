<template>
    <div class="bg-box">
        <div v-for="(bg, i) in [1,2,3,4]" :key="i" :class="{ active: i === index }" class="bg"></div>
    </div>

    <div class="carousel main">
      <div class="list-img" :style="{ transform: `translateY(${index * -100}%)` }">
        <div class="item custom-drop-shadow">
          <img :src="img5" alt="" />
        </div>

        <div class="item custom-drop-shadow">
          <img :src="img6" alt=""/>
        </div>

        <div class="item custom-drop-shadow">
          <img :src="img7" alt="" />
        </div>

        <div class="item custom-drop-shadow">
          <img :src="img10" alt="" />
        </div>
      </div>

      <div class="box-info">
        <div class="list-info" :style="{ transform: `translateY(${index * -25}%)` }">
          <div v-for="(d, i) in data" :key="i" class="info">
            <h2>{{ d.title }}</h2>
            <p>
              {{ d.description }}
            </p>

            <router-link class="btn " :to="d.link">Let's go Annotating</router-link>
          </div>
        </div>
      </div>

      <div class="navigation">
        <span class="prev-btn" @click="prev">
          <n-icon>
            <ChevronBackIcon />
          </n-icon>
        </span>
        <span class="next-btn" @click="next">
            <n-icon>
                <ChevronForwardIcon />
            </n-icon>
        </span>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useIcons } from '@/layout/composables/icons';
import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';
import img3 from '../assets/images/img3.png';
import img4 from '../assets/images/img4.png';
import img5 from '../assets/images/img5.png';
import img6 from '../assets/images/img6.png';
import img7 from '../assets/images/img7.png';
import img8 from '../assets/images/img8.png';
import img9 from '../assets/images/img9.png';
import img10 from '../assets/images/img10.svg';
import { ref, watchEffect } from 'vue';
import { NIcon } from 'naive-ui';


const {ChevronBackIcon, ChevronForwardIcon, AddIcon} = useIcons();

const data = ref([
    {
        title: "Primary Measurements Annotator",
        description: "A SPARC SDS primary measurements dataset will be required. A SPARC SDS primary measurements dataset will be required. This dataset may contain MRI images and other EHR measurements for each patient. You can use the annotator to annotate the Observation and ImagingStudy for EHR data.",
        link: { name: 'home-annotator', query: { category: 'Measurements' } }
    },
    {
        title: "Workflow Annotator",
        description: "A SPARC SDS workflow dataset will be required. This dataset may contain a workflow .cwl file for cohort patients. You can use the annotator to add the Workflow's title, description, inputs, outputs, workflow tools and steps.",
        link: { name: 'home-annotator', query: { category: 'Workflow' } }
    },
    {
        title: "Workflow Tool Annotator",
        description: "A SPARC SDS workflow tool dataset will be required. This dataset may contain a workflow tool .cwl file for cohort patients. You can use the annotator to add the Workflow tool's title, description, models and softwares.",
        link: { name: 'home-annotator', query: { category: "Workflow tool" } }
    },
    {
        title: "Workflow Tool Process Annotator",
        description: "A SPARC SDS workflow tool process dataset will be required. This dataset may contain a workflow tool process data executing by a workflow tool for patients. You can use the annotator to add the Workflow tool process's EHR inputs and outputs for patients.",
        link: { name: 'home-annotator', query: { category: "Workflow tool process" } }
    },
])

// State variables
const index = ref(0);
const bgs = ref(document.querySelectorAll(".bg"));

// Methods
const next = () => {
  if (index.value < 3) {
    index.value += 1;
  }else{
    index.value = 0;
  }
};

const prev = () => {
  if (index.value > 0) {
    index.value -= 1;
  }else{
    index.value = 3;
  }
};

// Watch effect to update background classes
watchEffect(() => {
  bgs.value.forEach((bg, i) => {
    bg.classList.toggle('active', i === index.value);
  });
});
</script>

<style scoped>

@import '../assets/css/google-front.css';

.main {
    font-family: 'Poppins', sans-serif;
}
ul > li {
  list-style: none;
}

/* a {
  text-decoration: none;
  color: #fff;
} */

.carousel {
  height: 100vh;
  padding: 0 10%;
  overflow: hidden;
}

.carousel .box-info {
  /* position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 650px;
  height: 384px;
  overflow: hidden; */
    @apply absolute top-1/2 transform -translate-y-1/2 md:w-[450px] xl:w-[650px] sm:h-96 overflow-hidden w-[300px] h-full  
}

.box-info .list-info {
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.list-info .info {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  height: 250px; */
  @apply flex flex-col justify-center text-zinc-600 sm:h-96 h-screen 
}

.info h2 {
  /* font-size: 50px;
  line-height: 1; */
  @apply sm:text-4xl text-xl font-bold
}

.info p {
  /* font-size: 16px;
  margin: 20px 0; */
  @apply text-base sm:my-5 my-10
}

.info .btn {
  /* display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 80px;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #fff;
  font-weight: 600; */
  @apply inline-flex justify-center items-center sm:w-60 sm:h-20 h-10 bg-transparent border-2 border-white rounded-full shadow-md text-zinc-50 sm:text-base font-extrabold hover:bg-[rgba(0,0,0,0.3)] hover:text-black
}

.carousel .list-img {
  height: 100%;
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.list-img .item {
  /* position: relative;
  height: 100%;
  display: flex;
  align-items: center; */
    @apply relative h-full hidden sm:flex items-center
}

.item img {
  /* position: absolute;
  right: 0;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1)); */
    @apply absolute right-0 pointer-events-none filter h-[70vh]
}

.navigation {
  /* position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%); */
  @apply absolute bottom-7 left-1/2 transform -translate-x-1/2
}

.navigation span {
  /* display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 0 10px;
  font-size: 55px;
  color: #fff; */
  @apply inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 bg-transparent border-2 border-white rounded-full shadow-md cursor-pointer mx-4 text-white sm:text-4xl text-xl
}

.bg-box .bg {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.bg-box .bg:nth-child(1) {
  background: linear-gradient(360deg, #408e20, #9acd31);
}

.bg-box .bg:nth-child(2) {
  background: linear-gradient(360deg, #fdc830, #f37335);
}

.bg-box .bg:nth-child(3) {
  background: linear-gradient(360deg, #2193b0, #6dd5ed);
}

.bg-box .bg:nth-child(4) {
  background: linear-gradient(360deg, #696901, #ffff03);
}


.bg-box .bg:nth-child(2),
.bg-box .bg:nth-child(3),
.bg-box .bg:nth-child(4) {
  clip-path: circle(0% at 50% 50%);
}

.bg-box .bg:nth-child(2).active,
.bg-box .bg:nth-child(3).active,
.bg-box .bg:nth-child(4).active {
  clip-path: circle(75% at 50% 50%);
}

</style>