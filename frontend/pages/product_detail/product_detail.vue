<template>
  <view v-if="productObj">
    <!-- 产品轮播图部分 -->
    <view class="product_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="(item, index) in productObj.productSwiperImageList" :key="index">
          <image mode="aspectFill" :src="`${baseUrl}image/productSwiperImgs/${item.image}`" class="swiper_image"></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 产品价格 -->
    <view class="product_price">¥{{ productObj.price }}</view>

    <!-- 产品名称 -->
    <view class="product_name">{{ productObj.name }}</view>

    <!-- 产品描述 -->
    <view class="product_description">{{ productObj.description }}</view>

    <!-- 标签页 -->
    <view class="desc_tabs">
      <view class="tabs_title">
        <view
          class="title_item"
          :class="{ active: activeIndex === 0 }"
          @click="activeIndex = 0"
        >商品介绍</view>
        <view
          class="title_item"
          :class="{ active: activeIndex === 1 }"
          @click="activeIndex = 1"
        >规格参数</view>
      </view>
      <view class="tabs_content">
        <block v-if="activeIndex === 0">
          <rich-text :nodes="productObj.productIntroImgs"></rich-text>
        </block>
        <block v-else-if="activeIndex === 1">
          <rich-text :nodes="productObj.productParaImgs"></rich-text>
        </block>
      </view>
    </view>
  </view>

  <!-- 底部工具栏 -->
  <view class="btm_tool">
    <navigator open-type="switchTab" url="/pages/index/index" class="tool_item">
      <view class="iconfont icon-zhuye"></view>
      <view>首页</view>
    </navigator>

    <view class="tool_item">
      <view class="iconfont icon-kefu"></view>
      <view>客服</view>
      <button open-type="contact"></button>
    </view>

    <navigator open-type="switchTab" url="/pages/cart/cart" class="tool_item">
      <view class="iconfont icon-daohanggouwuche"></view>
      <view>小推车</view>
    </navigator>

    <view class="tool_item btn_cart" @click="addToCart">
      <view>加入小推车</view>
    </view>

    <view class="tool_item btn_buy" @click="buyNow">
      <view>立即确定</view>
    </view>
  </view>
</template>

<script setup>
// import { onMounted, ref } from 'vue';
// import { requestUtil, getBaseUrl } from '@/utils/requestUtil.js';
// import { setCart, cart } from '@/utils/cartStore.js';

// const productObj = ref(null); // 初始化为 null，避免未加载时的错误
// const baseUrl = ref('');
// const activeIndex = ref(0);

// // 获取产品信息
// const getProductDetail = async (id) => {
//   try {
//     const result = await requestUtil({ url: "/product/detail", data: { id } });
//     productObj.value = result.data.message;
//     console.log(result);
//   } catch (error) {
//     console.error('请求失败', error);
//   }
// };

// // 页面加载时获取传递的参数
// onMounted(() => {
//   baseUrl.value = getBaseUrl();
//   const pages = getCurrentPages(); // 获取当前页面栈
//   const currentPage = pages[pages.length - 1]; // 获取当前页面对象
//   const id = currentPage.options.id;  // 获取传递过来的商品ID
//   getProductDetail(id);
// });

// // 加入小推车事件
// const addToCart = () => {
//   setCartAdd();
//   let cart = uni.getStorageSync('cart') || [];
//   // setCartAdd();
//   console.log(cart);
//   // 弹窗提示
//   uni.showToast({
//     title: '加入成功',
//     icon: 'success',
//     mask: true
//   });
// };

// // 加入小推车逻辑
// const setCartAdd = () => {
//   // 获取缓存中的小推车，数组格式
//   let cart = uni.getStorageSync('cart') || [];
//   // 判断商品对象是否存在于小推车数组中
//   let index = cart.findIndex(v => v.id === productObj.value.id);
//   if (index === -1) { // 不存在
//     productObj.value.num = 1;
//     cart.push(productObj.value);
//   } else { // 已经存在
//     cart[index].num++;
//   }
//   uni.setStorageSync('cart', cart); // 把小推车添加到缓存中
// };

