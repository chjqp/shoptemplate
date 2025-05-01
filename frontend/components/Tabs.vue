<template>
  <view class="tabs">
    <view class="tabs_title">
      <view
        v-for="(item, index) in tabs"
        :key="item.id"
        :class="['title_item', item.isActive ? 'active' : '']"
        @tap="handleItemTap(index)"
      >
        {{ item.value }}
      </view>
    </view>
    <view class="tabs_content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleItemTap(index) {
      this.$emit('tabsItemChange', index);
    }
  }
};
</script>

<style scoped>
.tabs {}
.tabs_title {
  display: flex;
}
.title_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 15rpx 0;
}
.active {
  color: var(--themeColor);
  border-bottom: 5rpx solid currentColor;
}
.tabs_content {}
</style>