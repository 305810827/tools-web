<template>
    <el-container>
        <span></span>
        <el-input v-model="inputVal" />
        <el-button @click="colorConvert">转换</el-button>
        <div>{{outputVal}}</div>
        <div :style="{width: '40px',height: '40px',backgroundColor: outputVal}"></div>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let inputVal = ref('')
let outputVal = ref('')

const isHexColor = (color:string) => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(color);
}

const isRGBColor = (color:string) => {
    const rgbColorRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
    return rgbColorRegex.test(color);
}

const colorConvert = () => {
    console.log(inputVal.value)
    if(isHexColor(inputVal.value)) {
        outputVal.value = colorRgb(inputVal.value)
    } else if(isRGBColor(inputVal.value)) {
        outputVal.value = colorRgb(inputVal.value)
    } else {
        outputVal.value = '输入颜色有误'
    }
    console.log(outputVal.value)
}
/*16进制转换为RGB颜色*/
const colorRgb = (colorStr:string) => {
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = colorStr.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值f
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};

/*RGB颜色转换为16进制*/
const colorHex = (rgbStr:string) => {
    //十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(rgbStr)) {
        const aColor = rgbStr.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = rgbStr;
        }
        return strHex;
    } else if (reg.test(rgbStr)) {
        const aNum = rgbStr.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return rgbStr;
        } else if (aNum.length === 3) {
            let numHex = "#";
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return rgbStr;
    }
};


</script>

<style scoped>

</style>