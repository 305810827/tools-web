// import {runPython} from '../utils/runPython'
// import { Converter } from 'pdf2docx';
import * as fs from 'fs'
// @ts-ignore
import * as pdf from 'pdf-parse-fork/lib/pdf-parse';
// import * as mammoth from 'mammoth';
// import * as htmlDocx from 'html-docx-fixed';
import {resolve} from "path";
import {convertPdfToDocx} from '../utils/execLibreOffice'
export default defineEventHandler(async e=>{
    const { filename, fileType } = await readBody(e)
    console.log(filename, fileType, 'fileType')
    //
    // runPython('./python/word2pdf.py', '').then(() => {
    //     console.log('runPython')
    // })
    // const converter = new Converter();
    const pdfPath = resolve(`./server/file/${filename}`)
    const docxPath = resolve(`./server/file/${filename.replace('.pdf', `.${fileType || 'docx'}`)}`)

    fs.readFile(pdfPath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // if (fileType === 'docx') {
        //     convertPdfToDocx(pdfPath, resolve(`./server/file/`));
        // } else {
            // 解析PDF
            pdf.default(data).then((data: { text: any; }) => {
                const pdfText = data.text;
                let htmlContent = ''
                if (fileType === 'docx') {
                    htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${pdfText}</body></html>`;
                } else {
                    htmlContent = pdfText
                }
                // 将PDF文本转换为HTML
                // const docxAsBlob = htmlDocx.default.asBlob(htmlContent); // 转换为DOCX格式blob
                fs.writeFile(docxPath, Buffer.from(htmlContent, 'utf-8'), {
                    flag: 'w', // a：追加写入；w：覆盖写入
                }, (err) => {
                    if (err) {
                        console.error(err);
                        return {
                            flag: 'F',
                            message: err
                        }
                    } else {
                        console.log('The file has been saved!');
                        return {
                            flag: 'S',
                            message: "The file has been saved!"
                        }
                    }
                });
            });
        // }

    });

})