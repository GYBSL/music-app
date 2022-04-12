<template>
  <div class="vlu-box">
    <div class="xztp">
      <div class="zz-tp" :style="{transform: `rotate(${!playing?-35:0}deg)`}"></div>
      <div class="arc-tp" :class="{ active: playing }">
        <img
          :src="
            item ?item.al?item.al.picUrl + '?imageView=1&type=webp&thumbnail=247x0':item.picUrl + '?imageView=1&type=webp&thumbnail=247x0' : ''
          "
          alt=""
        />
        <div class="mask-tp"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: [Object, null],
    playing: Boolean,
  },
};
</script>

<style lang="less" scoped>
@keyframes myan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.vlu-box {
  width: 100%;
  flex: 1 1 auto;
  z-index: 14;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .xztp {
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 30%;
    position: relative;
    .arc-tp {
      width: 250px;
      height: 250px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 50%;
      animation: myan 15s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 80%;
        border-radius: 50%;
      }
      .mask-tp {
        width: 100%;
        height: 100%;
        background: url(@/assets/blackborder.png) no-repeat center;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
      }
    }
    .zz-tp {
        position: absolute;
        top: -50px;
        left: 135px;
        width: 73px;
        height: 118px;
        background: url(@/assets/needle-ab.png) no-repeat;
        background-size: contain;
        transform-origin: left top;
        z-index: 14;
        transition: all 0.8s ease-in-out;
    }
  }
}
</style>