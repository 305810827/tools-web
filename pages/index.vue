<template>
    <el-container class="container">
        <!-- <el-header class="header">
            <div>游戏搬砖教程</div>
            <div>包含梦幻西游</div>
        </el-header>
        <el-main class="main">
            <div>自动回复发货</div>
            <div>买到就是赚到</div>
        </el-main> -->
        <el-input v-model="inputVal" />
        <el-button @click="outputReport($event)">转换</el-button>
    </el-container>

</template>
<script lang="ts" setup>
let inputVal = ref('')

const outputReport = async (event: MouseEvent) => {
    console.log(inputVal.value)
    await useFetch('/api/stock/getStockList', {
        method: 'post',
        body: {
            filename: inputVal.value
        }
    })
}
</script>
<style scoped>
.container {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
}
</style>