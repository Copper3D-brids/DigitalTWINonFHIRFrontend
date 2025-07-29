<template>
    <div>
        <n-h3>Edit dataset information:</n-h3>
        <n-form
            ref="formRef"
            inline
            :label-width="80"
            :model="formValue"
            size="medium"
        >
            <n-form-item label="UUID (optional)">
                <n-input v-model:value="formValue.uuid" placeholder="Input dataset UUID " />
            </n-form-item>
            <n-form-item label="Name">
                <n-input v-model:value="formValue.name" placeholder="Input dataset name" />
            </n-form-item>
            <n-form-item >
                <n-button strong secondary type="primary" @click="handleResetClick">
                    Reset
                </n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import { NForm, NFormItem, NInput, NH3, NButton} from 'naive-ui';

const uuid = defineModel('uuid')
const name = defineModel('name')

const originalUUID = ref(uuid.value)
const originalName = ref(name.value)


const formValue = ref({
    uuid: uuid,
    name: name
})

const handleResetClick = () =>{
    uuid.value = originalUUID.value
    name.value = originalName.value
}
</script>

<style scoped>

</style>