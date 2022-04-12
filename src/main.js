import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.filter("parsePlayCount", (value) => {
  if(String(parseInt(value / 10000)).length>4){
    return ((value / 10000)/10000).toFixed(1) + "亿";
  }else if(value<10000){
    return value;
  }else{
    return (value / 10000).toFixed(1) + "万";
  }
})
Vue.filter("picsmall", (value) => {
  return `${value}?imageView=1&type=webp&thumbnail=247x0`;
})
Vue.filter("namelen", (value) => {
  return value.length > 7 ? value.slice(0, 7) + "..." : value
})
Vue.filter("timerule", (value) => {
  let date = new Date()
  let year = date.getFullYear();
  // let month=date.getMonth()+1;
  // let day=date.getDate();

  let str = ''
  if (value.length <= 3) {
    str = value
  } else if (value.length <= 5 && value.length > 3 && value.slice(2, 3) == "-") {
    str = year + '年' + value.slice(0, 2) + "月" + value.slice(3) + "日"
  } else if (value.length <= 5 && value.length > 3 && value.slice(2, 3) == ":") {
    str = value
  } else if (value.slice(-1) == "前" || value.slice(0, 2) == "昨天") {
    str = value
  } else {
    str = value.slice(0, 4) + '年' + value.slice(5, 7) + '月' + value.slice(8) + '日'
  }
  return str
})
Vue.filter("durationTrans", (value) => {
  let b = ""
  let h = parseInt(value / 3600),
    m = parseInt(value % 3600 / 60),
    s = parseInt(value % 3600 % 60);
  if (h > 0) {
    h = h < 10 ? '0' + h : h
    b += h + ":"
  }
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  b += m + ":" + s
  return b;
})
Vue.filter("dateToTime", (value) => {
  if(!value) return '';
  let date = new Date(value);
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
  let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '日';

  let strDate = M+D;
  return strDate;
})
