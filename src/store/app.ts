import { defineStore } from "pinia";
import { ref } from "vue";
import { IPatient, IRequests, IOverall } from "@/models";

import { 
    usePatientsInfo, 
    useOverallInfo
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

export const useOverallInfoStore = defineStore("overallInfo", () => {
    const overall = ref<IOverall>();
    const getOverall = async () => {
        overall.value = await useOverallInfo();
    };

    return {
        overall,
        getOverall
    }
})