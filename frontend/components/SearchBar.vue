<template>
  <view class="search-bar">
    <!-- 搜索图标 -->
    <uni-icons
      class="search-icon"
      type="search"
      size="22"
      color="#999"
    />
    <!-- 搜索输入框 -->
    <input
      class="search-input"
      v-model="searchQuery"
      placeholder="请输入搜索内容"
      @focus="onFocus"
    />
  </view>
</template>

<script setup>
// 处理聚焦事件，跳转到搜索页面
const onFocus = () => {
  uni.navigateTo({
    url: `/pages/search/search`
  });
};
</script>

<style scoped>
.search-bar {
  position: relative;
  width: 90%; /* 调整宽度，使其更加居中 */
  margin: 10rpx auto; /* 添加外边距使其不紧贴顶部 */
  height: 60rpx;
  border: 1rpx solid #FF5700; /* 设置橙色边框 */
  border-radius: 30rpx; /* 圆角 */
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.search-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 28rpx;
  color: #666;
  background-color: transparent;
  margin-left: 10rpx; /* 搜索图标与文字之间留出一些间距 */
}

.search-icon {
  flex-shrink: 0;
}
</style>
