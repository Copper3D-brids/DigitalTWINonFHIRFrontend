<template>
   <n-steps class="main p-2" :vertical="['md', 'lg', 'xl', '2xl', '3xl'].includes(screenSize)?false:true" :current="current" :status="currentStatus">
      <n-step title="Select the dataset">
        <div class="n-step-description">
            <div class="content">
                <n-select v-model:value="singleValue" :options="datasetOptions" :disabled="current === 1 ? false : true"/>
            </div>
          {{ singleValue }}
            <n-button
                v-if="current === 1"
                :type="buttonType"
                size="small"
                class="btn"
                @click="handleButtonClick"
            >
                Next
            </n-button>
        </div>
      </n-step>
      <n-step title="Select the primary measurements">
        <div class="n-step-description">
          <p>When I find myself in times of trouble Mother Mary comes to me</p>
          <n-button
            v-if="current === 2"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
      <n-step title="Come Together">
        <div class="n-step-description">
          <p>Here come old flat top He come grooving up slowly</p>
          <n-button
            v-if="current === 3"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
      <n-step title="Something">
        <div class="n-step-description">
          <p>Something in the way she moves Attracts me like no other lover</p>
          <n-button
            v-if="current === 4"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
    </n-steps>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { StepsProps } from 'naive-ui'
import { NSteps, NStep, NButton, NRadioGroup, NRadioButton, NSelect } from 'naive-ui';

defineProps({
    screenSize: {
        type: String,
        default: 'md'
    }
})

const current = ref(1)
const currentStatus = ref<StepsProps['status']>('process')
const singleValue = ref('Selecting...')
const datasetOptions = [
    {
        label: 'Dataset 1',
        value: 'uuid-1'
    },
    {
        label: 'Dataset 2',
        value: 'uuid-2'
    },
]

const buttonType = computed(() => {
    switch (currentStatus.value) {
    case 'error':
        return 'error'
    case 'finish':
        return 'success'
    default:
        return 'default'
    }
})

const handleButtonClick = () => {
        current.value = (current.value % 4) + 1
      }
</script>

<style scoped>
@import '@/assets/css/google-front.css';

.main {
    font-family: 'Poppins', sans-serif;
    overflow: auto;
}

.n-step-description {
    @apply border border-gray-200 p-2 py-3 rounded-lg flex flex-col justify-between;
}
.content {
    @apply my-3;
}
.btn {
    @apply rounded-lg;
}
</style>