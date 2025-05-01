<template>
  <view class="category-page">
    <!-- 搜索框 start -->
    <view class="search-bar-wrapper">
      <SearchBar />
    </view>
    <!-- 搜索框 end -->

    <view class="cates_container">
      <!-- 左侧菜单 start -->
      <scroll-view class="left_menu" scroll-y>
        <view
          class="menu_item"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in leftMenuList"
          :key="index"
          @click="handleItemTap(index)"
        >
          {{ item }}
        </view>
      </scroll-view>
      <!-- 左侧菜单 end -->

      <!-- 右侧产品内容 start -->
      <scroll-view :scroll-top="scrollTop" class="right_content" scroll-y>
        <view
          class="product_group"
          v-for="(item1, index1) in rightContent"
          :key="item1.id"
        >
          <view class="product_title">
            {{ item1.name }}
          </view>
          <view class="product_list">
            <navigator
              v-for="(item2, index2) in item1.productList"
              :key="item2.id"
              :url="`/pages/product_detail/product_detail?id=${item2.id}`"
            >
              <image mode="aspectFit" :src="`${baseUrl}/image/product/${item2.proPic}`"></image>
              <view class="right">
                <view class="product_name">{{ item2.name }}</view>
                <view class="product_price">¥ {{ item2.price}}</view>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
      <!-- 右侧产品内容 end -->
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import { requestUtil, getBaseUrl } from '@/utils/requestUtil.js';
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar, // 确保正确注册了组件
  },
  data() {
    return {
      leftMenuList: [],
      rightContent: [],
      baseUrl: '',
      currentIndex: 0,
      scrollTop: 0,
      Cates: []
    };
  },
  async mounted() {
    try {
      await this.getCates();
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  },
  methods: {
    async getCates() {
      try {
        const result = await requestUtil({ url: "/bigType/findCategories" });
		console.log(result);
        this.Cates = result.data.message || [];
        this.baseUrl = getBaseUrl();

        this.leftMenuList = this.Cates.map(v => v.name);
        if (this.Cates.length > 0 && this.Cates[this.currentIndex]) {
          this.rightContent = this.Cates[this.currentIndex].smallTypeList || [];
        } else {
          this.rightContent = [];
        }
      } catch (error) {
        console.log("Failed to fetch categories:", error);
        this.Cates = [];
        this.rightContent = [];
      }
    },
    handleItemTap(index) {
      if (this.Cates && this.Cates[index]) {
        this.currentIndex = index;
        this.rightContent = this.Cates[index]?.smallTypeList || [];
        this.scrollTop = 0;
      } else {
        console.error(`Invalid category index: ${index}`);
      }
    }
  },
  onShow() {
    const app = getApp();
    const index = app.globalData.index;
    if (index !== -1 && this.Cates.length > 0 && this.Cates[index]) {
      this.handleItemTap(index);
      app.globalData.index = -1;
    } else if (index !== -1) {
      console.error('Invalid category index or data not loaded');
    }
  }
};
</script>

<style scoped>
.page {
  height: 100%;
}

.category-page {
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保页面占满整个高度 */
}

.search-bar-wrapper {
  z-index: 10; /* 确保搜索框在最前方 */
  background-color: #fff;
  position: relative;
  width: 100%;
  padding: 10rpx; /* 增加适当的内边距 */
}

.cates_container {
  flex: 1;
  display: flex;
  height: calc(100vh - 120rpx); /* 考虑搜索框的高度和一些间距 */
}

.left_menu {
  flex: 1;
  background-color: #f8f8f8; /* 左侧菜单的背景颜色 */
  padding: 10rpx;
  box-sizing: border-box;
  overflow-y: auto;
}

.menu_item {
  margin-top: 5rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
  color: #000; /* 默认文字颜色 */
  cursor: pointer;
}

.active {
  background-color: #fff; /* 选中状态背景颜色 */
  color: #ff4c4c; /* 选中状态文字颜色 */
  font-weight: bold;
  border-left: 5rpx solid #ff4c4c; /* 左侧选中边框 */
}

.right_content {
  flex: 3;
  padding: 10rpx;
  box-sizing: border-box;
  overflow-y: auto;
}

.product_group {
  padding: 20rpx;
  background-color: #ffffff; /* 使每个产品组有明显的背景色 */
  margin-bottom: 10rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.product_title {
  font-weight: bolder;
  margin-bottom: 10rpx;
  color: #000; /* 标题颜色设置为黑色 */
}

.product_list navigator {
  margin: 10rpx;
  background-color: #f8f8f8;
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.product_list navigator image {
  flex: 1;
  width: 80rpx;
  height: 80rpx;
  object-fit: contain; /* 保持图片的比例不变 */
}

.product_list navigator .right {
  flex: 3;
  padding-left: 10rpx;
}

.product_name {
  padding-top: 10rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000; /* 名称颜色设置为黑色 */
}

.product_price {
  padding-bottom: 10rpx;
  color: #000; /* 价格颜色设置为黑色 */
  font-size: 28rpx;
}
</style>
