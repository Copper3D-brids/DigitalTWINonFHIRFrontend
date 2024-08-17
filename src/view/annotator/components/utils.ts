import dicomParser from "dicom-parser";

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
    "1.2.840.10008.5.1.4.1.1.1": "CT Image Storage",
    "1.2.840.10008.5.1.4.1.1.2": "MR Image Storage",
    "1.2.840.10008.5.1.4.1.1.3": "US Image Storage",
    "1.2.840.10008.5.1.4.1.1.4": "NM Image Storage",
    "1.2.840.10008.5.1.4.1.1.5": "RT Image Storage",
    // Add more SOP Class UIDs and their names as needed
};