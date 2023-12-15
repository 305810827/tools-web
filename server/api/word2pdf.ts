// import {runPython} from '../utils/runPython'
// import * as fs from 'fs'
import {resolve} from 'path'
// @ts-ignore
import unoconv from 'node-unoconv';

// import { exec, spawn } from 'child_process';
export default defineEventHandler(async e=>{
    const body = await readMultipartFormData(e)
    console.log(body, 'body')
//     const { method } = e.node.req;
// // I THINK THE ISSUE IS HERE
//     const body =
//         method !== "GET" && method !== "HEAD"
//             ? await readBody(e)
//             : undefined;
//     const {filename} = body
//     // 重写py内容的文件名
//     if (filename) {
//         const path = resolve('./server/python/word2pdf.py')
//         let content = fs.readFileSync(path, 'utf8')
//         const reg = /file_name[^\n]+/
//         content = content.replace(reg, `file_name = '${filename}'`)
//         fs.writeFileSync(path, content) // 默认utf-8
//         runPython('word2pdf.py', '').then(() => {
//             console.log('runPython')
//         })
//     }
    const callback = (path: any, error: any) => {
        if (error) {
            console.error('Error', error);
            return;
        }

        console.log('Path:', path);
    };

    let input = resolve('./server/file/221685517939690.docx')
    console.log(input, 'input')
    unoconv.convert(input)
        .then((buffer: string | any[]) => {
            console.log(buffer.length);
        }).catch((err: any) => {
        console.error(err);
    });
    // let output = resolve('./server/file/221685517939690.pdf')
    // console.log(input)
    // unoconv.convert(input, {
    //     callback,
    //     output
    // });
})