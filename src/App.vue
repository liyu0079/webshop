<template>
  <div id="app">
    <!-- 挂载头部导航栏 -->
     <HeaderTop v-show="$route.meta.showHeaderTop"/>
    <HeaderSearch v-show="$route.meta.showHeaderSearch"/>
    <keep-alive>
    <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HeaderTop from './components/HeaderTop/HeaderTop'
import HeaderSearch from './components/HeaderSearch/HeaderSearch'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  provide(){
		return{
			reload:this.reload
		}
	},
	data(){
		return{
			isRouterAlive:true
		}
	},
  watch:{
      '$route':"reload"
  },
  mounted() {
    let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if(userInfo){
      this.syncUserInfo(userInfo);
    }
  },
  methods: {
    ...mapActions(['syncUserInfo']),
    reload() {
			this.isRouterAlive=false
			this.$nextTick(function(){
				this.isRouterAlive=true
			})
		}

  },
  components: {
    HeaderTop,
    HeaderSearch
  }
}
</script>

<style>
#app{
    width: 100%;
    height: 100%;
    position: relative;
    list-style: none;
}

</style>
