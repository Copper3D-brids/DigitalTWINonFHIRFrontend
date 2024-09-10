<template>
    
    <div class="flex flex-col justify-around gap-3">
        <div ref="container" class="flex gap-4 items-center flex-wrap">
            <input v-for="n in length" :key="n" 
            @keyup="(e) => handleEnter(e, n-1)"
            v-model="otpArr[n-1]" type="text" maxlength="1" class="border-4 border-gray-300 shadow-sm focus:border-zinc-400 focus:outline-none rounded-md size-14 xl:size-20 font-extrabold text-2xl p-2 text-center caret-transparent"/>
        </div>
        <div>
            <p v-if="hasError" class="text-red-500">{{ otpProps.errorMessage }}</p>
        </div>
        <div>
            <NButton type="primary" block strong class="rounded-lg" @click="validateOTP">
                Enter Admin Passkey
            </NButton>
        </div>
    </div>
    
    
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { NButton } from 'naive-ui';

const otpProps = defineProps({
    length: {
        type: Number,
        default: 4
    },
    errorMessage: {
        type: String,
        default: ''
    }
});

const optEmits = defineEmits(['entered']);

const otpArr = ref<any>([])
const container = ref<HTMLDivElement>()

onMounted(() => {
    const children = container.value!.children;
    otpArr.value = Array(otpProps.length).fill(undefined);
    (children[0] as HTMLInputElement).focus();
    
    for(let i = 0;  i < children.length; i++){
        const child = children[i] as HTMLInputElement;
        child.addEventListener('focus', selectInputValue);
    }
})

const hasError = computed(() => {
    return otpProps.errorMessage !== '';
})

const handleEnter = (e:KeyboardEvent, i:number) => {  
    const children = container.value!.children;
    const keypressed = e.key;
    

    if (i > 0 && (keypressed === 'Backspace' || keypressed === 'Delete') && !otpArr.value[i] && children[i-1] ) {
        otpArr.value[i] = undefined;
        (children[i-1] as HTMLInputElement).focus();
    } else {
        const matched = keypressed.match(/^[0-9]$/);

        if (!matched) {
            if (keypressed === 'Enter') {
                validateOTP();
                return;
            }
            otpArr.value[i] = undefined;
            return;
        }else if(i < otpProps.length - 1){
            (children[i+1] as HTMLInputElement).focus();
            otpArr.value[i] = keypressed;
        }else{
            checkOTP();
        } 
        
    }

}

const validateOTP = () => {
    checkOTP();
    const filledValues = otpArr.value.filter((v:any) => v != null);
    if (filledValues.length === otpProps.length) {
        optEmits('entered', otpArr.value.join(''));
    }
}

const checkOTP = () => {
    const children = container.value!.children;
    let passCount = 0;
    for (let i = 0; i < otpProps.length; i++) {
        if (!isNumber(otpArr.value[i])) {
            children[i].classList.add('border-red-500');
        }else{
            children[i].classList.remove('border-red-500');
            passCount++;
        }
    }     
    return passCount === otpProps.length;
}

const selectInputValue = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
        // target.select();
    }
}

const isNumber = (value: any) => {

  const number = Number(value);
  
  return !isNaN(number) && isFinite(number);
}


onUnmounted(() => {
    if (!container.value) return;
    const children = container.value!.children;
    for(let i = 0;  i < children.length; i++){
        const child = children[i] as HTMLInputElement;
        child.removeEventListener('focus', selectInputValue);
    }
})
</script>

<style scoped>

</style>