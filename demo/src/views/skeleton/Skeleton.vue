<template>

  <div class="skeleton-wrapper">
    <style>
      *,:after,:before{box-sizing:border-box}.lvc{display:box;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-justify-content:center;-ms-justify-content:center;-o-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-align-items:center;-ms-align-items:center;-o-align-items:center;align-items:center}html,body{width:100%;height:100%;overflow:hidden;margin:0;padding:0}.skeleton-wrapper{width:100%;height:100%;font-size:14px;color:#b9babd}.ivu-layout.ivu-layout-has-sider{-webkit-box-orient:horizontal;-webkit-flex-direction:row;-moz-flex-direction:row;-ms-flex-direction:row;-o-flex-direction:row;flex-direction:row}.ivu-layout{display:box;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-moz-flex-direction:column;-ms-flex-direction:column;-o-flex-direction:column;flex-direction:column;background:#fcfbfe;height:100%}.layout-header{background:#fff;height:60px;line-height:60px}.layout-sider{height:800px;width:190px;background:#fff}.layout-content{-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:26px;height:100%}.top{height:120px;background:#fff}.center,.bottom{height:300px;background:#fff;margin:26px 0}.footer{height:calc(100% - 120px)}
    </style>
    <div class="ivu-layout">
      <div class="layout-header ivu-layout-header lvc">加载中...</div>
      <div class="ivu-layout ivu-layout-has-sider">
        <div class="layout-sider lvc">加载中...</div>
        <div class="layout-content">
          <div class="top lvc">加载中...</div>
          <div class="footer">
            <div class="center lvc">加载中...</div>
            <div class="bottom lvc">加载中...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>
