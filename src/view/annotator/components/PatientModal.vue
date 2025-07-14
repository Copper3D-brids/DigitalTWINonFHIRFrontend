<template>
    <div>
        <n-modal v-model:show="showPatientEditorModal">
            <n-card
                style="width: 60%"
                title="Annotate Patients' UUIDs"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
            >
                <n-form
                    ref="formRef"
                    :model="formModel"
                    label-placement="left"
                    require-mark-placement="right-hanging"
                    size="small"
                    label-width="auto"
                    :style="{
                        maxWidth: '640px',
                    }"
                >
                    <n-form-item v-for="p, i in formModel" :key="i" :label="p.name">
                        <n-input v-model:value="p.uuid" placeholder="uuid" />
                    </n-form-item>
                </n-form>

            </n-card>
        </n-modal>
    </div>
    
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { NModal, NCard, NForm, NFormItem, NInput } from 'naive-ui';

export interface IPatientFormValue {
    name: string;
    uuid: string
}

const showPatientEditorModal = defineModel<boolean>('modal')
const formModel = defineModel<Array<IPatientFormValue>>("patientsData")


</script>

<style scoped>

</style>