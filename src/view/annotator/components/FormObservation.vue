<template>
    <div class="flex px-11 shadow-xl m-1 shadow-cyan-100 rounded-md bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ">
        <n-form
            ref="formRef"
            inline
            :label-width="520"
            :model="formValue"
            :rules="rules"
            :size="size"
            :disabled="validateClicked"
            class="flex flex-wrap mt-2"
        >
            <n-form-item label="Value" path="observation.value">
                <n-input v-model:value="formValue.observation.value" placeholder="Input value" />
            </n-form-item>
            <n-form-item label="Units" path="observation.units">
                <n-input v-model:value="formValue.observation.units" placeholder="units for value" />
            </n-form-item>
            <n-form-item label="Code" path="observation.code">
                <n-input v-model:value="formValue.observation.code" placeholder="code for observation" />
            </n-form-item>
            <n-form-item label="Code System" path="observation.codeSystem">
                <n-auto-complete
                    v-model:value="formValue.observation.codeSystem"
                    placeholder="Input code system"
                    :options="codeSystemOptions"
                    :append="false"
                />
            </n-form-item>
            <n-form-item label="Units System" path="observation.unitsSystem">
                <n-auto-complete
                    v-model:value="formValue.observation.unitsSystem"
                    placeholder="Input units system"
                    :options="unitsSystemOptions"
                    :append="false"
                />
            </n-form-item>
        </n-form>
        <n-button @click="handleValidateClick" class="ml-auto my-auto" strong :color="buttonColor" >
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
import { NForm, NFormItem, NInput, NButton, NIcon, NAutoComplete} from 'naive-ui';
import { IFormObservation, IAnnotatorObervation } from "@/models";
import type { FormInst, FormItemRule} from 'naive-ui';
import { useMessage } from 'naive-ui';
import { useIcons } from "@/layout/composables/icons";

const props = defineProps({
    disabled: Boolean,
    filledData: Object as PropType<IAnnotatorObervation>,
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

const message = useMessage();
const formValue=ref<IFormObservation>({
        operation: 'add',
        belongTo: props.belongTo!,
        observation: {
          value: '',
          code: '',
          units: '',
          codeSystem: '',
          unitsSystem: 'http://unitsofmeasure.org',
        },
      });

onMounted(() => {
   if(!!props.filledData)
    init();
})

const init = ()=>{
    validateClicked.value = props.disabled;
    buttonColor.value = '#f43f5e';
    formValue.value.observation = props.filledData!;    
}

const codeSystemOptions = ['http://loinc.org', 'http://snomed.info/sct', 'http://dicom.nema.org/resources/ontology/DCM'].map((suffix) => {
          return {
            label: suffix,
            value: suffix
          }
        });
const unitsSystemOptions = ['http://unitsofmeasure.org'].map((suffix) => {
          return {
            label: suffix,
            value: suffix
          }
        });

const size = ref<'small' | 'medium' | 'large'>('large')

// @ts-ignore
const rules =  {
    observation: {
            value: {
                required: true,
                // @ts-ignore
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('Value is required')
                    }
                    return true
                },
                trigger: 'blur'
            },

            code: {
                required: true,
                // @ts-ignore
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('Code is required')
                    }
                    return true
                },
                trigger: 'blur'
            },

            codeSystem: {
                required: true,
                // @ts-ignore
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('codeSystem is required')
                    }
                    return true
                },
                trigger: 'blur'
            },
            
            units: {
                required: true,
                message: 'Please input the units for the value',
                trigger: ['input', 'blur']
            }
        },
      }
const formRef = ref<FormInst | null>(null)

const handleValidateClick = (e: MouseEvent) =>{
        e.preventDefault()
        if (validateClicked.value){
            formValue.value.operation = "remove";
            emit('updateObservation', formValue.value);
            return;
        }
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('Valid')
            // buttonColor.value = '#f43f5e';
            formValue.value.operation = "add";
            emit('updateObservation', formValue.value);
            // validateClicked.value = true;
            formValue.value = {
                operation: 'add',
                belongTo: props.belongTo!,
                observation: {
                  value: '',
                  code: '',
                  units: '',
                  codeSystem: '',
                  unitsSystem: 'http://unitsofmeasure.org',
                },
              };
          }
          else {
            console.log(errors)
            message.error('Invalid')
          }
        })
      }
</script>

<style scoped>

</style>