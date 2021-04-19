<template>
  <div class="style">
    <img :src="akLogoImgSrc" class="akLogo">
    <div class="title">明日方舟签名生成器</div>
    <div class="subtitle">Beta</div>
    <div class="authInfo" @click="ngaIDClick">游佐@NGA</div>
    <img :src="wbLogoImgSrc" class="wbLogo" @click="wbClick">
    <img :src="twLogoImgSrc" class="twLogo" @click="twClick">
  </div>
</template>

<script>
export default {
  data () {
    return {
      akLogoImgSrc: '/static/image/other/logo_ak.png',
      wbLogoImgSrc: '/static/image/other/logo_wb.png',
      twLogoImgSrc: '/static/image/other/logo_tw.png',
      ngaAdress: 'https://bbs.nga.cn/nuke.php?func=ucp&uid=9958269',
      wbAdress: 'https://weibo.com/u/6011086915',
      twAdress: 'https://twitter.com/su_larry'
    }
  },
  methods: {
    ngaIDClick () {
      window.open(this.ngaAdress, '_blank')
    },
    wbClick () {
      window.open(this.wbAdress, '_blank')
    },
    twClick () {
      window.open(this.twAdress, '_blank')
    }
  }
}
</script>

<style scoped>
  .style {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    background-color: rgba(50, 50, 50, 0.75);
  }
  .title {
    font-size: 22px;
    font-weight: 200;
    letter-spacing: 3px;
    margin-left: 25px;
  }
  .subtitle {
    font-size: 10px;
    font-weight: 100;
    margin-left: 8px;
    margin-top: 12px;
    opacity: 0.5;
  }
  .authInfo {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1px;
    margin-left: auto;
    margin-right: 15px;
    opacity: 0.5;
  }
  .akLogo {
    height: 35px;
    margin-left: 20px;
    opacity: 0.9;
  }
  .wbLogo {
    height: 23px;
    margin-right: 10px;
    margin-bottom: 2px;
    opacity: 0.5;
  }
  .twLogo {
    height: 18px;
    margin-right: 10px;
    opacity: 0.5;
  }
</style>
