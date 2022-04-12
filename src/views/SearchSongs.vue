<template>
  <div class="searchbox">
    <div class="search-nr">
      <div class="m-hmsrch">
        <form class="f-bd-btm" @submit.prevent="">
          <div class="inputcover">
            <i class="u-svg-srch"></i>
            <input
              type="search"
              name="search"
              class="input"
              placeholder="搜索歌曲、歌手、专辑"
              autocomplete="off"
              v-model="inputVals"
              @input="getinputVal"
              @keyup.enter="getinputVal"
              @focus="showResult = false"
              ref="ipts"
            />
            <figure class="close">
              <i class="u-svg-empty"></i>
            </figure>
          </div>
        </form>

        <div class="m-default" v-if="!inputVals">
          <section class="m-hotlist">
            <h3 class="title">热门搜索</h3>
            <ul class="list">
              <li
                class="f-bd-full"
                v-for="hotSea in hotSearch ? hotSearch : {}"
                :key="hotSea ? hotSea.score : ''"
                @click="ToSeaRes(hotSea.searchWord)"
              >
                <a class="link" href="javascript:void(0);">{{
                  hotSea ? hotSea.searchWord : ""
                }}</a>
              </li>
            </ul>
          </section>
        </div>
        <div class="seaList" v-else-if="inputVals && !showResult">
          <SearchList
            :searchObj="searchObj"
            :inputVals="inputVals"
            @update:SeachRes="ToSongList"
          ></SearchList>
        </div>
        <div
          class="m-default searchSongList"
          v-else-if="inputVals && showResult"
        >
          <section class="m-hotlist searchSongListSec">
            <h3 class="title">最佳匹配</h3>

            <LoadingAn v-if="showLoading"/>
            
            <ul class="list">
              <songList
                v-for="(item, index) in searchResultItem
                  ? searchResultItem
                  : ''"
                :songitem="songitem"
                :key="item.id + `${(Math.random() * 100 + 1).toFixed(2)}`"
                :item="item"
                :index="index + 1"
                @click.native="$emit('update:currentSong', item.id, item)"
              ></songList>
            </ul>
          </section>
        </div>
        <section class="m-history" v-if="!inputVals">
          <ul class="list">
            <li
              class="item"
              v-for="(his, index) in localArr.length > 0 ? localArr : {}"
              @click="ToSing(his ? his.name : false)"
              :key="index"
            >
              <i class="u-svg u-svg-histy"></i>
              <div class="histyr f-bd f-bd-btm">
                <span class="link f-thide">{{ his ? his.name : "" }}</span>
                <figure class="close">
                  <i
                    class="u-svg u-svg-close"
                    @click.stop="deleteDis(index)"
                  ></i>
                </figure>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SearchList from "@/components/SearchList.vue";
import songList from "@/components/songList.vue";
import LoadingAn from "@/components/LoadingAn.vue";


