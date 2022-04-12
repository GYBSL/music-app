<template>
  <div class="bgbox-gc">
    <div
      class="bg-mask"
      :style="{
        backgroundImage: `url(${
          item ?item.al?item.al.picUrl+'?imageView=1&type=webp&thumbnail=247x0':item.picUrl+'?imageView=1&type=webp&thumbnail=247x0': ''
        })`,
      }"
    ></div>
    <div class="nr">
      <ListHead
        @hide-play-page="$emit('hide-play-page')"
        :item="item"
      ></ListHead>
      <VlumeUp v-if="showVlu" @click.native="showVlu=false" :item="item" :playing="playing"></VlumeUp>
      <ListMiddle v-else @click.native="showVlu=true" :lrcData="lrcData"
      :currentTime="currentTime"
      :duration="duration"
      >
      </ListMiddle>
      <ListFoot
        :currentTime="currentTime"
        :duration="duration"
        :playing="playing"
        :item="item"
        @update:val="$emit('update:val', $event)"
        @update:play="$emit('update:play',$event)"
        @update:pause="$emit('update:pause',$event)"
        @update:nextSong="$emit('update:nextSong')"
        @update:preSong="$emit('update:preSong')"
        @update:uRandom="$emit('update:uRandom')"
      >
      </ListFoot>
    </div>
  </div>
</template>

<script>
import ListHead from "@/components/ListHead.vue";
import ListMiddle from "@/components/ListMiddle.vue";
import ListFoot from "@/components/ListFoot.vue";
import VlumeUp from "@/components/VlumeUp.vue";

export default {
  data(){
      return{
        showVlu: true,
        lrcData: null
      }
  },
  props: {
    item: [Object, null],
    duration: Number,
    currentTime: Number,
    playing: Boolean,
  },
  components: {
    ListHead,
    ListMiddle,
    ListFoot,
    VlumeUp
  },
  created(){
      this.getlyr(this.item)
  },
  methods: {
      getlyr(i){
        this.axios.get(`https://apis.netstart.cn/music/lyric?id=${i.id}`).then(res=>{
            this.lrcData=res.data.lrc.lyric
        })
      }
  },
  watch: {
      item(n){
          this.getlyr(n)
      }
  }
};
</script>

<style lang="less" scoped>
.bgbox-gc {
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  color: #fefefe;
  box-sizing: border-box;
  padding: 10px 20px;
  .bg-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.2);
    z-index: 12;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(10px);
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  .nr {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 14;
  }
}
</style>