<template>
    <el-container>
        <el-header class="header">
            <p>工具箱</p>
        </el-header>
    </el-container>

    <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-message"></i>导航二</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <fileConvert></fileConvert>
    <!--            <el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--                <el-tab-pane label="文件转换" name="first">-->
    <!--                    <fileConvert></fileConvert>-->
    <!--                </el-tab-pane>-->
    <!--                <el-tab-pane label="颜色转换" name="second">-->
    <!--                    <colorConvert></colorConvert>-->
    <!--                </el-tab-pane>-->
    <!--            </el-tabs>-->
        </el-main>
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
.header {
    /*text-align: right;*/
    font-size: 16px;
    border-bottom: 1px solid var(--el-menu-border-color);
}
</style>