let lodash = require("lodash");
export default {
  props: {
    songitem: [Object, null],
  },
  data() {
    return {
      inputVals: "",
      searchObj: null,
      hotSearch: null,
      showHot: true,
      showResult: false,
      searchResultItem: null,
      localArr: [],
      showLoading: false
    };
  },
  components: {
    SearchList,
    songList,
    LoadingAn,
  },
  created() {
    this.getHotSearch();
    if (!localStorage.getItem("localArr")) {
      localStorage.setItem("localArr", []);
    }
    this.localArr = JSON.parse(localStorage.getItem("localArr"));
  },
  methods: {
    ToSing(v) {
      if (v) {
        this.showResult = true;
        this.inputVals = v;
        this.getResultData();
      } else {
        return;
      }
    },
    deleteDis(t) {
      this.localArr.splice(t, 1);
      localStorage.setItem("localArr", JSON.stringify(this.localArr));
    },
    ToSongList(v) {
      this.showResult = true;
      this.inputVals = v;
      this.getResultData();
      if (this.localArr.length > 0) {
        let filterArr = this.localArr.filter(n=>n.name == v);
        if (filterArr.length == 0) this.localArr.push({ name: v }); else return;
      }else this.localArr.push({ name: v });
      localStorage.setItem("localArr", JSON.stringify(this.localArr));
    },
    ToSeaRes(v) {
      this.showResult = true;
      this.inputVals = v;
      this.getResultData();
      if (this.localArr.length > 0) {
        let filterArr = this.localArr.filter(n=>n.name == v);
        if (filterArr.length == 0) this.localArr.push({ name: v }); else return;
      }else this.localArr.push({ name: v });
      localStorage.setItem("localArr", JSON.stringify(this.localArr));
    },
    getinputVal: lodash.debounce(function () {
      if (
        this.inputVals == ""
          ? this.inputVals.trim() == ""
          : this.inputVals == ""
      ) {
        this.searchObj = null;
      } else {
        this.getsearchData();
      }
    }, 200),
    getsearchData() {
      this.axios
        .get(
          `https://apis.netstart.cn/music/search/suggest?keywords=${this.inputVals}&type=mobile`
        )
        .then((res) => {
          this.searchObj = res.data.result;
        });
    },
    getHotSearch() {
      this.axios
        .get("https://apis.netstart.cn/music/search/hot/detail")
        .then((res) => {
          this.hotSearch = res.data.data;
        });
    },
    getResultData() {
      this.showLoading=true;
      this.axios
        .get(
          `https://apis.netstart.cn/music/cloudsearch?keywords=${this.inputVals}`
        )
        .then((res) => {
          this.searchResultItem = res.data.result.songs;
          this.showLoading=false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.searchbox {
  width: 100%;
  height: 100%;
  .search-nr {
    width: 100%;
    height: 100%;
    .m-hmsrch {
      background: #fbfcfd;
      .f-bd-btm {
        padding: 15px 10px;
        position: relative;
        .inputcover {
          position: relative;
          width: 100%;
          height: 30px;
          padding: 0 30px;
          box-sizing: border-box;
          background: #ebecec;
          border-radius: 30px;
          .u-svg-srch {
            position: absolute;
            left: 0;
            top: 9px;
            margin: 0 8px;
            vertical-align: middle;
            width: 13px;
            height: 13px;
            background-image: url(@/assets/searchs.svg);
            display: inline-block;
            background-position: 0 0;
            background-size: contain;
            background-repeat: no-repeat;
          }
          input {
            width: 100%;
            height: 30px;
            line-height: 18px;
            background: rgba(0, 0, 0, 0);
            font-size: 14px;
            color: #333;
            border-radius: 0;
            border: 0;
            outline: 0;
            &::placeholder {
              position: absolute;
              top: 5px;
              font-size: 14px;
              color: #c9c9c9;
              background: rgba(0, 0, 0, 0);
              pointer-events: none;
              cursor: default;
            }
          }
          .close {
            position: absolute;
            right: 0;
            top: 0;
            width: 30px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            .u-svg-empty {
              display: none;
              vertical-align: middle;
              width: 14px;
              height: 14px;
              background-image: url(@/assets/dels.svg);
              background-position: 0 0;
              background-size: contain;
              background-repeat: no-repeat;
            }
          }
        }
        &::after {
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          position: absolute;
          z-index: 2;
          content: "";
          top: 0;
          left: 0;
          pointer-events: none;
          box-sizing: border-box;
          transform-origin: top left;
          border: 0 solid rgba(0, 0, 0, 0.1);
          border-bottom-width: 1px;
        }
      }
      .m-default {
        width: 100%;
        .m-hotlist {
          padding: 15px 10px 0;
          display: block;
          .title {
            font-size: 12px;
            line-height: 12px;
            color: #666;
          }
          .list {
            margin: 10px 0 7px;
            .f-bd-full {
              display: inline-block;
              height: 32px;
              margin-right: 8px;
              margin-bottom: 8px;
              padding: 0 14px;
              font-size: 14px;
              line-height: 32px;
              color: #333;
              position: relative;
              list-style: none;
              .link {
                color: #333;
                cursor: pointer;
                text-decoration: none;
              }
              &::after {
                content: "";
                border-color: #d3d4da;
                border-radius: 32px;
                transform: scale(0.5);
                width: 200%;
                height: 200%;
                // border-width: 1px;
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                pointer-events: none;
                box-sizing: border-box;
                transform-origin: top left;
                border: 1px solid rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
      .m-history {
        width: 100%;
        margin-bottom: 70px;
        .list {
          width: 100%;
          .item {
            display: flex;
            align-items: center;
            height: 45px;
            list-style: none;
            .u-svg-histy {
              margin: 0 10px;
              width: 15px;
              height: 15px;
              background-image: url(@/assets/his.svg);
              display: inline-block;
              vertical-align: middle;
              background-position: 0 0;
              background-size: contain;
              background-repeat: no-repeat;
            }
            .f-bd-btm {
              flex: 1;
              width: 1%;
              position: relative;
              display: flex;
              align-items: center;
              height: 45px;
              .f-thide {
                -webkit-box-flex: 1;
                margin-right: 10px;
                flex: 1;
                width: 1%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: normal;
              }
              .close {
                flex: 0 0 auto;
                width: 32px;
                height: 32px;
                line-height: 32px;
                display: block;
                .u-svg-close {
                  margin-left: 2px;
                  width: 12px;
                  height: 12px;
                  background-image: url(@/assets/xx.svg);
                  display: inline-block;
                  vertical-align: middle;
                  background-position: 0 0;
                  background-size: contain;
                  background-repeat: no-repeat;
                }
              }
              &::after {
                border-color: rgba(0, 0, 0, 0.1);
                width: 200%;
                height: 200%;
                transform: scale(0.5);
                position: absolute;
                z-index: 2;
                content: "";
                top: 0;
                left: 0;
                pointer-events: none;
                box-sizing: border-box;
                transform-origin: top left;
                border: 0 solid rgba(0, 0, 0, 0.1);
                border-bottom-width: 1px;
              }
            }
          }
        }
      }
    }
  }
}
.searchSongListSec {
  margin-bottom: 70px;
}
</style>