<template>
  <div class="list-seabg">
    <!-- <div class="list-box">
          <li>{{lists?lists.name+' '+lists.artists[0].name:''}}</li>
      </div> -->
    <section class="m-recom">
      <h3 class="f-thide">{{(inputVals?'搜索“'+(inputVals?inputVals:'')+'”':'')}}</h3>
      <ul>
        <li
          class="recomitem"
          v-for="(lists,i) in searchObj ? searchObj.allMatch : {}"
          :key="i"
          @click="$emit('update:SeachRes',lists.keyword)"
        >
          <i class="u-svg-search"></i>
          <span class="f-bd f-bd-btm f-thide"
            >{{
              lists ? lists.keyword : ""
            }}</span
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    searchObj: [Object, null],
    inputVals: [Number,String,Object,Array,null]
  },
};
</script>

<style lang="less" scoped>
.list-seabg {
  width: 100%;
  .m-recom {
    margin: 0 auto;
    .f-thide {
      height: 45px;
      margin-left: 10px;
      padding-right: 10px;
      font-size: 15px;
      line-height: 50px;
      color: #507daf;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
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
    ul {
      .recomitem {
        display: flex;
        align-items: center;
        height: 45px;
        padding-left: 10px;
        list-style: none;
        i {
          width: 15px;
          height: 15px;
          background-image: url(@/assets/searchs.svg);
          display: inline-block;
          vertical-align: middle;
          background-position: 0 0;
          background-size: contain;
          background-repeat: no-repeat;
        }
        span {
          display: inline-block;
          flex: 1;
          width: 1%;
          padding-right: 10px;
          font-size: 15px;
          line-height: 45px;
          color: #333;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
      }
    }
  }
}
</style>