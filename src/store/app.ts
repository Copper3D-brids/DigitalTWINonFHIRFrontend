import { defineStore } from "pinia";
import { ref } from "vue";
import { IPatient, IRequests } from "@/models";

import { 
    usePatientsInfo 
} from "../plugins/api";

export const usePatientsInfoStore = defineStore("patientsInfo", () => {
    const patients = ref<IPatient[]>();
    const getPatients = async () => {
        patients.value = await usePatientsInfo();
    };

    return {
        patients,
        getPatients
    }
})