// // 立即购买事件
// const buyNow = () => {
//   setCartAdd();
//   // 实现立即购买逻辑，跳转到小推车页面
//   uni.switchTab({
//     url: '/pages/cart/cart'
//   });
// };
import { onMounted, ref } from 'vue';
import { requestUtil, getBaseUrl } from '@/utils/requestUtil.js';
import { setCart, cart } from '@/utils/cartStore.js'; // 引入购物车状态管理

const productObj = ref(null); // 初始化为 null，避免未加载时的错误
const baseUrl = ref('');
const activeIndex = ref(0);

// 获取产品信息
const getProductDetail = async (id) => {
  try {
    const result = await requestUtil({ url: "/product/detail", data: { id } });
    productObj.value = result.data.message;
    console.log(result);
  } catch (error) {
    console.error('请求失败', error);
  }
};

// 页面加载时获取传递的参数
onMounted(() => {
  baseUrl.value = getBaseUrl();
  const pages = getCurrentPages(); // 获取当前页面栈
  const currentPage = pages[pages.length - 1]; // 获取当前页面对象
  const id = currentPage.options.id;  // 获取传递过来的商品ID
  getProductDetail(id);
});

// 加入小推车事件
const addToCart = () => {
  if (!productObj.value) return; // 确保产品数据已加载
  setCartAdd();
  // 弹窗提示
  uni.showToast({
    title: '加入成功',
    icon: 'success',
    mask: true
  });
};

// 加入小推车逻辑
const setCartAdd = () => {
  // 获取缓存中的小推车，数组格式
  let currentCart = cart.value; // 从全局 cart 引用获取当前购物车数据
  // 判断商品对象是否存在于小推车数组中
  let index = currentCart.findIndex(v => v.id === productObj.value.id);
  if (index === -1) { // 不存在
    productObj.value.num = 1;
    currentCart.push(productObj.value);
  } else { // 已经存在
    currentCart[index].num++;
  }
  setCart(currentCart); // 使用 setCart 来更新购物车状态
};

// 立即购买事件
const buyNow = () => {
  if (!productObj.value) return; // 确保产品数据已加载
  setCartAdd();
  // 实现立即购买逻辑，跳转到小推车页面
  uni.switchTab({
    url: '/pages/cart/cart'
  });
};
</script>

<style scoped>
.page {
  padding-bottom: 90rpx;
}

.product_swiper {
  width: 100%;
  height: 375rpx;
  overflow: hidden;
}

.product_swiper swiper {
  width: 100%;
  height: 100%;
}

.swiper_image {
  width: 100%;
  height: 100%;
}

.product_price {
  padding: 15rpx;
  font-size: 42rpx;
  font-weight: 600;
  color: var(--themeColor);
}

.product_name {
  padding: 15rpx;
  font-size: 40rpx;
  font-weight: 600;
  border-top: 1rpx solid #dedede;
}

.product_description {
  padding: 0 10rpx 25rpx 10rpx;
  border-bottom: 1rpx solid #dedede;
}

.desc_tabs .tabs_title {
  display: flex;
}

.desc_tabs .tabs_title .title_item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
}

.desc_tabs .tabs_title .active {
  color: var(--themeColor);
}

.desc_tabs .tabs_content rich-text img {
  width: 100%;
}

.btm_tool {
  padding: 15rpx;
  border-top: 1px solid #ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 140rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.btm_tool .tool_item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  position: relative;
}

.btm_tool .tool_item button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.btm_tool .btn_cart {
  flex: 2;
  background-image: linear-gradient(90deg, #fbbd00, #f7971e); /* 更加柔和的渐变 */
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
  border-radius: 20rpx; /* 统一圆角 */
  margin-right: 10rpx; /* 增加按钮之间的间距 */
  padding: 10rpx 0; /* 增加按钮的内边距 */
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 柔和的阴影效果 */
}

.btm_tool .btn_buy {
  flex: 2;
  background-image: linear-gradient(90deg, #ff6034, #ee0a24); /* 更加柔和的渐变 */
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
  border-radius: 20rpx; /* 统一圆角 */
  padding: 10rpx 0; /* 增加按钮的内边距 */
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 柔和的阴影效果 */
}

</style>
