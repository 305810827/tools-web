/*RGB颜色转换为16进制*/
export default function colorHex(rgbStr) {
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
