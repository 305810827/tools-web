<template>
    <div class="container">
        <el-upload
                class="upload-demo"
                drag
                multiple
                :before-upload="beforeAvatarUpload"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>
        <el-button class="ml-3" type="success" @click="submitUpload($event)">
            upload to server
        </el-button>
        <el-button class="ml-3" type="success" @click="docx2pdf($event)">
            docs to pdf
        </el-button>
        <el-button class="ml-3" type="success" @click="pdf2docx('docx')">
            pdf to docx
        </el-button>
        <el-button class="ml-3" type="success" @click="pdf2docx('csv')">
            pdf to csv
        </el-button>
        <el-button class="ml-3" type="success" @click="pdf2docx('txt')">
            pdf to txt
        </el-button>
    </div>


</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadInstance } from 'element-plus'

let filename = '22'
let uploadFile: string | Blob | null = null
const beforeAvatarUpload = (file: any) => {
    let nameArr = file.name.split('.')
    filename = nameArr[0] + new Date().getTime() + '.' + nameArr[1]
    console.log(filename, 'filename')
    uploadFile = file
}

const submitUpload = async (event: MouseEvent) => {
    if(!uploadFile) return
    let formData = new FormData()
    // const { file: fileInfo, content } = file
    formData.append(filename, uploadFile)
    await useFetch('/api/uploadFile', {
        method: "POST",
        body: formData
    })
}

const docx2pdf = async (event: MouseEvent) => {
    console.log(filename, 'filename22')
    await useFetch('/api/word2pdf', {
        method: "POST",
        body: {
            filename
        }
    })
}
const pdf2docx = async (fileType: string) => {
    const res = await useFetch('/api/pdf2word', {
        method: "POST",
        body: {
            filename,
            fileType
        }
    })
    console.log(res)
}

</script>

<style scoped>
.container {
    padding: 50px 150px;

}
</style>