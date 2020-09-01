<template>
  <div id="app">
    <router-view v-if="showPage"/>
  </div>
</template>
<script>
export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        showPage: true
      }
    },
    methods:{
      reload() {
        this.showPage = false
        this.$nextTick(() => {
          this.showPage = true
        })
      }
    }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
