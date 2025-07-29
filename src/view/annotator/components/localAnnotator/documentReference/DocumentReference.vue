<template>
    <div>
      <FormDocumentReference :belongTo="patients"  @updateDocumentReference="updateDocumentReference"/>
      <FormDocumentReference v-if="destroy" v-for="d in uniqueDisplayDocumentReference" :key="uuidv4()" :belongTo="patients" :filledData="JSON.parse(d)" disabled  @updateDocumentReference="updateDocumentReference" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType, onMounted } from "vue";
import FormDocumentReference from "./FormDocumentReference.vue";
import { IFormDocumentReference, IAnnotatorFormDescription} from "@/models";
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    formDescription: Object as PropType<IAnnotatorFormDescription>,
    patients: {
        type: Array<String>,
        default: () => []
    }
});

const emit = defineEmits();
const destroy = ref(true);
const displayDocumentReference = ref<Array<string>>([]);
const uniqueDisplayDocumentReference = computed(() => [...new Set(displayDocumentReference.value)]);

watch(() => props.patients, (newVal) => {
  if(newVal!.length > 0){
    generateDisplayDocumentReference();
  }
})

onMounted(() => {
  if(props.formDescription){
    generateDisplayDocumentReference();
  }
  console.log("FormObservation mounted with patients:", props.patients);
  
})

const updateDocumentReference = (data: IFormDocumentReference) => {
  if(data.operation === "add"){
      data.belongTo.forEach((p) => {
      const index = props.formDescription!.patients.findIndex((item) => item.name === p);
      props.formDescription!.patients[index].documentReference.push(data);
    })
  }else if (data.operation === "remove"){
    data.belongTo.forEach((p) => {
      const index = props.formDescription!.patients.findIndex((item) => item.name === p);
      props.formDescription!.patients[index].documentReference = props.formDescription!.patients[index].documentReference.filter((o) => JSON.stringify(o.documentReference) !== JSON.stringify(data.documentReference));
    })
  }
  generateDisplayDocumentReference();
  console.log("Updated formDescription:", props.formDescription);
  
  emit('updateDocumentReference', props.formDescription);
}

const generateDisplayDocumentReference = () => {
  destroy.value = false;
  displayDocumentReference.value = [];
  if (props.patients.length === 1){
    props.formDescription!.patients.forEach((p) => {
      if(props.patients.includes(p.name)){
        p.documentReference.forEach((o) => {
          displayDocumentReference.value.push(JSON.stringify(o.documentReference));
        })
      }
    })
  } else if(props.patients.length > 1){
    let arrays:Array<Array<IFormDocumentReference>> = [];
    props.formDescription!.patients.forEach((p) => {
      if(props.patients.includes(p.name)){
        arrays.push(p.documentReference);
      }
    })
    displayDocumentReference.value = arrays.reduce((accumulator, currentValue) => {
      return accumulator.filter((o) => currentValue.map((c) => JSON.stringify(c.documentReference)).includes(JSON.stringify(o.documentReference)));
    }).map((o) => JSON.stringify(o.documentReference));
  }
  else{
    displayDocumentReference.value = [];
  }
  destroy.value = true;
}



</script>

<style scoped>

</style>