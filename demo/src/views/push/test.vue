<template>
      <div>
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <slot></slot>
        <slot :data="data" name="cool"></slot>
      </div>
</template>
<script>
  export default{
    data(){
      return {
        data:[1,1,23,5,6]
      }
    }
  }
</script>
