<template>
  <div id="themeConfig" :class="themeConfig">
<!--    <NuxtWelcome />-->
<!--      <NuxtLayout>-->
      <NuxtPage />
<!--      </NuxtLayout>-->
  </div>
</template>
<script lang="ts" setup>
import Cookies from 'js-cookie'
const themeConfig = useCookie<string>('theme-mode')

onMounted(() => {
    themeConfig.value = Cookies.get('theme-mode') || 'light'
})
</script>

<style lang="less" scoped>
#themeConfig {
  min-height: 100vh;
  background-color: @theme-color;
  padding:0;
  margin: 0;
}
</style>