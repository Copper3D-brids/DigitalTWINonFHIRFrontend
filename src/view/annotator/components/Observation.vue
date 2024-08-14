<template>
    <div>
        <FormObservation v-if="destroy" v-for="d in uniqueDisplayObservations" :key="uuidv4()" :belongTo="patients" :filledData="JSON.parse(d)" disabled  @updateObservation="updateObservations" />
        <FormObservation :belongTo="patients"  @updateObservation="updateObservations"/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType } from "vue";
import FormObservation from "../components/FormObservation.vue";
import { IFormObservation, IAnnotatorFormDescription} from "@/models";
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    formDescription: Object as PropType<IAnnotatorFormDescription>,
    patients: {
        type: Array<String>,
        default: () => []
    }
    // patients: Array as PropType<Array<string>>
});

const emit = defineEmits();
const destroy = ref(true);
const displayObservations = ref<Array<string>>([]);

const uniqueDisplayObservations = computed(() => [...new Set(displayObservations.value)]);

watch(() => props.patients, (newVal) => {
  if(newVal!.length > 0){
    generateDisplayObservations();
  }
})

const updateObservations = (data: IFormObservation) => {
  if(data.operation === "add"){
      data.belongTo.forEach((p) => {
      const index = props.formDescription!.patients.findIndex((item) => item.name === p);
      props.formDescription!.patients[index].observations.push(data);
    })
  }else if (data.operation === "remove"){
    data.belongTo.forEach((p) => {
      const index = props.formDescription!.patients.findIndex((item) => item.name === p);
      props.formDescription!.patients[index].observations = props.formDescription!.patients[index].observations.filter((o) => JSON.stringify(o.observation) !== JSON.stringify(data.observation));
    })
  }
  generateDisplayObservations();
  emit('updateObservation', props.formDescription);
}

const generateDisplayObservations = () => {
  destroy.value = false;
  displayObservations.value = [];
  if (props.patients.length === 1){
    props.formDescription!.patients.forEach((p) => {
      if(props.patients.includes(p.name)){
        p.observations.forEach((o) => {
          displayObservations.value.push(JSON.stringify(o.observation));
        })
      }
    })
  } else if(props.patients.length > 1){
    let arrays:Array<Array<IFormObservation>> = [];
    props.formDescription!.patients.forEach((p) => {
      if(props.patients.includes(p.name)){
        arrays.push(p.observations);
      }
    })
    displayObservations.value = arrays.reduce((accumulator, currentValue) => {
      return accumulator.filter((o) => currentValue.map((c) => JSON.stringify(c.observation)).includes(JSON.stringify(o.observation)));
    }).map((o) => JSON.stringify(o.observation));
  }
  else{
    displayObservations.value = [];
  }
  destroy.value = true;
}



</script>

<style scoped>

</style>