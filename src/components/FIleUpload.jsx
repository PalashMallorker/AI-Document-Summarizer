
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';
import { useState } from 'react';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;


const FileUpload = ({ onExtract }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        if(uploadedFile.type === 'application/pdf'){
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let extractedText = '';
                for(let i =1; i<= pdf.numPages;i++){
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join('');
                    extractedText += pageText + '\n';
                }
                onExtract(extractedText);
            };
            fileReader.readAsArrayBuffer(uploadedFile);

        } 
        // else if(uploadedFile.type === 'text/plain'){


        // } 
        else {
            alert('unsupported File Type:-' + uploadedFile.type);
        }
    }

    return(
        <div className='flex flex-col gap-2 p-4'>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default FileUpload;