<template>
  <div>
    <!-- <LoadingAn v-if="showLoading"/> -->

    <LeftTitle>编辑推荐</LeftTitle>
    <ul class="tj-ul">
      <persSongs
        v-for="item in persArr"
        :item="item"
        :key="item.id"
        @update:playlistId="$emit('update:playlistId',$event)"
      ></persSongs>
    </ul>
    <LeftTitle>最新音乐</LeftTitle>
    <ul class="new-ul">
      <newSongs
        v-for="item in newsongs"
        :key="item.id"
        :songitem="songitem"
        :item="item"
        :playing="playing"
        :newsongs="newsongs"
        @click.native="$emit('update:currentSong', item.id, item,newsongs)"
      ></newSongs>
    </ul>

    <FooterMsg></FooterMsg>
  </div>
</template>

<script>
import LeftTitle from "@/components/LeftTitle.vue";
import persSongs from "@/components/persSongs.vue";
import newSongs from "@/components/newSongs.vue";
import FooterMsg from "@/components/FooterMsg.vue"
// import LoadingAn from "@/components/LoadingAn.vue";


export default {
  props: {
    songitem: [Object, null],
    playing: [Boolean]
  },
  data: function () {
    return {
      persArr: [],
      newsongs: [],
      flag: true,
      // showLoading: false
    };
  },
  components: {
    LeftTitle,
    persSongs,
    newSongs,
    FooterMsg,
    // LoadingAn,
  },
  created() {
    // this.showLoading=true;
    this.axios
      .get("https://apis.netstart.cn/music/personalized?limit=6")
      .then((res) => {
        this.persArr = res.data.result;
      });
    this.axios
      .get("https://apis.netstart.cn/music/personalized/newsong")
      .then((res) => {
        this.newsongs = res.data.result;
        // this.showLoading=false
      });
  },
};
</script>

<style lang="less" scoped>
div{
    position: relative;
}
.tj-ul {
  display: flex;
  flex-wrap: wrap;
}
</style>