<template>
    <div class="flex flex-col md:flex-row  px-11 pb-2 pt-1 shadow-md m-2 shadow-zinc-400 rounded-md bg-gradient-to-r from-zinc-300 via-gray-200 to-stone-400 ">
        <n-form
            ref="formRef"
            inline
            :label-width="520"
            :model="formValue"
            :rules="observationRules"
            :size="size"
            :disabled="validateClicked"
            class="flex flex-col flex-wrap mt-2 mr-auto ob-align-content-start"
        >   
            <n-form-item label="ValueType" class="border shadow-fancy-2 border-zinc-300 rounded-lg px-3">
                <n-select v-model:value="formValue.observationValueType" :options="selectObservationValueOptions" @update:value="handleSelectObservationValueTypeUpdate"  class="w-full md:w-96"/>
            </n-form-item>
            
            <div v-if="formValue.observationValueType==='valueQuantity'?true:false" class="observation-form-item">
                <n-form-item label="Value" path="observation.value.valueQuantity.value">
                    <n-input v-model:value="formValue.observation.value.valueQuantity.value" placeholder="Numerical value (with implicit precision)" />
                </n-form-item>
                <n-form-item label="Unit" path="observation.value.valueQuantity.unit">
                    <n-input v-model:value="formValue.observation.value.valueQuantity.unit" placeholder="Unit representation" />
                </n-form-item>
                <n-form-item label="Unit Code" path="observation.value.valueQuantity.code">
                    <n-input v-model:value="formValue.observation.value.valueQuantity.code" placeholder="Coded form of the unit" />
                </n-form-item>
                <n-form-item label="Unit System" path="observation.value.valueQuantity.system">
                <n-auto-complete
                    v-model:value="formValue.observation.value.valueQuantity.system"
                    placeholder="System that defines coded unit form"
                    :options="unitSystemOptions"
                    :append="false"
                />
                </n-form-item>
                <n-form-item label="Comparator (Optional)" path="observation.value.valueQuantity.comparator">
                    <n-input v-model:value="formValue.observation.value.valueQuantity.comparator" placeholder="< | <= | >= | >" />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueCodeableConcept' && !props.filledData ? true : false" class="observation-form-item">
                <n-dynamic-input v-model:value="formValue.observation.value.valueCodeableConcept.coding" :on-create="onObValueCodeableCreate">
                    <template #create-button-default>
                    Add whatever you want
                    </template>
                    <template #default="{ value }">
                    <div style="display: flex; align-items: center; width: 100%">
                        <n-form-item label="Code">
                            <n-input v-model:value="value.code" type="text" placeholder="code"/>
                        </n-form-item>
                        <n-form-item label="System" class="ml-2">
                            <n-input v-model:value="value.system" type="text" placeholder="system for code"/>
                        </n-form-item>
                        <n-form-item label="Display (Optional)" class="ml-2">
                            <n-input v-model:value="value.display" type="text" placeholder="discription"/>
                        </n-form-item>
                    </div>
                    </template>
                </n-dynamic-input>
                <n-form-item label="Text" >
                    <n-input v-model:value="formValue.observation.value.valueCodeableConcept.text" type="text" />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueCodeableConcept' && !!props.filledData && representCodeableConcept ? true : false" class="observation-form-item">
                <div style="display: flex; align-items: center; width: 100%" v-for="c in formValue.observation.value.valueCodeableConcept.coding" :key="uuidv4()">
                    <n-form-item label="Code">
                        <n-input v-model:value="c.code" type="text"/>
                    </n-form-item>
                    <n-form-item label="System" class="ml-2">
                        <n-input v-model:value="c.system"  type="text"/>
                    </n-form-item>
                    <n-form-item label="Display (Optional)" class="ml-2">
                        <n-input v-model:value="c.display"  type="text"/>
                    </n-form-item>
                </div>
                <n-form-item label="Text" >
                    <n-input v-model:value="formValue.observation.value.valueCodeableConcept.text" type="text" />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueString' ? true : false" class="observation-form-item">
                <n-form-item label="Value" path="observation.value.valueString">
                    <n-input v-model:value="formValue.observation.value.valueString" placeholder="String value" type="text"/>
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueBoolean' ? true : false" class="observation-form-item">
                <n-form-item label="Value" path="observation.value.valueBoolean">
                    <n-input v-model:value="formValue.observation.value.valueBoolean" placeholder="Boolean value" />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueRange' ? true : false" class="observation-form-item">
                <n-form-item label="Low Value" path="observation.value.valueRange.low">
                    <n-input v-model:value="formValue.observation.value.valueRange.low" placeholder="Number value" />
                </n-form-item>
                <n-form-item label="High Value" path="observation.value.valueRange.high">
                    <n-input v-model:value="formValue.observation.value.valueRange.high" placeholder="Number value" />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueRatio' ? true : false" class="observation-form-item w-full">
                <n-tabs default-value="numerator" size="large" justify-content="space-evenly">
                    <n-tab-pane name="numerator" tab="Ratio numerator">
                        <n-form-item label="Value" path="observation.value.valueRatio.numerator.value">
                            <n-input v-model:value="formValue.observation.value.valueRatio.numerator.value" placeholder="Numerical value (with implicit precision)" />
                        </n-form-item>
                        <n-form-item label="Unit" path="observation.value.valueRatio.numerator.unit">
                            <n-input v-model:value="formValue.observation.value.valueRatio.numerator.unit" placeholder="Unit representation" />
                        </n-form-item>
                        <n-form-item label="Unit Code" path="observation.value.valueRatio.numerator.code">
                            <n-input v-model:value="formValue.observation.value.valueRatio.numerator.code" placeholder="Coded form of the unit" />
                        </n-form-item>
                        <n-form-item label="Unit System" path="observation.value.valueRatio.numerator.system">
                        <n-auto-complete
                            v-model:value="formValue.observation.value.valueRatio.numerator.system"
                            placeholder="System that defines coded unit form"
                            :options="unitSystemOptions"
                            :append="false"
                        />
                        </n-form-item>
                        <n-form-item label="Comparator (Optional)" path="observation.value.valueRatio.numerator.comparator">
                            <n-input v-model:value="formValue.observation.value.valueRatio.numerator.comparator" placeholder="< | <= | >= | >" />
                        </n-form-item>
                    </n-tab-pane>
                    <n-tab-pane name="denominator" tab="Ratio denominator">
                        <n-form-item label="Value" path="observation.value.valueRatio.denominator.value">
                            <n-input v-model:value="formValue.observation.value.valueRatio.denominator.value" placeholder="Numerical value (with implicit precision)" />
                        </n-form-item>
                        <n-form-item label="Unit" path="observation.value.valueRatio.denominator.unit">
                            <n-input v-model:value="formValue.observation.value.valueRatio.denominator.unit" placeholder="Unit representation" />
                        </n-form-item>
                        <n-form-item label="Unit Code" path="observation.value.valueRatio.denominator.code">
                            <n-input v-model:value="formValue.observation.value.valueRatio.denominator.code" placeholder="Coded form of the unit" />
                        </n-form-item>
                        <n-form-item label="Unit System" path="observation.value.valueRatio.denominator.system">
                        <n-auto-complete
                            v-model:value="formValue.observation.value.valueRatio.denominator.system"
                            placeholder="System that defines coded unit form"
                            :options="unitSystemOptions"
                            :append="false"
                        />
                        </n-form-item>
                        <n-form-item label="Comparator (Optional)" path="observation.value.valueQuantity.comparator">
                            <n-input v-model:value="formValue.observation.value.valueRatio.denominator.comparator" placeholder="< | <= | >= | >" />
                        </n-form-item>
                    </n-tab-pane>
                </n-tabs>
            </div>

            <div v-if="formValue.observationValueType==='valueSampledData' ? true : false" class="observation-form-item">
                <n-form-item label="Origin" path="observation.value.valueSampledData.origin">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.origin" placeholder="Zero value and units" />
                </n-form-item>
                <n-form-item label="Period" path="observation.value.valueSampledData.period">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.period" placeholder="Number of milliseconds between samples" />
                </n-form-item>
                <n-form-item label="Factor (Optional)" path="observation.value.valueSampledData.factor">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.factor" placeholder="Multiply data by this before adding to origin" />
                </n-form-item>
                <n-form-item label="Lower Limit (Optional)" path="observation.value.valueSampledData.lowerLimit">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.lowerLimit" placeholder="Lower limit of detection" />
                </n-form-item>
                <n-form-item label="Upper Limit (Optional)" path="observation.value.valueSampledData.upperLimit">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.upperLimit" placeholder="Upper limit of detection" />
                </n-form-item>
                <n-form-item label="Dimensions" path="observation.value.valueSampledData.dimensions">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.dimensions" placeholder="Number of sample points at each time point" />
                </n-form-item>
                <n-form-item label="Data (Optional)" path="observation.value.valueSampledData.data">
                    <n-input v-model:value="formValue.observation.value.valueSampledData.data" placeholder="Decimal values with spaces, or `E` | `U` | `L`" />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueTime' ? true : false" class="observation-form-item">
                <n-form-item label="Date" path="observation.value.valueTime">
                    <n-date-picker
                        v-model:formatted-value="formValue.observation.value.valueTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        clearable
                    />
                    
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valueDateTime' ? true : false" class="observation-form-item">
                <n-form-item label="DateTime" path="observation.value.valueDateTime">
                    <n-date-picker
                        v-model:formatted-value="formValue.observation.value.valueDateTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        clearable
                    />
                </n-form-item>
            </div>

            <div v-if="formValue.observationValueType==='valuePeriod' ? true : false" class="observation-form-item">
                <n-date-picker
                    v-model:value="datetimerange"
                    :disabled="disabled"
                    type="datetimerange"
                    @blur="onValuePeriodBlur"
                    @confirm="onValuePeriodConfirm"
                />
            </div>

            <div class="observation-form-item">
                <n-form-item label="Observation Code" path="observation.code">
                    <n-input v-model:value="formValue.observation.code" placeholder="code for observation" />
                </n-form-item>
                <n-form-item label="Display" path="observation.display">
                    <n-input v-model:value="formValue.observation.display" placeholder="display for observation code" />
                </n-form-item>
                <n-form-item label="Observation Code System" path="observation.codeSystem">
                    <n-auto-complete
                        v-model:value="formValue.observation.codeSystem"
                        placeholder="Input code system"
                        :options="codeSystemOptions"
                        :append="false"
                    />
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
import { NForm, NFormItem, NInput, NButton, NIcon, NAutoComplete, NSelect, NDynamicInput, NTabPane, NTabs, NDatePicker  } from 'naive-ui';
import { IFormObservation, IAnnotatorObervation } from "@/models";
import type { FormInst } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { useIcons } from "@/layout/composables/icons";
import {getObservationValueTypeFormat, selectObservationValueOptions, observationRules} from "./utils";
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const props = defineProps({
    disabled: Boolean,
    selectedObservationValueType: String,
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
const representCodeableConcept = ref(false);
const datetimerange = ref<Date[]>();

// const selectedValueTypes = ref<string>('valueQuantity');

const message = useMessage();
const formValue=ref<IFormObservation>({
        operation: 'add',
        belongTo: props.belongTo!,
        observationValueType: !!props.selectedObservationValueType ? props.selectedObservationValueType as any : 'valueQuantity',
        observation:  {
          value: !!props.selectedObservationValueType ? getObservationValueTypeFormat(props.selectedObservationValueType) : {
            valueQuantity: {
              value: '',
              comparator: '',
              unit: '',
              system: 'http://unitsofmeasure.org',
              code: ''
            }
          },
          code: '',
          display: '',
          codeSystem: '',
        }
    });

const onValuePeriodBlur = () => {
        message.success('Successfully picked a period!');
      }
const onValuePeriodConfirm = (value: number[]) => {
    formValue.value.observation.value.valuePeriod!.start = format(value[0], 'yyyy-MM-dd HH:mm:ss');
    formValue.value.observation.value.valuePeriod!.end = format(value[1], 'yyyy-MM-dd HH:mm:ss');
}

const onObValueCodeableCreate = () => {

       formValue.value.observation.value.valueCodeableConcept!.coding.push({
          code: '',
          system: '',
          display: ''
        });
        
        return formValue.value.observation.value.valueCodeableConcept!.coding[formValue.value.observation.value.valueCodeableConcept!.coding.length - 1];
      };
    

const handleSelectObservationValueTypeUpdate = (value: string) => {
    formValue.value.observation.value = getObservationValueTypeFormat(value);
}

onMounted(() => {
   if(!!props.filledData)
    init();
})

const init = ()=>{
    validateClicked.value = props.disabled;
    buttonColor.value = '#f43f5e';
    formValue.value.observation = props.filledData!;   
    formValue.value.observationValueType === "valueCodeableConcept" ? representCodeableConcept.value = true : representCodeableConcept.value = false;
    if(formValue.value.observationValueType === 'valuePeriod'){
        datetimerange.value = [new Date(formValue.value.observation.value.valuePeriod!.start), new Date(formValue.value.observation.value.valuePeriod!.end)];
    }
     
}

const codeSystemOptions = ['http://loinc.org', 'http://snomed.info/sct', 'http://dicom.nema.org/resources/ontology/DCM'].map((suffix) => {
          return {
            label: suffix,
            value: suffix
          }
        });
const unitSystemOptions = ['http://unitsofmeasure.org'].map((suffix) => {
          return {
            label: suffix,
            value: suffix
          }
        });

const size = ref<'small' | 'medium' | 'large'>('large')


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
            if(formValue.value.observationValueType === 'valueCodeableConcept'){
                formValue.value.observation.value.valueCodeableConcept!.coding = formValue.value.observation.value.valueCodeableConcept!.coding.filter((c) => c.code !== '' && c.system !== '');
            }
            emit('updateObservation', formValue.value);
            // validateClicked.value = true;
            formValue.value = {
                operation: 'add',
                belongTo: props.belongTo!,
                observationValueType: 'valueQuantity',
                observation: {
                  value: {
                    valueQuantity: {
                        value: '',
                        comparator: '',
                        unit: '',
                        system: 'http://unitsofmeasure.org',
                        code: ''
                    }
                  },
                  code: '',
                  display: '',
                  codeSystem: '',
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
</style>