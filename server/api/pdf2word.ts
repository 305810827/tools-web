import {runPython} from '../utils/runPython'
export default defineEventHandler(async e=>{


    runPython('./python/word2pdf.py', '').then(() => {
        console.log('runPython')
    })

})