<template>
    <div class="flex flex-col md:flex-row  px-11 pb-2 pt-1 shadow-md m-2 shadow-zinc-400 rounded-md bg-gradient-to-r from-zinc-300 via-gray-200 to-stone-400 ">
        <n-form
            ref="formRef"
            inline
            :label-width="520"
            :model="formValue"
            :rules="documentReferenceRules"
            :size="size"
            :disabled="validateClicked"
            class="flex flex-col flex-wrap my-2 mr-auto ob-align-content-start"
        >   
            <n-form-item label="UUID (Optional)" class="form-width border shadow-fancy-1 border-zinc-300 rounded-lg py-2 px-2 my-4 ">
                <n-input v-model:value="formValue.documentReference.uuid" placeholder="uuid"/>
            </n-form-item>
            
            <div class="observation-form-item">
                <n-form-item label="Title" path="documentReference.title">
                    <n-input v-model:value="formValue.documentReference.title" placeholder="Model title" />
                </n-form-item>
                <n-form-item label="Url" path="documentReference.url" >
                    <n-input v-model:value="formValue.documentReference.url" placeholder="Model file endpoint url" />
                </n-form-item>
                <n-form-item label="ContentType" path="documentReference.contentType">
                    <n-input v-model:value="formValue.documentReference.contentType" placeholder="model/obj" />
                </n-form-item>
            </div>
        </n-form>
        <n-button @click="handleValidateClick" class="md:my-auto md:ml-10 my-3 rounded-md" :class="validateClicked?'shadow-fancy-3':'shadow-fancy-4'" strong :color="buttonColor" >
            <template #icon>
                <n-icon>
                    <AddIcon v-if="!validateClicked"/>
                    <CloseIcon v-else/>
                </n-icon>
            </template>
        </n-button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, PropType } from "vue";
import { NForm, NFormItem, NInput, NButton, NIcon, NAutoComplete } from 'naive-ui';
import { IAnnotatorDocumentReference, IFormDocumentReference } from "@/models";
import { documentReferenceRules } from "@/view/annotator/components/utils.ts";
import type { FormInst } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { useIcons } from "@/layout/composables/icons";

const props = defineProps({
    disabled: Boolean,
    filledData: Object as PropType<IAnnotatorDocumentReference>,
    belongTo: {
        type: Array<String>,
        default: () => []
    }
});

watch(() => props.belongTo, (newVal) => {
    if(!validateClicked.value)
        formValue.value.belongTo = newVal;
})

const emit = defineEmits();

const { AddIcon, CloseIcon } = useIcons();
const validateClicked = ref(false);
const buttonColor = ref('#10b981');

// const selectedValueTypes = ref<string>('valueQuantity');

const message = useMessage();
const formValue=ref<IFormDocumentReference>({
        operation: 'add',
        belongTo: props.belongTo!,
        documentReference:{
            uuid:"",
            url:"",
            contentType:"",
            title:""
        }
    });


onMounted(() => {
   if(!!props.filledData)
    init();
})

const init = ()=>{
    validateClicked.value = props.disabled;
    buttonColor.value = '#f43f5e';
    formValue.value.documentReference = props.filledData!;
}

const size = ref<'small' | 'medium' | 'large'>('large')


const formRef = ref<FormInst | null>(null)

const handleValidateClick = (e: MouseEvent) =>{
        e.preventDefault()
        if (validateClicked.value){
            formValue.value.operation = "remove";
            emit('updateDocumentReference', formValue.value);
            return;
        }
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('Valid')
            // buttonColor.value = '#f43f5e';
            formValue.value.operation = "add";
            emit('updateDocumentReference', formValue.value);
            // validateClicked.value = true;
            formValue.value = {
                operation: 'add',
                belongTo: props.belongTo!,
                documentReference: {
                    uuid: "",
                    url: "",
                    contentType: "",
                    title: ""
                }
              };
          }
          else {
            console.log(errors)
            message.error('Invalid')
          }
        })
      }
</script>

<style>
.observation-form-item{
    @apply flex flex-row flex-wrap px-3 pt-1 items-center border border-zinc-300 rounded-md shadow-md mt-2
}
.ob-align-content-start{
    align-content: start !important;
}
.n-dynamic-input-item__action{
    margin: auto 0 !important;
}
.form-width{
    width: 60% !important;
}

</style>