import {runPython} from '../utils/runPython'
import * as fs from 'fs'
import {resolve} from 'path'
export default defineEventHandler(async e=>{

    const { method } = e.node.req;
// I THINK THE ISSUE IS HERE
    const body =
        method !== "GET" && method !== "HEAD"
            ? await readBody(e)
            : undefined;
    const {filename} = body
    // 重写py内容的文件名
    if (filename) {
        const path = resolve('./server/python/word2pdf.py')
        let content = fs.readFileSync(path, 'utf8')
        const reg = /file_name[^\n]+/
        content = content.replace(reg, `file_name = '${filename}'`)
        fs.writeFileSync(path, content) // 默认utf-8
        runPython('word2pdf.py', '').then(() => {
            console.log('runPython')
        })
    }


})