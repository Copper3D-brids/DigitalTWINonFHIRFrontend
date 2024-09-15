export interface IRequests {
    url: string,
    params: any,
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
    family:string | null;
    given: string[] | null;
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

export interface IResearchStudy {
    resourceType:"ResearchStudy";
    id:string;
    identifier:IIdentifier[];
    title: string;
    status: string;
    principalInvestigator: IReference;
    [key:string]: any;
}

export interface IPractitioner {
    resourceType:"Practitioner";
    id:string;
    identifier:IIdentifier[];
    name: IHumanName[] | null;
    gender?: string;
    [key:string]: any;
}

export interface ICode {
    system?: string;
    value?: string;
    display?: string;
    [key:string]: any;
}
export interface ICoding {
    coding?: ICode[];
    text?: string;
} 
interface IWorkflowAction{
    title:string;
    description:string;
    input: Array<{type:string}>;
    output: Array<{type:string, codeFilter: Array<{code: ICoding}>}>;
    definitionCanonical: string;
    [key:string]: any;
}
export interface Workflow {
    resourceType:"PlanDefinition";
    id:string;
    version:string;
    identifier:IIdentifier[];
    title:string;
    status:string;
    description:string;
    date:string;
    author: Array<{name:string}>;
    action: Array<IWorkflowAction>;
    purpose?:string;
    usage?:string;
    goal?: Array<{description:ICoding}>;
    [key:string]: any;
}

export interface WorkflowTool {
    resourceType:"ActivityDefinition";
    id:string;
    identifier:IIdentifier[];
    verison:string;
    name:string;
    title?:string;
    status:string;
    description?:string;
    [key:string]: any;
}

export interface IOverall {
    datasets: Array<IResearchStudy>,
    researchers: Array<IPractitioner>,
    patients: Array<IPatient>,
    workflows: Array<Workflow>,
    workflow_tools: Array<WorkflowTool>,
    [key:string]: any;
}

export interface IObservationValueQuantity {
    value: number|"";
    comparator?: "<" | "<=" | ">=" | ">" | "";
    unit: string;
    system: string;
    code: string;
}

export interface IObservationValueCodeableConcept {
    coding: Array<{
        system: string;
        code: string;
        display?: string;
    }>;
    text?: string;
}

export interface IObservationValueRange {
    low?: number|"";
    high?: number|"";
}

export interface IObservationValueRatio { 
    numerator?: IObservationValueQuantity;
    denominator?: IObservationValueQuantity;
}

export interface IObservationValueSampledData {
    origin: string;
    period: number|"";
    factor: number|"";
    lowerLimit: number|"";
    upperLimit: number|"";
    dimensions: number|"";
    data: string;
}

export interface IObservationValuePeriod {
    start: string;
    end: string;
}

export interface IObservationValue{
    valueQuantity?: IObservationValueQuantity;
    valueCodeableConcept?: IObservationValueCodeableConcept;
    valueString?: string;
    valueBoolean?: boolean|"";
    valueInteger?: number|"";
    valueRange?: IObservationValueRange;
    valueRatio?: IObservationValueRatio;
    valueSampledData?: IObservationValueSampledData;
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: IObservationValuePeriod;
}

export interface IAnnotatorObervation {
    value: IObservationValue;
    code: string;
    codeSystem: string;
    display: string;
    [key:string]: any;
}

export interface IAnnotatorImagingStudySeriesInstance {
    uid: string;
    sopClassUid: string;
    sopClassName: string;
    number: string;
    [key:string]: any;
}

export interface IAnnotatorImagingStudySeries {
    uid: string;
    name: string;
    endpointUrl: string;
    numberOfInstances: number;
    bodySite?: {
        system: string;
        code: string;
        display: string;
    };
    instances: Array<IAnnotatorImagingStudySeriesInstance>;
}

export interface IAnnotatorImagingStudy {
    path: string;
    endpointUrl: string;
    series: Array<IAnnotatorImagingStudySeries>;
    [key:string]: any;
}
  
export interface IAnnotatorPatient {
    id: string;
    uuid: string;
    name: string;
    path: string;
    observations: Array<IAnnotatorObervation>;
    imagingStudy: IAnnotatorImagingStudy|null;
}

export interface IAnnotatorDescription {
    dataset: {
        id: string;
        uuid: string;
        name: string;
        path: string;
    },
    patients: Array<IAnnotatorPatient>;
}

export interface IFormObservation {
        operation: 'add' | 'remove',
        belongTo: Array<String>,
        observationValueType: "valueQuantity" | "valueCodeableConcept" | "valueString" | "valueBoolean"| "valueInteger"| "valueRange"| "valueRatio"| "valueSampledData"| "valueTime"| "valueDateTime"| "valuePeriod";
        observation: IAnnotatorObervation,
}

export interface IAnnotatorFormPatient {
    id: string;
    uuid: string;
    name: string;
    path: string;
    observations: Array<IFormObservation>;
    imagingStudy: IAnnotatorImagingStudy|null;
}

export interface IAnnotatorFormDescription {
    dataset: {
        id: string;
        uuid: string;
        name: string;
        path: string;
    },
    patients: Array<IAnnotatorFormPatient>;
}

export interface ISelectedPatientsSamples {
    [key:string]: Array<string>;
}
