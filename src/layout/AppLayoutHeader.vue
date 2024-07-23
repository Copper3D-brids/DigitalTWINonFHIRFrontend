<template>
    <n-flex justify="space-between" align="center" style="height: 100%; padding: 2px 20px;">
      <RouterLink to="/">
        <n-flex class="cursor-pointer">
          <n-avatar
            size="medium"
            src="4.png"
          />
          <n-gradient-text type="info" class="select-none">
            DigitalTWIN on FHIR
          </n-gradient-text>
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
.n-gradient-text {
  font-size: 25px;
}
.logo{
  width: 200px;
  height: auto;
}
</style>