<template>
  <div class="listwaiting">
    <div class="mask-waiting" @click="$parent.showListWaiting = false">
      <div class="nr-waiting" @click.stop="">
        <div class="shaowwbnr" v-if="!playlist"><span>暂无待播放内容</span></div>
        <div class="listSongs" v-else>
          <songList
            v-for="(item, index) in playlist ? playlist.tracks : ''"
            :songitem="songitem"
            :key="item.id"
            :item="item"
            :index="index + 1"
            @click.native="$emit('update:currentSong', item.id, item, index)"
          ></songList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songList from "@/components/songList.vue";

export default {
  props: {
    showListWaiting: Boolean,
    playlist: [Object,null],
    songitem: [Object,null]
  },
  components: {
      songList
  },
};
</script>

<style lang="less" scoped>
.listwaiting {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  .mask-waiting {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    .nr-waiting {
      width: 93vw;
      height: 70vh;
      position: fixed;
      bottom: 30px;
      left: 3.5vw;
      z-index: 20;
      background-color: rgb(255, 255, 255);
      border-radius: 15px;
      overflow-y: auto;
      .shaowwbnr{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          color: #333;
          font-weight: 500;
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>