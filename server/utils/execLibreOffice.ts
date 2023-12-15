import { exec } from "child_process";
export const convertPdfToDocx = (pdfFilePath: string, outputFilePath: string) => {
    const cmd = `soffice --headless --convert-to docx --outdir "${outputFilePath}" "${pdfFilePath}"`;

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};