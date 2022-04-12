<template>
    <li @click="$router.push({path: '/listdetails',query: {id: item.id}});$emit('update:playlistId',item.id);">
        <img :src="item.picUrl | picsmall" alt="">
        <span>{{item.playCount | parsePlayCount}}</span>
        <p>{{item.name}}</p>
    </li>
</template>

<script>
    export default {
        props: {
            item: Object
        },
    }
</script>

<style lang="less" scoped>
li{
   flex-basis: 30%;
   flex-grow: 1;
   box-sizing: border-box;
   margin-bottom: 16px;
   img{
       width: 100%;
   }
   &:nth-child(3n + 2) {
    margin: 0 2px;
  }
  position: relative;
  span{
      position: absolute;
      right: 5px;
      color: #fff;
      top: 5px;
      z-index: 3;
      padding-left: 13px;
      font-size: 12px;
      background-repeat: no-repeat;
      background-size: 11px 10px;
      background-position: 0;
      text-shadow: 1px 0 0 rgba(0,0,0,.15);
      background-image: url(@/assets/ear.svg);
  }
  p{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding: 6px 2px 0 6px;
      min-height: 30px;
      line-height: 1.2;
      font-size: 13px;
  }
}
</style>