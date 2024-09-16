import http from "./http";
import { IPatient, IOverall, IPatientDetails } from "@/models";


export async function usePatientsInfo() {
    const infos = http.get<IPatient[]>("/patients");
    return infos;
}

export async function useOverallInfo() {
    const infos = http.get<IOverall>("/overall");
    return infos;
}

export async function usePatientDetails(uuid: string) {
    const infos = http.get<IPatientDetails>(`/patient/details/${uuid}`);
    return infos;
}