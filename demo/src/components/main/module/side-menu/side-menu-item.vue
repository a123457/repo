<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''" />
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
          <common-icon :type="item.children[0].icon || ''" />
          <span>{{ showTitle(item.children[0]) }}</span>
        </menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item
          v-contextmenu:contextmenu
          v-else
          :name="getNameOrHref(item)"
          :key="`menu-${item.name}`"
        >
          <common-icon :type="item.icon || ''" />
          <span>{{ showTitle(item) }}</span>
        </menu-item>
      </template>
    </template>
    <div>
      <v-contextmenu ref="contextmenu" @contextmenu="contextmenu">
        <v-contextmenu-item @click="reloads">刷新当前页面</v-contextmenu-item>
        <v-contextmenu-item @click="returnHome">返回首页</v-contextmenu-item>
        <v-contextmenu-item @click="newWindowOpen">在新窗口打开</v-contextmenu-item>
        <v-contextmenu-item>在新页面打开</v-contextmenu-item>
      </v-contextmenu>
    </div>
  </Submenu>
</template>
<script>
import mixin from "./mixin";
import itemMixin from "./item-mixin";
export default {
  name: "SideMenuItem",
  mixins: [mixin, itemMixin],
  inject: ["reload"],
  data() {
    return {
      routerName: ""
    };
  },
  methods: {
    contextmenu(event) {
      this.routerName = event.key.split("-")[1];
    },
    reloads() {
      this.reload()
    },
    returnHome() {
      this.$router.push({
        name: "app"
      })
    },
    newWindowOpen() {
      const {href} = this.$router.resolve({
        name: this.routerName
      })
      window.open(href, '_blank')
    }
  }
};
</script>
