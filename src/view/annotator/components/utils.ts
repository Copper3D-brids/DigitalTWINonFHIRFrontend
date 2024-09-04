import dicomParser from "dicom-parser";
import {IObservationValue} from "@/models";
import type { FormItemRule} from 'naive-ui';
import { format } from 'date-fns';
import yaml from 'js-yaml';


export const readDicom = (fileHandle: FileSystemFileHandle): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Obtain a File object from FileSystemFileHandle
            const file = await fileHandle.getFile();
            const arrayBuffer = await file.arrayBuffer(); // Read file as ArrayBuffer
    
            // Parse the DICOM file
            const byteArray = new Uint8Array(arrayBuffer);
            const dataSet = dicomParser.parseDicom(byteArray);
    
            resolve(dataSet);
        } catch (error) {
            reject(`Error reading DICOM file: ${error}`);
            throw new Error(`Error reading DICOM file: ${error}`);
        }
    });
}

export const readCWL = (fileHandle: FileSystemFileHandle): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Obtain a File object from FileSystemFileHandle
            let data;
            const file = await fileHandle.getFile();
            const text = await file.text(); // Read file as text
            // const data = JSON.parse(text);
            try {
                data = JSON.parse(text);
              } catch (jsonError) {
                // If JSON parsing fails, try parsing as YAML
                try {
                  data = yaml.load(text);
                } catch (yamlError) {
                  throw new Error('Error parsing YAML file: ' + yamlError);
                }
              }
              
            resolve(data);
        } catch (error) {
            reject(`Error reading CWL file: ${error}`);
            throw new Error(`Error reading CWL file: ${error}`);
        }
    });
}

type SNOMEDCTType = {
    [key: string]: {
        system: string,
        code: string,
        display: string
    }
}

export const SNOMEDCT:SNOMEDCTType = {
    "BREAST": {
        "system": "http://snomed.info/sct",
        "code": "76752008",
        "display": "Breast"
    }
}

export const SOP_CLASS_NAMES: { [uid: string]: string } = {
    "1.2.840.10008.5.1.4.1.1.1": "Computed Radiography Image Storage",
    "1.2.840.10008.5.1.4.1.1.2": "CT Image Storage",
    "1.2.840.10008.5.1.4.1.1.3.1": "Ultrasound Multi-frame Image Storage",
    "1.2.840.10008.5.1.4.1.1.4": "MR Image Storage",
    // Add more SOP Class UIDs and their names as needed
};

export const getObservationValueTypeFormat = (value: any): IObservationValue => {
    const now = new Date();
    const formattedDateTime = format(now, 'yyyy-MM-dd HH:mm:ss');
    const formattedTime = format(now, 'HH:mm:ss');
    const formattedDate = format(now, 'yyyy-MM-dd');
    let valueFormat:IObservationValue = {}
    switch (value) {
        case 'valueQuantity':
            valueFormat = {
                valueQuantity: {
                    value: '',
                    comparator: '',
                    unit: '',
                    system: 'http://unitsofmeasure.org',
                    code: ''
                }
            }
            break;
        case 'valueCodeableConcept':
            valueFormat = {
                valueCodeableConcept: {
                    coding: [{
                        system: '',
                        code: '',
                        display: ''
                    }],
                    text: ''
                }
            }
            break;
        case 'valueString':
            valueFormat = {
                valueString: ''
            }
            break;
        case 'valueBoolean':
            valueFormat = {
                valueBoolean: ''
            }
            break;
        case 'valueInteger':
            valueFormat = {
                valueInteger: ''
            }
            break;
        case 'valueRange':
            valueFormat = {
                valueRange: {
                    low: '',
                    high: ''
                }
            }
            break;
        case 'valueRatio':
            valueFormat = {
                valueRatio: {
                    numerator: {
                        value: '',
                        comparator: '',
                        unit: '',
                        system: 'http://unitsofmeasure.org',
                        code: ''
                    },
                    denominator: {
                        value: '',
                        comparator: '',
                        unit: '',
                        system: 'http://unitsofmeasure.org',
                        code: ''
                    }
                }
            }
            break;
        case 'valueSampledData':
            valueFormat = {
                valueSampledData: {
                    origin: '',
                    period: '',
                    factor: '',
                    lowerLimit: '',
                    upperLimit: '',
                    dimensions: '',
                    data: ''
                }
            }
            break;
        case 'valueTime':
            valueFormat = {
                valueTime: formattedDate
            }
            break;
        case 'valueDateTime':
            valueFormat = {
                valueDateTime: formattedDateTime
            }
            break;
        case 'valuePeriod':
            valueFormat = {
                valuePeriod: {
                    start: '',
                    end: ''
                }
            }
            break;
        default:
            valueFormat = {
                valueQuantity: {
                    value: '',
                    comparator: '',
                    unit: '',
                    system: 'http://unitsofmeasure.org',
                    code: ''
                }
            }
            break;
    }

    return valueFormat;
}

