<template>
  <div id="app">
    <nav v-if="$route.meta.flag">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/hotsongs">热歌榜</router-link></li>
      <li><router-link to="/searchsongs">搜索</router-link></li>
    </nav>
    <keep-alive>
      <router-view
        @update:currentSong="changeData"
        @update:playlistId="playlistId = $event"
        @update:playlist="changeplay"
        :playlistId="playlistId"
        :songitem="songitem"
        :playing="playing"
      />
    </keep-alive>

    <audio
      ref="audios"
      @play="playing = true"
      @pause="playing = false"
      @timeupdate="currentTime = $event.target.currentTime"
      @durationchange="duration = $event.target.duration"
      :src="
        songsid
          ? `https://music.163.com/song/media/outer/url?id=${songsid}.mp3`
          : ''
      "
      class="au"
      autoplay
      controls
    ></audio>

    <PlayList
      class="playlist"
      v-show="songitem"
      :item="songitem"
      :playing="playing"
      :currentTime="currentTime"
      :duration="duration"
      :showListWaiting="showListWaiting"
      @update:play="
        $refs.audios.play();
        playing = $event;
      "
      @update:pause="
        $refs.audios.pause();
        playing = $event;
      "
      @click.native="showPlayBar = false"
    ></PlayList>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <SongPlayBar
        v-if="songitem && !showPlayBar"
        @hide-play-page="showPlayBar = true"
        :item="songitem"
        :currentTime="currentTime"
        :duration="duration"
        :playing="playing"
        @update:val="$refs.audios.currentTime = $event"
        @update:play="
          $refs.audios.play();
          playing = $event;
        "
        @update:pause="
          $refs.audios.pause();
          playing = $event;
        "
        @update:nextSong="nextChange"
        @update:preSong="preChange"
        @update:uRandom="randomChange"
      ></SongPlayBar>
    </transition>

    <!-- 播放列表 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <ListWaiting
        v-if="showListWaiting"
        :showListWaiting="showListWaiting"
        :songitem="songitem"
        :playlist="playlist"
        @update:currentSong="changeData"
      ></ListWaiting>
    </transition>
  </div>
</template>

<script>
import PlayList from "./views/PlayList.vue";
import SongPlayBar from "@/components/SongPlayBar.vue";
import ListWaiting from "@/views/ListWaiting.vue";

export default {
  data() {
    return {
      songsid: "",
      songitem: null,
      playing: false,
      currentTime: 0,
      duration: 0,
      showPlayBar: true,
      playlistId: null,
      showListWaiting: false,
      playlist: null,
      listIndex: 0,
      newAllSong: null
    };
  },
  components: {
    PlayList,
    SongPlayBar,
    ListWaiting,
  },
  methods: {
    changeData(id, item, bool) {
      this.songsid = id;
      this.songitem = item;
      this.toggleBtn = bool;
      if (typeof bool == "boolean" || !bool) {
        return;
      } else if(typeof bool == "number"){
        this.listIndex = bool;
      }
    },
    changeplay(v, p) {
      this.playlist = v;
      this.songsid = p.id;
      this.playlistId = p.id;
      this.songitem = p;
      this.listIndex = 0;
    },
    nextChange() {
      if (this.playlist) {
        this.listIndex =
          this.listIndex + 1 >= this.playlist.tracks.length
            ? 0
            : this.listIndex + 1;
        this.songsid = this.nextSongItem.id;
        this.playlistId = this.nextSongItem.id;
        this.songitem = this.nextSongItem;
      } else {
        return;
      }
    },
    preChange() {
      if (this.playlist) {
        this.listIndex =
          this.listIndex - 1 < 0
            ? this.playlist.tracks.length - 1
            : this.listIndex - 1;
        this.songsid = this.nextSongItem.id;
        this.playlistId = this.nextSongItem.id;
        this.songitem = this.nextSongItem;
      } else {
        return;
      }
    },
    randomChange() {
      if (this.playlist) {
        let randomIndex = parseInt(Math.random() * this.playlist.tracks.length);
        // this.listIndex = this.getRan(this.arr);

        this.listIndex = randomIndex;
        this.songsid = this.nextSongItem.id;
        this.playlistId = this.nextSongItem.id;
        this.songitem = this.nextSongItem;
      } else {
        return;
      }
    },
    // getRan(arr) {
    //   let len = arr.length;
    //   let result;
    //   let r = Math.floor(Math.random() * len);
    //   result=arr[r];
    //   arr.splice(r, 1);
    //   // arr.sort(()=>0.5-Math.random())
    //   // result=arr
    //   return result;
    // },
  },
  computed: {
    nextSongItem() {
      return this.playlist.tracks[this.listIndex];
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  display: flex;
  border-bottom: 1px soild #ccc;
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.1) inset;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  li {
    flex: 1;
    text-align: center;
    list-style: none;

    a {
      font-size: 0.9rem;
      text-decoration: none;
      color: #333;
      line-height: 2.6rem;
      display: inline-block;

      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 3px solid red;
      }
    }
  }
}
.au {
  width: 80%;
  height: 50px;
  position: fixed;
  top: 30px;
  z-index: 9;
  left: 50%;
  margin-left: -40%;
  display: none;
}
.playlist {
  position: fixed;
  z-index: 9;
  bottom: 0;
}
</style>
