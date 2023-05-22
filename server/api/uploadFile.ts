import * as fs from 'fs';
export default defineEventHandler(async e=>{
    const { method } = e.node.req;
// I THINK THE ISSUE IS HERE
    const body =
        method !== "GET" && method !== "HEAD"
            ? await readMultipartFormData(e)
            : undefined;

    const opt = {
        flag: 'a', // a：追加写入；w：覆盖写入
    }
    // @ts-ignore
    let {data, name} = body[0]
    console.log(data, name)
    if (data && name) {
        fs.writeFile(`./server/file/${name}`, data, opt, (err) => {
            if (err) {
                console.error(err)
            }
        })
    }

})