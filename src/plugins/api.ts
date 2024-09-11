import http from "./http";
import { IPatient, IOverall } from "@/models";


export async function usePatientsInfo() {
    const infos = http.get<IPatient[]>("/patients");
    return infos;
}

export async function useOverallInfo() {
    const infos = http.get<IOverall>("/overall");
    return infos;
}
