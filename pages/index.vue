<template>
    <el-container>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="文件转换" name="first">
                <fileConvert></fileConvert>
            </el-tab-pane>
            <el-tab-pane label="颜色转换" name="second">
                <colorConvert></colorConvert>
            </el-tab-pane>
        </el-tabs>
    </el-container>
</template>
<script lang="ts" setup>
import fileConvert from "./fileConvert/index.vue"
import colorConvert from "./colorConvert/index.vue"
const activeName = ref('first')
const handleClick = (val:string) => {
    console.log(val, 'handleClick')
}
</script>
<style scoped>

</style>