export interface IRequests {
    url: string;
    params: any;
}

export interface IIdentifier {
    systerm: string;
    value: string;
    [key:string]: any;
}

export interface IReference {
    display: string;
    reference: string;
}

export interface IHumanName {
    text: string | null;
    family:string[] | null;
    given: string | null;
    [key:string]: any;
}

export interface IPatient {
    resourceType:"Patient";
    id:string;
    identifier:IIdentifier[];
    generalPractitioner: IReference[];
    name: IHumanName[] | null;
    [key:string]: any;
}
