<template>
  <div class="hot-bg">
    <div class="hot-nr">
      <div class="hotop">
        <div class="hotopct">
          <div class="hoticon"></div>
          <div class="hottime">更新日期：{{hotSongAll?hotSongAll.playlist.updateTime:'' | dateToTimes}}</div>
        </div>
      </div>
      <ul>
        <songList
          v-for="(item, index) in hotsongObj ? hotsongObj : ''"
          :songitem="songitem"
          :key="item.id+`${(Math.random()*100+1).toFixed(2)}`"
          :item="item"
          :index="index + 1"
          :flagStyle="flagStyle"
          @click.native="$emit('update:currentSong', item.id, item)"
        ></songList>
      </ul>
    </div>
    <LoadingAn v-if="showLoading"/>
  </div>
</template>

<script>
import songList from "@/components/songList.vue";
import LoadingAn from "@/components/LoadingAn.vue";

export default {
  props: {
      songitem: [Object, null],
  },
  data() {
    return {
      hotsongObj: [],
      hotSongAll: null,
      flagStyle: true,
      showLoading: false
    };
  },
  components: {
    songList,
    LoadingAn,
  },
  created() {
    this.showLoading=true;
    this.axios
      .get("https://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((res) => {
        this.hotsongObj = res.data.playlist.tracks;
        this.hotSongAll=res.data;
        this.showLoading=false
      });
  },
  filters: {
    dateToTimes(value) {
      if (!value) return "";
      let date = new Date(value);
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "日";

      let strDate = M + D;
      return strDate;
    },
  },
};
</script>

<style lang="less" scoped>
.hot-bg {
  width: 100%;
  .hot-nr {
    width: 100%;
    .hotop {
      position: relative;
      padding-top: 38.9%;
      overflow: hidden;
      background: url(@/assets/hot_music_bg_2x.jpg) no-repeat;
      background-size: contain;
      .hotopct {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        padding-left: 20px;
        box-sizing: border-box;
        .hoticon {
          width: 142px;
          height: 67px;
          background: url(@/assets/index_icon_2x.png) no-repeat;
          background-position: -24px -30px;
          background-size: 166px 97px;
        }
        .hottime {
          margin-top: 10px;
          color: hsla(0, 0%, 100%, 0.8);
          font-size: 12px;
          transform: scale(0.91);
          transform-origin: left top;
        }
      }
    }
  }
  ul{
    margin-bottom: 70px;
  }
}
</style>