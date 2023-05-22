import { exec, spawn } from 'child_process';
import pathe from "pathe";

export function runPython(filename: String, params: any) {
    return new Promise((resolve, reject) => {
        //console.log(name)
        if (!filename) {
            reject('python not find');
            return
        }
        let path = pathe.resolve('./server/python/' + filename)
        exec(path, function (error:any, stdout:any, stderr:any) {
            if (error) {
                console.info("stderr:" + stderr, error)
            } else {
                console.log("exec:" + stdout)
            }

        })
        // const process = spawn('python', [path, params]);
        // //结果输出,a.py为脚本文件，a,b为传递给脚本的参数
        // let out:any[] = []
        // process.stdout.on(
        //     'data',
        //     (data) => {
        //         out.push(data.toString());
        //         //logOutput('stdout')(data);
        //     }
        // );
        // //异常抛出
        // let err:any[] = []
        // process.stderr.on(
        //     'data',
        //     (data) => {
        //         err.push(data.toString());
        //         // logOutput('stderr')(data);
        //     }
        // );
        //
        // process.on('exit', (code, signal) => {
        //     // logOutput('exit')(`${code} (${signal})`)
        //     if (code !== 0) {
        //         reject(new Error(err.join('\n')))
        //         return
        //     }
        //     try {
        //         resolve(JSON.parse(out[0]));
        //     } catch(e) {
        //         reject(e);
        //     }
        // });
    });
}