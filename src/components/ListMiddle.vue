<template>
    <div class="listmid" ref="listmid">
        <ul ref='ulListmid' :style="{transform: `translateY(${-offH}px)`}">
            <li v-for="(item,index) in lycArr" :key="index" :class="{active: findlyc.index==index}">
                <span @click.stop="">{{item.text}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            offH: 0
        }
    },
    props: {
        lrcData: [String,null],
        duration: Number,
        currentTime: Number,
    },
    created(){
        this.$nextTick(()=>{
            let heights=[...this.$refs.ulListmid.querySelectorAll("li")].slice(0,this.findlyc.index).reduce((total, el)=>{
                return total+Number(el.offsetHeight)
            },0)
            let parHeight=Number(this.$refs.listmid.offsetHeight)
            if(heights<parHeight/2){
                heights=0
            }else if(heights>Number(this.$refs.ulListmid.offsetHeight)-parHeight/2){
                heights=Number(this.$refs.ulListmid.offsetHeight)-parHeight
            }else{
                heights=heights-parHeight/2
            }
            this.offH=heights
        })
    },
    methods: {
        findlycMet(arr,ts){
            let flycs=arr.filter(el=>el.times<ts)
            return {
                index: flycs.length-1,
                flyc: flycs[flycs.length-1]
            }
        }
    },
    computed: {
        lycArr(){
            let arrs=this.lrcData?this.lrcData.split("\n").filter(i=>i).map(el => {
                let a=el.match(/^\[(\d{2}:\d{2}\.\d{2,3})\](.*)/);
                let timeArr=a[1].split(":")
                return {
                    times: timeArr[0]*60+timeArr[1]*1,
                    text: a[2]
                }
            }):[];
            return arrs
        },
        findlyc(){
            return this.findlycMet(this.lycArr,this.currentTime)
        }
    },
    watch: {
        'findlyc.index':function(n){
            let heights=[...this.$refs.ulListmid.querySelectorAll("li")].slice(0,n).reduce((total, el)=>{
                return total+Number(el.offsetHeight)
            },0)
            let parHeight=Number(this.$refs.listmid.offsetHeight)
            if(heights<parHeight/2){
                heights=0
            }else if(heights>Number(this.$refs.ulListmid.offsetHeight)-parHeight/2){
                heights=Number(this.$refs.ulListmid.offsetHeight)-parHeight
            }else{
                heights=heights-parHeight/2
            }
            this.offH=heights
        }
    }
}
</script>

<style lang="less" scoped>
.listmid{
    width: 100%;
    z-index: 14;
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    ul{
        z-index: 15;
        text-align: center;
        transition: all 0.5s ease-in-out;
        .active{
            color: red;
        }
        li{
            font-size: 0.9rem;
            color: #C2C2C2;
            line-height: 35px;
            span{
                word-wrap: normal;
            }
        }
    }
}
</style>