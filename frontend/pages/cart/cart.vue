<template>
  <view class="revice_address_row">
    <!-- 当收货地址 不存在 按钮显示 -->
    <view class="address_btn" v-if="!address.userName">
      <button @click="handleChooseAddress" type="warn" plain>获取地址</button>
    </view>
    <!-- 当收货地址 存在 详细信息就显示 -->
    <view v-else class="user_info_row">
      <view class="user_info">
        <view>本人：{{ address.userName }}，{{ address.telNumber }}</view>
        <view>{{ address.provinceName + address.cityName + address.countyName + address.detailInfo }}</view>
      </view>
      <view class="change_address">
        <button @click="handleChooseAddress" size="mini" type="default" plain>更换地址</button>
      </view>
    </view>
  </view>

  <!-- 购物车 开始 -->
  <view class="cart_content">
    <view class="cart_main">
      <template v-if="cart.length !== 0">
        <view class="cart_item" v-for="(item, index) in cart" :key="item.goods_id">
          <!-- 复选框 -->
          <view class="cart_chk_wrap">
            <checkbox-group :data-id="item.id" @change="handleItemChange(item.id)">
              <checkbox :checked="item.checked"></checkbox>
            </checkbox-group>
          </view>
          <!-- 商品图片 -->
          <navigator class="cart_img_wrap" :url="`/pages/product_detail/index?id=${item.id}`">
            <image mode="widthFix" :src="`${baseUrl}image/product/${item.proPic}`"></image>
          </navigator>
          <!-- 商品信息 -->
          <view class="cart_info_warp">
            <navigator :url="`/pages/product_detail/index?id=${item.id}`">
              <view class="goods_name">{{ item.name }}</view>
            </navigator>
            <view class="goods_price_wrap">
              <view class="goods_price">¥{{ item.price }}</view>
              <view class="cart_num_tool">
                <view class="num_edit" @click="handleItemNumEdit(item.id, -1)">–</view>
                <view class="goods_num">{{ item.num }}</view>
                <view class="num_edit" @click="handleItemNumEdit(item.id, 1)">+</view>
              </view>
            </view>
          </view>
        </view>
      </template>
      <template v-else>
        <image mode="widthFix" src="@/static/icons/empty.gif"></image>
      </template>
    </view>
  </view>
  <!-- 购物车 结束 -->

  <!-- 底部工具栏 -->
  <view class="footer_tool">
    <!--全选-->
    <view class="all_chk_wrap">
      <checkbox-group @change="handleItemAllCheck">
        <checkbox :checked="allChecked">
          <text decode>&nbsp;&nbsp;全选</text>
        </checkbox>
      </checkbox-group>
    </view>

    <!-- 总价格 -->
    <view class="total_price_wrap">
      <view class="total_price">
        合计：<text class="total_price_text">¥{{ totalPrice }}</text>
      </view>
    </view>

    <!-- 结算 -->
    <view class="order_pay_wrap" @click="handlePay">
      确认({{ totalNum }})
    </view>
  </view>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import { getBaseUrl, requestUtil } from '@/utils/requestUtil.js';

// const address = ref({});
// const cart = ref([]);
// const baseUrl = ref('');
// const allChecked = ref(false);
// const totalPrice = ref(0);
// const totalNum = ref(0);

// // 点击 获取收货地址
// const handleChooseAddress = () => {
	
//   uni.chooseAddress({
//     success: (result) => {
//       console.log(result);
//       uni.setStorageSync('address', result);
//       address.value = result;
//     },
// 	fail:(result)=>{
// 		console.log(result);
// 	}
//   });
// };

// // 商品数量的编辑功能
// const handleItemNumEdit = (id, operation) => {
//   const index = cart.value.findIndex(v => v.id === id);
//   if (cart.value[index].num === 1 && operation === -1) {
//     uni.showModal({
//       title: '系统提示',
//       content: '您是否要删除？',
//       success: (res) => {
//         if (res.confirm) {
//           cart.value.splice(index, 1);
//           setCart(cart.value);
//         }
//       },
//     });
//   } else {
//     cart.value[index].num += operation;
//     setCart(cart.value);
//   }
// };

// // 商品选中
// const handleItemChange = (id) => {
//   const index = cart.value.findIndex(v => v.id === id);
//   cart.value[index].checked = !cart.value[index].checked;
//   setCart(cart.value);
// };

// // 商品全选功能
// const handleItemAllCheck = () => {
//   allChecked.value = !allChecked.value;
//   cart.value.forEach(v => v.checked = allChecked.value);
//   setCart(cart.value);
// };

// // 设置购物车状态 同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
// const setCart = (cartData) => {
//   let allCheckedTemp = true;
//   let totalPriceTemp = 0;
//   let totalNumTemp = 0;
//   cartData.forEach(v => {
//     if (v.checked) {
//       totalPriceTemp += v.num * v.price;
//       totalNumTemp += v.num;
//     } else {
//       allCheckedTemp = false;
//     }
//   });
//   allChecked.value = cartData.length !== 0 ? allCheckedTemp : false;
//   totalPrice.value = totalPriceTemp;
//   totalNum.value = totalNumTemp;
//   cart.value = cartData;
//   uni.setStorageSync('cart', cartData);
// };

// // 点击结算
// const handlePay = () => {
//   if (!address.value.userName) {
//     uni.showToast({
//       title: '您还没有选择收货地址',
//       icon: 'none',
//     });
//     return;
//   }
//   if (totalNum.value === 0) {
//     uni.showToast({
//       title: '您还没有选购商品',
//       icon: 'none',
//     });
//     return;
//   }
//   uni.navigateTo({
//     url: '/pages/pay/pay',
//   });
// };

