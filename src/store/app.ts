import { defineStore } from "pinia";
import { ref } from "vue";
import { IPatient, IPatientDetails, IOverall, IWorkflowToolProcessDetails } from "@/models";

import { 
    usePatientsInfo, 
    useOverallInfo,
    usePatientDetails,
    useWorkflowToolProcess
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

export const usePatientDetailsStore = defineStore("patientDetails", () => {
    const patientDetails = ref<IPatientDetails>();
    const getpatientDetails = async (uuid: string) => {
        patientDetails.value = await usePatientDetails(uuid);
    };

    return {
        patientDetails,
        getpatientDetails
    }
})

export const useWorkflowToolProcessStore = defineStore("workflowToolProcess", () => {
    const workflowToolProcess = ref<IWorkflowToolProcessDetails|null>();
    const getWorkflowToolProcess= async (uuid: string) => {
        workflowToolProcess.value = await useWorkflowToolProcess(uuid);
    };

    return {
        workflowToolProcess,
        getWorkflowToolProcess
    }
})