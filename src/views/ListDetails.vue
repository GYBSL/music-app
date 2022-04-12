<template>
  <div class="bgbox">
    <LoadingAn v-if="showLoading"/>

    <div class="list">
      <div
        class="mask"
        :style="{
          backgroundImage: `url(${
            playlist ? playlist.coverImgUrl : ''
          }?imageView=1&type=webp&thumbnail=247x0`,
        }"
      ></div>
      <span class="backbtn" @click="$router.back()"></span>
      <div class="head">
        <div class="coverPic">
          <img :src="playlist ? playlist.coverImgUrl : ''" alt="" />
          <span class="gedan">歌单</span>
          <span class="count">{{
            playlist ? playlist.playCount : "" | parsePlayCount
          }}</span>
        </div>
        <div class="rightBox">
          <h2>{{ playlist ? playlist.name : "" }}</h2>
          <div class="headPic">
            <a href="javaScript: ;">
              <div class="rz">
                <img
                  :src="playlist ? playlist.creator.avatarUrl : '' | picsmall"
                  alt=""
                />
                <span></span>
              </div>
              <span>{{
                playlist ? playlist.creator.nickname : "" | namelen
              }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>


    <SmallTitle class="st-btn"><span class="st-span1">歌曲列表</span><button @click="$emit('update:playlist',playlist,playlist.tracks[0])"><span></span>播放全部</button></SmallTitle>
    <div class="listSongs">
      <songList
        v-for="(item, index) in playlist ? playlist.tracks : ''"
        :songitem="songitem"
        :key="item.id"
        :item="item"
        :playing="playing"
        :index="index + 1"
        @click.native="$emit('update:currentSong', item.id, item, index)"
      ></songList>
      <div class="ts">
        <span>查看更多歌曲，请下载客户端</span>
      </div>
    </div>

    <SmallTitle v-if="commentList?commentList.hotComments.length>0:false">精彩评论</SmallTitle>
    <div class="pl" v-if="showComment">
      <ListComment :playlistId="playlistId" v-for="hotcomment in commentList?commentList.hotComments:[]" :hotcomment="hotcomment" :key="hotcomment.commentId"></ListComment>
    </div>

    <SmallTitle>最新评论{{commentList?commentList.total:''}}</SmallTitle>
    <div class="zxpl" v-if="showComment">
        <ListComment :playlistId="playlistId" v-for="comments in commentList?commentList.comments:[]" :comments="comments" :key="comments.commentId"></ListComment>
        <div class="bd">
            <span>查看全部{{commentList?commentList.total:'' | parsePlayCount}}条评论</span>
        </div>
    </div>
  </div>
</template>

<script>
import songList from "@/components/songList.vue";
import SmallTitle from "@/components/SmallTitle.vue";
import ListComment from "@/components/ListComment.vue";
import LoadingAn from "@/components/LoadingAn.vue";

export default {
  data() {
    return {
      playlist: null,
      commentList: null,
      showLoading: false,
      showComment: true,
    };
  },
  props: {
    songitem: [Object, null],
    playlistId: [Number, null],
    playing: [Boolean]
  },
  components: {
    songList,
    SmallTitle,
    ListComment,
    LoadingAn,
  },
  created() {
    // this.showLoading=true;
    this.getListSongs(this.$route.query.id);
    if (this.playlistId) {
      this.getComments(this.playlistId);
    }else if(this.$route.query){
      this.getComments(this.$route.query.id);
    }
    // this.showLoading=false;
  },
  beforeRouteUpdate(to, from, next) {
    this.getListSongs(to.query.id);
    next();
  },
  deactivated(){
    this.getListSongs('');
    this.showComment=false
  },
  activated(){
    // this.showLoading=true;
    this.getListSongs(this.$route.query.id);
    if (this.playlistId) {
      this.getComments(this.playlistId);
    }else if(this.$route.query){
      this.getComments(this.$route.query.id);
    }
    // this.showLoading=false;
    this.showComment=true
  },
  methods: {
    getListSongs(id) {
      this.showLoading=true;
      this.axios
        .get("https://apis.netstart.cn/music/playlist/detail", {
          params: { id },
        })
        .then((res) => {
          this.playlist = res.data.playlist;
          this.showLoading=false;
        });
    },
    getComments(id) {
      this.axios
        .get(`https://apis.netstart.cn/music/comment/playlist?id=${id}`)
        .then((res) => {
          this.commentList = res.data;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.bgbox {
  margin-bottom: 50px;
}
.list {
  position: relative;
  padding: 35px 10px 30px 15px;
  overflow: hidden;
  box-sizing: border-box;
  .backbtn {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fefefe;
    z-index: 3;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: url(@/assets/back.svg) no-repeat center;
    background-size: cover;
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    transform: scale(1.5);
    filter: blur(20px);
  }
  .mask::after {
    content: " ";
    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .head {
    display: flex;
    position: relative;
    z-index: 2;
    .coverPic {
      width: 35%;
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .count {
        position: absolute;
        right: 2px;
        top: 0;
        z-index: 3;
        padding-left: 15px;
        color: #fff;
        font-size: 0.85rem;
        background-image: url(@/assets/ear.svg);
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11px 10px;
        text-shadow: 1px 0 0 rgb(0 0 0 / 15%);
      }
      .gedan {
        position: absolute;
        z-index: 3;
        top: 10px;
        left: 0;
        padding: 0 8px;
        height: 17px;
        color: #fff;
        font-size: 9px;
        text-align: center;
        line-height: 17px;
        background-color: rgba(217, 48, 48, 0.8);
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }
    }
    .rightBox {
      flex: 1 1 auto;
      margin-left: 16px;
      width: 1%;
      h2 {
        padding-top: 1px;
        font-size: 1.1rem;
        color: #fefefe;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .headPic {
        position: relative;
        display: block;
        margin-top: 5px;
        a {
          display: inline-block;
          text-decoration: none;
          color: hsla(0, 0%, 100%, 0.7);
          cursor: pointer;
          width: auto;
          .rz {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            float: left;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            span {
              background-position: -40px 0;
              position: absolute;
              right: -5px;
              bottom: 0;
              width: 12px;
              height: 12px;
              background-image: url(@/assets/usericn_2x.png);
              background-repeat: no-repeat;
              background-size: 75px auto;
            }
          }
          span {
            float: left;
            // margin-top: 10px;
            margin-left: 3px;
          }
        }
      }
    }
  }
}
.listSongs {
  .ts {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-top: 7px;
      margin-bottom: 3px;
      color: #999;
      font-size: 0.9rem;
      text-align: center;
      display: inline-block;
    }
  }
}
.bd{
    width: 100%;
    display: flex;
    justify-content: center;
    span{
        display: block;
        padding: 18px 0;
        font-size: 14px;
        color: #999;
        text-align: center;
        line-height: 1;
    }
}
.st-btn{
  display: flex;
  align-items: center;
  height: 30px;
  .st-span1{
    display: inline-block;
    margin-right: 5px;
  }
  button{
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    color: #303032;
    font-weight: bold;
    padding: 0;
    span{
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(@/assets/red-bf.svg) no-repeat center;
      background-size: contain;
      margin-right: 5px;
    }
  }
}
</style>