import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRecom from '../views/HomeRecom.vue'
import HotSongs from '../views/HotSongs.vue'
import SearchSongs from '../views/SearchSongs.vue'
import ListDetails from '../views/ListDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homerecom',
    component: HomeRecom,
    meta: { flag: true }
  },
  {
    path: '/hotsongs',
    name: 'hotsongs',
    component: HotSongs,
    meta: { flag: true }
  },
  {
    path: '/searchsongs',
    name: 'searchsongs',
    component: SearchSongs,
    meta: { flag: true }
  },
  {
    path: '/listdetails',
    name: 'listdetails',
    component: ListDetails
  },
]

const router = new VueRouter({
  routes
})

export default router
