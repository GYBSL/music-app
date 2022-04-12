<template>
<li class="lis" :class="{
  active: songitem&&songitem.id===item.id
}">
  <a href="JavaScript:;">
    <div class="box">
      <div class="dleft">
        <div class="tit">{{ item.name }}<span v-if="item.song.alias.length!=0" class="xq">({{item.song.alias[0]}})</span></div>
        <div class="author">
          <span class="sq" v-if="(+item.id.toString().slice(-1))<6"></span>
          <span v-for="(i, index) in item.song.artists" :key="i.id"
            >{{ i.name
            }}<span v-if="index + 1 < item.song.artists.length"> / </span></span>
          <span> - {{ item.song.album.name }}</span>
        </div>
      </div>
      <div class="dright">
        <span class="start"></span>
        <div class="bf">
          <span v-if="playing" class="bfbf"></span>
          <span v-else class="bfbfw"></span>
        </div>
      </div>
    </div>
  </a>
</li>
</template>

<script>
export default {
  props: {
    item: Object,
    songitem: [Object,null],
    playing: [Boolean],
    newsongs: [Array],
  },
};
</script>

<style lang="less" scoped>
.lis{
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  a{
    width: 100%;
    text-decoration: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0); 
  }
  .box {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    .xq{
      color: #888;
      margin-left: 4px;
    }
    .dright{
        width: 18%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        .start{
            display: inline-block;
            width: 22px;
            height: 22px;
            background: url(@/assets/index_icon_2x.png) no-repeat;
            background-position: -24px 0;
            background-size: 166px 97px;
        }
        .bf{
          display: none;
          .bfbf{
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url(@/assets/index.svg) no-repeat center;
            background-size: contain;
          }
          .bfbfw{
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url(@/assets/indexs.png) no-repeat center;
            background-size: contain;
          }
        }
    }
  }
  &.active{
    .dright{
      .bf{
        display: block;
      }
      .start{
        display: none;
      }
    }
  }
  .box::after {
    content: "";
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .tit {
    font-size: 1.05rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin: 5px 0;
  }
  .dleft {
    width: 82%;
    padding: 6px 0;
    color: #333;
  }
  .author {
    font-size: 0.8rem;
    color: #888;
    margin: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    .sq{
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url(@/assets/index_icon_2x.png) no-repeat;
        background-size: 166px 97px;
      }
  }
}
</style>