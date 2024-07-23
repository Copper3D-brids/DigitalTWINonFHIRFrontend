import http from "./http";
import { IPatient } from "@/models";


export async function usePatientsInfo() {
    const infos = http.get<IPatient[]>("/patients");
    return infos;
}