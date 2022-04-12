<template>
  <div class="list-footer">
    <div class="tool-list">
      <ul>
        <li class="love-tb">
          <span></span>
        </li>
        <li class="down-tb">
          <span></span>
        </li>
        <li class="sing-tb">
          <span></span>
        </li>
        <li class="pl-tb">
          <span></span>
        </li>
        <li class="more-tb">
          <span class="mm">
              <span class="bs">倍速</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="jdt-all">
      <div class="timenow">
        <span>{{ currentTime | durationTrans }}</span>
      </div>
      <div class="jdt">
        <input
          type="range"
          :min="0"
          :max="duration"
          v-model="val"
          @input="ipting = true"
          @change="
            ipting = false;
            $emit('update:val', val);
          "
        />
        <div class="jdt-box">
          <div class="jdt-bg" :style="{ width: `${(val / duration) * 100}%` }">
            <span></span>
          </div>
        </div>
      </div>
      <div class="total">
        <span>{{ duration | durationTrans }}</span>
      </div>
    </div>
    <div class="btnlists">
      <ul>
        <li class="randomSong">
          <span @click="updateRandom"></span>
        </li>
        <li class="preSong">
          <span @click="updatePre"></span>
        </li>
        <li class="conSong">
          <div class="bfbox2">
            <canvas width="70px" height="70px" ref="canvasPre"></canvas>
            <span
              class="ks-tb"
              v-if="!playing"
              @click.stop="$emit('update:play', true)"
            ></span>
            <span
              class="zt-tb"
              v-else
              @click.stop="$emit('update:pause', false)"
            ></span>
          </div>
        </li>
        <li class="nextSong">
          <span @click="updateNext"></span>
        </li>
        <li class="lbSong">
          <span @click="$parent.$parent.showListWaiting=true"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let lodash = require("lodash");
export default {
  data() {
    return {
      val: this.currentTime,
      ipting: false,
    };
  },
  props: {
    duration: Number,
    currentTime: Number,
    playing: Boolean,
    item: [Object, null],
  },
  computed: {
    proTime() {
      return this.duration === 0 ? 0 : this.currentTime / this.duration;
    },
  },
  watch: {
    currentTime(n) {
      if (!this.ipting) {
        this.val = n;
      }
    },
    proTime(n) {
      let ctx = this.$refs.canvasPre.getContext("2d");
      ctx.clearRect(0, 0, 100, 100);

      ctx.beginPath();
      ctx.arc(20, 20, 19, -90*(Math.PI / 180), (Math.PI / 180) * (n * 360 - 90), false);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fefefe";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        20,
        20,
        19,
        (Math.PI / 180) * (n * 360 - 90),
        (Math.PI / 180) * 360
      );
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    },
  },
  methods: {
    updateNext: lodash.debounce(function(){
      this.$emit('update:nextSong')
    },300),
    updatePre: lodash.debounce(function(){
      this.$emit('update:preSong')
    },300),
    updateRandom: lodash.debounce(function(){
      this.$emit('update:uRandom')
    },300),
  },
};
</script>

<style lang="less" scoped>
.list-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 14;
  .tool-list {
    width: 100%;
    box-sizing: border-box;
    padding: 0 12%;
    margin-bottom: 15px;
    margin-top: 30px;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .love-tb {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/heart.svg) no-repeat center;
          background-size: cover;
        }
      }
      .down-tb {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/down.svg) no-repeat center;
          background-size: cover;
        }
      }
      .sing-tb {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/sing.svg) no-repeat center;
          background-size: cover;
        }
      }
      .pl-tb {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/pl.svg) no-repeat center;
          background-size: cover;
        }
      }
      .more-tb {
        display: flex;
        justify-content: center;
        align-items: center;
        .mm{
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/more.svg) no-repeat center;
          background-size: cover;
          position: relative;
          .bs{
              display: inline-block;
              width: 30px;
              height: 15px;
              background-color: #FF3939;
              position: absolute;
              font-size: 5px;
              letter-spacing: 1px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              right: -30px;
              top: -5px;
          }
        }
      }
    }
  }
  .jdt-all {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .jdt {
      width: 100%;
      text-align: center;
      position: relative;
      padding: 0 10px;
      input {
        width: 100%;
        height: 5px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        opacity: 0;
      }
      .jdt-box {
        width: 100%;
        height: 3px;
        background-color: #635a5e;
        border-radius: 10px;
        .jdt-bg {
          height: 100%;
          background-color: #b8b4b5;
          position: relative;
          border-radius: 10px;
          span {
            position: absolute;
            right: -6px;
            top: -2px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #f7feff;
          }
        }
      }
    }
    .timenow {
      span {
        font-size: 0.5rem;
        color: #f7feff;
      }
    }
    .total {
      span {
        font-size: 0.5rem;
      }
    }
  }
  .btnlists {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 12%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    .randomSong {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(@/assets/random.svg) no-repeat center;
        background-size: cover;
      }
    }
    .preSong {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(@/assets/pre.svg) no-repeat center;
        background-size: cover;
      }
    }
    .conSong {
      display: flex;
      justify-content: center;
      align-items: center;
      .bfbox2 {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .ks-tb {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/start-gc.svg) no-repeat center;
          background-size: cover;
          z-index: 9;
        }
        .zt-tb {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/stop-gc.svg) no-repeat center;
          background-size: cover;
          z-index: 9;
        }
        canvas {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -20px;
          margin-left: -20px;
          z-index: 2;
        }
      }
    }
    .nextSong {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(@/assets/next.svg) no-repeat center;
        background-size: cover;
      }
    }
    .lbSong {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(@/assets/playlist2.svg) no-repeat center;
        background-size: cover;
      }
    }
  }
}
</style>