export const selectObservationValueOptions = [
    {
        label: 'valueQuantity',
        value: 'valueQuantity'
    },
    {
        label: 'valueCodeableConcept',
        value: 'valueCodeableConcept'
    },
    {
        label: 'valueString',
        value: 'valueString'
    },
    {
        label: 'valueBoolean',
        value: 'valueBoolean'
    },
    {
        label: 'valueInteger',
        value: 'valueInteger'
    },
    {
        label: 'valueRange',
        value: 'valueRange'
    },
    {
        label: 'valueRatio',
        value: 'valueRatio'
    },
    {
        label: 'valueSampledData',
        value: 'valueSampledData'
    },
    {
        label: 'valueTime',
        value: 'valueTime'
    },
    {
        label: 'valueDateTime',
        value: 'valueDateTime'
    },
    {
        label: 'valuePeriod',
        value: 'valuePeriod'
    }
]

const observationValueQuantityRules = {
    value: {
        required: true,
        // @ts-ignore
        validator(rule: FormItemRule, value: number) {
            if (Number.isNaN(Number(value))) {
                return new Error('Value is required Number')
            }
            return true
        },
        trigger: 'blur'
    },
    unit: {
        required: true,
        message: 'Please input the unit for the value',
        trigger: ['input', 'blur']
    },
    system:  {
        required: true,
        // @ts-ignore
        validator(rule: FormItemRule, value: string) {
            if (!value) {
                return new Error('Unit system is required')
            }
            return true
        },
        trigger: 'blur'
    },
    code: {
        required: true,
        // @ts-ignore
        validator(rule: FormItemRule, value: string) {

            if (!value) {
                return new Error('Unit code is required')
            }
            return true
        },
        trigger: 'blur'
    },
    comparator: {
        required: false,
        // @ts-ignore
        validator(rule: FormItemRule, value: string) {
            if (!!value) {
                if (value !== '<' && value !== '<=' && value !== '>=' && value !== '>') {
                    return new Error('Comparator must be <, <=, >=, or >')
                }
            }
            return true
        },
        trigger: 'blur'
    },
   }

const observationValueRules = {
   valueQuantity: observationValueQuantityRules,
   valueString: {
        required: true,
        // @ts-ignore
        validator(rule: FormItemRule, value: string) {
            if (!value) {
                return new Error('Value is required String')
            }
            return true
        },
        trigger: 'blur'
    },
    valueBoolean: {
        required: true,
        // @ts-ignore
        validator(rule: FormItemRule, value: string) {
            if (value !== "true" && value !== "false") {
                return new Error('Value is required Boolean')
            }
            return true
        },
        trigger: 'blur'
    },
    valueRange: {
        low: {
            required: false,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('Low is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
        high: {
            required: false,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('High is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
    },
    valueRatio: {
        numerator: observationValueQuantityRules,
        denominator: observationValueQuantityRules
    },
    valueSampledData: {
        origin: {
            required: true,
            // @ts-ignore
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('Origin is required')
                }
                return true
            },
            trigger: 'blur'
        },
        period: {
            required: true,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('Period is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
        factor: {
            required: false,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('Factor is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
        lowerLimit: {
            required: false,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('Lower Limit is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
        upperLimit: {
            required: false,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('Upper Limit is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
        dimensions: {
            required: true,
            // @ts-ignore
            validator(rule: FormItemRule, value: number) {
                if (Number.isNaN(Number(value))) {
                    return new Error('Dimensions is required Number')
                }
                return true
            },
            trigger: 'blur'
        },
        data: {
            required: false,
            // @ts-ignore
            validator(rule: FormItemRule, value: string) {
                if (typeof value !== 'string') {
                    return new Error('Data is required String')
                }
                return true
            },
            trigger: 'blur'
        },
    },
}

export const observationRules =  {
    observation: {
        value: observationValueRules,
        
        code: {
            required: true,
            // @ts-ignore
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('Observation Code is required')
                }
                return true
            },
            trigger: 'blur'
        },

        codeSystem: {
            required: true,
            // @ts-ignore
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('Observation codeSystem is required')
                }
                return true
            },
            trigger: 'blur'
        },
        },
      }