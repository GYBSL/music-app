<template>
    <div class="listhead">
        <div class="box-head">
            <div class="back">
                <span class="backbtn" @click="$emit('hide-play-page')"></span>
            </div>
            <div class="tit-list">
                <span class="cname">
                    {{item?item.name:''}}
                    <span v-if="item?item.alia?item.alia.length>0:item.song.alias.length>0:false">({{item?item.alia?item.alia[0]:item.song.alias[0]:''}})</span>
                </span>
                <p class="author-tit">
                    {{item?item.ar?item.ar[0].name:item.song.artists[0].name:''}}
                    <span></span>
                </p>
            </div>
            <div class="share">
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: [Object,null]
        }
    }
</script>

<style lang="less" scoped>
.listhead{
    width: 100%;
    margin-top: 10px;
    z-index: 14;
    margin-bottom: 15px;
    .box-head{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        .back{
            position: relative;
            width: 30px;
            height: 30px;
            .backbtn{
                position: absolute;
                top: -3px;
                left: 5px;
                color: #fefefe;
                cursor: pointer;
                width: 20px;
                height: 20px;
                background: url(@/assets/back.svg) no-repeat center;
                background-size: cover;
                transform: rotate(-90deg);
                -webkit-tap-highlight-color:rgba(0,0,0,0); 
            }
        }
        .tit-list{
            width: 45%;
            // flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .cname{
                display: inline-block;
                width: 100%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                white-space: nowrap;
                font-size: 0.9rem;
                color: #fefefe;
            }
            .author-tit{
                font-size: 0.5rem;
                color: #92898E;
                span{
                    display: inline-block;
                    width: 13px;
                    height: 10px;
                    border-radius: 5px;
                    background: url(@/assets/jia.svg) no-repeat center;
                    background-size: 6px;
                    background-color: #9C979D;
                }
            }
        }
        .share{
            width: 30px;
            height: 30px;
            position: relative;
            span{
                display: inline-block;
                width: 25px;
                height: 25px;
                background: url(@/assets/share.svg) no-repeat center;
                background-size: cover;
                position: absolute;
                top: -3px;
                right: 0;
            }
        }
    }
}
</style>