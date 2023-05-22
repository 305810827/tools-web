// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe'
export default {
    alias: {
        '@': resolve(__dirname, './'),
    },
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: '@import "@/assets/styles/vars.less";',
                },
            },
        },
    },
    modules: [
        '@element-plus/nuxt'
    ],
    elementPlus: { /** Options */ }
}