// onMounted(() => {
//   baseUrl.value = getBaseUrl();
//   const storedAddress = uni.getStorageSync('address');
//   const storedCart = uni.getStorageSync('cart') || [];
//   address.value = storedAddress;
//   setCart(storedCart);
// });


import { ref, onMounted, watch } from 'vue';  // 导入 watch
import { cart, address, setCart, setAddress } from '@/utils/cartStore.js';
import { getBaseUrl } from '@/utils/requestUtil.js';

const baseUrl = ref('');
const allChecked = ref(false);
const totalPrice = ref(0);
const totalNum = ref(0);

// 点击 获取收货地址
const handleChooseAddress = () => {
  uni.chooseAddress({
    success: (result) => {
      console.log(result);
      setAddress(result);  // 使用 setAddress 来更新地址
    },
    fail: (result) => {
      console.log(result);
    }
  });
};

// 商品数量的编辑功能
const handleItemNumEdit = (id, operation) => {
  const index = cart.value.findIndex(v => v.id === id);
  if (cart.value[index].num === 1 && operation === -1) {
    uni.showModal({
      title: '系统提示',
      content: '您是否要删除？',
      success: (res) => {
        if (res.confirm) {
          cart.value.splice(index, 1);
          setCart(cart.value);  // 使用 setCart 来更新购物车
        }
      },
    });
  } else {
    cart.value[index].num += operation;
    setCart(cart.value);  // 使用 setCart 来更新购物车
  }
};

// 商品选中
const handleItemChange = (id) => {
  const index = cart.value.findIndex(v => v.id === id);
  cart.value[index].checked = !cart.value[index].checked;
  setCart(cart.value);  // 使用 setCart 来更新购物车
};

// 商品全选功能
const handleItemAllCheck = () => {
  allChecked.value = !allChecked.value;
  cart.value.forEach(v => v.checked = allChecked.value);
  setCart(cart.value);  // 使用 setCart 来更新购物车
};

// 设置购物车状态 同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
const updateCartState = () => {
  let allCheckedTemp = true;
  let totalPriceTemp = 0;
  let totalNumTemp = 0;
  cart.value.forEach(v => {
    if (v.checked) {
      totalPriceTemp += v.num * v.price;
      totalNumTemp += v.num;
    } else {
      allCheckedTemp = false;
    }
  });
  allChecked.value = cart.value.length !== 0 ? allCheckedTemp : false;
  totalPrice.value = totalPriceTemp;
  totalNum.value = totalNumTemp;
};

// 点击结算
const handlePay = () => {
  if (!address.value.userName) {
    uni.showToast({
      title: '您还没有选择收货地址',
      icon: 'none',
    });
    return;
  }
  if (totalNum.value === 0) {
    uni.showToast({
      title: '您还没有选购商品',
      icon: 'none',
    });
    return;
  }
  uni.navigateTo({
    url: '/pages/pay/pay',
  });
};

onMounted(() => {
  baseUrl.value = getBaseUrl();
  updateCartState();  // 初始化时更新购物车状态
});

// 监听购物车的变化来更新状态
watch(cart, updateCartState, { deep: true });


</script>

<style scoped>
.revice_address_row {
  padding-bottom: 70rpx;
}
.revice_address_row .address_btn {
  padding: 20rpx;
}
.revice_address_row .address_btn button {
  width: 60%;
}
.revice_address_row .user_info_row {
  padding: 20rpx;
  display: flex;
}
.revice_address_row .user_info_row .user_info {
  flex: 5;
}
.revice_address_row .user_info_row .change_address {
  flex: 3;
  text-align: right;
}
.revice_address_row .change_address button {
  border: 1px solid gray;
  font-weight: normal;
}
.cart_content {
  background-color: #f5f5f5;
}
.cart_content .cart_main {
  padding: 2rpx 10rpx 10rpx 10rpx;
}
.cart_content .cart_item {
  display: flex;
  background-color: white;
  border-radius: 10px;
  margin: 20rpx;
  padding-right: 20rpx;
}
.cart_content .cart_chk_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.cart_content .cart_img_wrap {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  margin: 20rpx;
  border-radius: 10px;
}
.cart_content .cart_img_wrap image {
  width: 80%;
}
.cart_content .cart_info_warp {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cart_content .cart_info_warp .goods_name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bolder;
}
.cart_content .cart_info_warp .goods_price_wrap {
  display: flex;
  justify-content: space-between;
}
.cart_content .cart_info_warp .goods_price_wrap .goods_price {
  color: var(--themeColor);
  font-size: 34rpx;
}
.cart_content .cart_info_warp .goods_price_wrap .cart_num_tool {
  display: flex;
}
.cart_content .cart_info_warp .goods_price_wrap .cart_num_tool .num_edit {
  width: 55rpx;
  height: 55rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}
.cart_info_warp .goods_price_wrap .cart_num_tool .goods_num {
  width: 85rpx;
  height: 55rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.footer_tool {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90rpx;
  background-color: #fff;
  display: flex;
  border-top: 1px solid #ccc;
}
.footer_tool .all_chk_wrap {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 25rpx;
}
.footer_tool .total_price_wrap {
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer_tool .total_price_wrap .total_price .total_price_text {
  color: var(--themeColor);
  font-size: 34rpx;
  font-weight: bold;
}
.footer_tool .order_pay_wrap {
  margin: 10rpx;
  flex: 3;
  background-image: linear-gradient(90deg, #ff740b, #fe6227);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}
</style>