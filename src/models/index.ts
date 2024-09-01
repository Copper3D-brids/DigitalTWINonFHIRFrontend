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
