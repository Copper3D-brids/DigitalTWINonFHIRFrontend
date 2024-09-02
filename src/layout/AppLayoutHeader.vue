<template>
    <n-flex justify="space-between" align="center" style="height: 100%; padding: 2px 20px;">
      <RouterLink to="/">
        <n-flex class="cursor-pointer flex flex-row items-center">
          <n-avatar
            size="medium"
            src="4.png"
          />
          <h1  class="select-none heading">
            DigitalTWINs on FHIR
          </h1>
        </n-flex>
      </RouterLink>
      <n-flex v-show="screenWidth > 699 ? true : false">
        <img class="logo" :src="logo" alt="">
      </n-flex>
    </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NAvatar, NGradientText} from 'naive-ui';
import logo from "@/assets/logo.png"
import {ref, onMounted, onUnmounted} from "vue"

const screenWidth = ref(window.innerWidth);

const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

.n-gradient-text {
  font-size: 25px;
}
.logo{
  width: 200px;
  height: auto;
}
.heading {
  font-family: 'Luckiest Guy';
  font-size: 3vmin;
  margin: 0;
  line-height: 1;
  letter-spacing: 3px;
  color: #71717a;
  text-align: center;
  text-shadow: 1px -1px #fafafa, -1px 1px #050505, -5px 5px 3px #80808080;
}
</style>