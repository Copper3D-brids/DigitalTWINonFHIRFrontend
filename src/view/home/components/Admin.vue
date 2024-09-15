<template>
    <div class="flex-1 flex flex-col justify-evenly ">
        <div class="ml-10">
            <h1 class="text-lg font-semibold">Admin Access Verification</h1>
            <p>To access the admin page, please enter the passkey.</p>
        </div>
        <div class="flex justify-center items-center ">
            <OTPPad :length="6" :error-message="errorMesage" @entered="validatePasskey"/>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import OTPPad from './OTPPad.vue';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { encryptKey, decryptKey} from './utils';

const adminPasskey = import.meta.env.VITE_ADMIN_PASSKEY;

const encryptedKey = ref<string | null>('');
const localData = typeof window !== "undefined" ? window.localStorage.getItem('adminAccessKey') : null;
const errorMesage = ref<string>('');
const router = useRouter();

if(!!localData){
    const decryptedData = decryptKey(localData);
    const [role, key, timestamp] = decryptedData.split('-');
    if(role === 'admin'){
        const diff = Date.now() - parseInt(timestamp);
        if(diff < 1000 * 60 * 30){
            encryptedKey.value = key;
        }else{
            localStorage.removeItem('accessKey');
        }
    }
}

watchEffect(() => {
    if(encryptedKey.value){
        const decryptedKey = decryptKey(encryptedKey.value);
        if(decryptedKey === adminPasskey){
            router.push('/admin-fhir');
        }
    }
})

const validatePasskey = (passkey:string) => {
    if(passkey === adminPasskey){
        encryptedKey.value = encryptKey(passkey);
        localStorage.setItem('adminAccessKey', encryptKey('admin' + '-' + encryptedKey.value + '-'+ Date.now()));
        errorMesage.value = '';
    }else{
       errorMesage.value = "Invalid passkey, Please try again."
    }
}
</script>

<style scoped>

</style>