<template>
    <el-container style="height: 100vh; flex-direction: column;">
        <el-header class="header">
            <p>工具箱</p>
        </el-header>
        <el-container style="height: 100vh">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']">
                    <el-sub-menu index="1">
                        <template #title>
                            <i class="el-icon-message"></i>
                            工具栏
                        </template>

                        <el-menu-item-group>
                            <template #title>分组一</template>
                            <el-menu-item index="1-1"><NuxtLink to="/colorConvert">文件转换</NuxtLink></el-menu-item>
                            <el-menu-item index="1-2"><NuxtLink to="/fileConvert">颜色转换</NuxtLink></el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-main>
                <slot />
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
</script>
<style scoped>
.header {
    /*text-align: right;*/
    font-size: 16px;
    border-bottom: 1px solid var(--el-menu-border-color);
}
</style>