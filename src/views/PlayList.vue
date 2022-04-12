<template>
<transition 
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDownBig">
<div class="bgbox-pl">
  <div class="listbox">
    <div class="leftbox">
      <div class="pictx">
        <div class="out">
          <img :src="item?item.picUrl:''" v-if="item?item.picUrl:0" alt="" />
          <img :src="item.al?item.al.picUrl:''" v-if="item?item.al:0" alt="" />
        </div>
      </div>
      <div class="tit-bt">
        <span>{{item?item.name:''}}
            <span v-if="item?item.song?item.song.alias.length:0:0!=0" class="xq">({{item?item.song.alias[0]:''}})</span>
            <span v-if="item?item.alia?item.alia.length:0:0!=0" class="xq">({{item?item.alia[0]:''}})</span>
        </span>
        <span v-if="item?item.song:0"> - {{item?item.song.artists[0].name:''}}</span>
        <span v-if="item?item.ar:0"> - {{item?item.ar[0].name:''}}</span>
      </div>
    </div>
    <div class="rightbox">
        <div class="bfbox">
            <canvas width="30px" height="30px" ref="canvasPre"></canvas>
            <span class="ks-tb" v-if="!playing" @click.stop="$emit('update:play',true)"></span>
            <span class="zt-tb" v-else @click.stop="$emit('update:pause',false)"></span>
        </div>
        <div class="lbbox"><span @click.stop="$parent.showListWaiting=true"></span></div>
    </div>
  </div>
</div>
</transition>
</template>

<script>
export default {
    props: {
        item: [Object,null],
        playing: Boolean,
        duration: Number,
        currentTime: Number,
        showListWaiting: Boolean
    },
    computed: {
        proTime(){
            return this.duration === 0 ? 0 : this.currentTime / this.duration;
        }
    },
    watch: {
        proTime(n){
            let ctx=this.$refs.canvasPre.getContext('2d');
            ctx.clearRect(0, 0, 60, 60);
            
            ctx.beginPath();
            ctx.arc(15, 15, 14, -90*(Math.PI/180), (Math.PI/180)*(n*360-90), false);
            ctx.lineWidth = 1;
            ctx.strokeStyle='#ff3a3a';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(15, 15, 14, (Math.PI/180)*(n*360-90),(Math.PI/180)*360)
            ctx.strokeStyle='rgba(0,0,0,0.3)'
            ctx.lineWidth=0.5;
            ctx.stroke();
        }
    }
};
</script>

<style lang="less" scoped>
.bgbox-pl{
    width: 100%;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
}
.listbox {
  width: 100%;
  height: 48px;
  border-radius: 15px 15px 0 0;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftbox{
      width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pictx{
          width: 30%;
          display: flex;
          justify-content: center;
          .out{
              border-radius: 50%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              outline: 7px solid #131313;
              transform: translateY(-13px) translateX(10px);
              img{
                  width: 33px;
                  height: 33px;
                  border-radius: 50%;
              }
          }
      }
      .tit-bt{
          width: 70%;
          padding-left: 10px;
          box-sizing: border-box;
          flex: 1 1 auto;
          color: #333;
          font-size: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          .xq{
            color: #888;
            margin-left: 4px;
          }
      }
  }
  .rightbox{
      width: 20%;
      height: 100%;
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .bfbox{
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .ks-tb{
              width: 15px;
              height: 15px;
              display: inline-block;
              background: url(@/assets/start-list.svg) no-repeat center;
              background-size: cover;
              z-index: 9;
          }
          .zt-tb{
              width: 15px;
              height: 15px;
              display: inline-block;
              background: url(@/assets/stop-list.svg) no-repeat center;
              background-size: cover;
              z-index: 9;
          }
          canvas{
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -15px;
              margin-left: -15px;
              z-index: 2;
          }
      }
      .lbbox{
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
              width: 25px;
              height: 25px;
              background: url(@/assets/playlist.svg) no-repeat center;
              background-size: cover;
          }
      }
  }
}
</style>