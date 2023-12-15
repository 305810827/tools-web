import * as fs from 'fs';
export default defineEventHandler(async e=>{
    const { method } = e.node.req;
// I THINK THE ISSUE IS HERE
    const body =
        method !== "GET" && method !== "HEAD"
            ? await readMultipartFormData(e)
            : undefined;

    const opt = {
        flag: 'w', // a：追加写入；w：覆盖写入
    }
    // @ts-ignore
    let {data, name} = body[0]
    // @ts-ignore
    const fileName = encodeURIComponent(name); // 将文件名转换为指定的编码格式，例如GBK
    if (data && fileName) {
        fs.writeFile(`./server/file/${fileName}`, data,  opt, (err) => {
            if (err) {
                console.error(err)
                return {
                    flag: "F"
                }
            } else {
                return {
                    flag: "S"
                }
            }
        })
    }
})