<template>
    <div class="w-full h-full">
        <canvas class="canvas-3d" :class="props.class" ref="ref3d" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Application } from '@splinetool/runtime';
const props = defineProps({
   url: {
    type: String,
    default: ''
   },
   class: {
    type: String,
    default: ''
   }
});
const emit = defineEmits();
const ref3d = ref<HTMLCanvasElement>();

const init3dModel = () => {

  const spline = new Application(ref3d.value as HTMLCanvasElement);

  spline.load(props.url).then(() => {
    // spline._camera!.position.set(0, 0, 600);
    // spline.controls.orbitControls.enableZoom = false;
    // console.log("loaded", spline);
    emit('loaded', spline);
    
  })
}

onMounted(async () => {
  init3dModel()
})
</script>

<style scoped>

</style>