<template>
  <view>
    <!-- 搜索栏 -->
    <SearchBar />

    <!-- 轮播图部分 -->
    <view class="index_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="swiper in swiperList" :key="swiper.id">
          <image mode="widthFix" :src="`${baseUrl}image/swiper/${swiper.swiperPic}`"></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 商品大类分类部分 -->
    <view class="index_bigType">
      <view class="bigTypeRow">
        <view v-for="(bigType, index) in bigTypeList_row1" :key="bigType.id" @click="handleTypeJump(index)">
          <image mode="widthFix" :src="`${baseUrl}image/bigType/${bigType.image}`"></image>
        </view>
      </view>
      <view class="bigTypeRow">
        <view v-for="(bigType, index) in bigTypeList_row2" :key="bigType.id" @click="handleTypeJump(index + 5)">
          <image mode="widthFix" :src="`${baseUrl}image/bigType/${bigType.image}`"></image>
        </view>
      </view>
    </view>

    <!-- 商品热卖推荐 -->
    <view class="index_hot_product">
      <view class="product_title">
        热卖推荐
      </view>
      <view class="list">
        <view class="product_detail" v-for="(hotProduct, index) in hotProductList" :key="hotProduct.id">
          <navigator :url="`/pages/product_detail/product_detail?id=${hotProduct.id}`">
            <image mode="widthFix" :src="`${baseUrl}image/product/${hotProduct.proPic}`"></image>
            <view class="product_name">{{ hotProduct.name }}</view>
            <view class="product_price">¥ {{ hotProduct.price }}</view>
            <button size="mini" type="warn">立即查看</button>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { requestUtil, getBaseUrl } from '@/utils/requestUtil.js';
import SearchBar from '@/components/SearchBar.vue';

const swiperList = ref([]);
const baseUrl = ref('');
const bigTypeList_row1 = ref([]);
const bigTypeList_row2 = ref([]);
const hotProductList = ref([]);

onMounted(async () => {
	
  await getSwiperList();
  await getBigTypeList();
  await getHotProductList();
});

const getSwiperList = async () => {
  try {
    const result = await requestUtil({ url: "/product/findSwiper" });
    baseUrl.value = getBaseUrl();
    swiperList.value = result.data.swiperList;
  } catch (error) {
    console.error('请求失败', error);
  }
};

const getBigTypeList = async () => {
  try {
    const result = await requestUtil({ url: "/bigType/findAll" });
    bigTypeList_row1.value = result.data.message.filter((item, index) => index < 5);
    bigTypeList_row2.value = result.data.message.filter((item, index) => index >= 5);
  } catch (error) {
    console.error('请求失败', error);
  }
};

const getHotProductList = async () => {
  try {
    const result = await requestUtil({ url: "/product/findHot" });
    hotProductList.value = result.data.message;
  } catch (error) {
    console.error('请求失败', error);
  }
};

// 实现跳转到分类页面并传递当前分类的索引
const handleTypeJump = (index) => {
  console.log('跳转到分类：', index);

  // 设置全局变量，保存当前点击的分类索引
  const app = getApp();
  app.globalData.index = index;

  // 跳转到 category 页面
  uni.switchTab({
    url: '/pages/category/category'
  });
};
</script>


<style scoped>
.index_swiper {
  width: 100%;
  height: 375rpx;
  overflow: hidden;
}

.index_swiper swiper image {
  width: 100%;
}

.index_bigType {
  padding-top: 20rpx;
  background-color: #F7F7F7;
}

.index_bigType .bigTypeRow {
  display: flex;
}

.index_bigType .bigTypeRow view {
  flex: 1;
}

.index_bigType .bigTypeRow view image {
  width: 150rpx;
}

.index_hot_product .product_title {
  font-size: 32rpx;
  background-color: #E0E0E0;
  font-weight: 600;
  padding: 20rpx;
  color: var(--themeColor);
}

.index_hot_product .list {
  display: flex;
  flex-wrap: wrap;
}

.index_hot_product .list .product_detail {
  margin: 15rpx;
  width: 46%;
  text-align: center;
}

.index_hot_product .list .product_detail navigator image {
	width:100%;
  background-color: #F5F5F5;
}

.index_hot_product .list .product_detail .product_name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.index_hot_product .list .product_detail .product_price {
  color: var(--themeColor);
}
</style>
