<template>
  <!-- 收货地址 开始 -->
  <view class="revice_address_row">
    <view>
      <view class="user_info">
        <view class="user_info_item">{{ address.provinceName + address.cityName + address.countyName }}</view>
        <view class="user_info_item user_info_detail">{{ address.detailInfo }}</view>
        <text class="user_info_item">{{ address.userName }}&nbsp;&nbsp;{{ address.telNumber }}</text>
      </view>
    </view>
  </view>
  <!-- 收货地址 结束 -->

  <!-- 购物车 开始 -->
  <view class="cart_content">
    <view class="cart_main">
      <view class="cart_item" v-for="(item, index) in cart" :key="item.goods_id">
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
              <text class="goods_num">×{{ item.num }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!--  结束 -->

  <!-- 底部工具栏 -->
  <view class="footer_tool">
    <!-- 总价格 -->
    <view class="total_price_wrap">
      <view class="total_price">
        共{{ totalNum }}件,合计
        <text class="total_price_text">&nbsp;¥{{ totalPrice }}</text>
      </view>
    </view>

    <!-- 结算 -->
    <view class="order_pay_wrap" @click="handleOrderPay">
      确认
    </view>
  </view>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import { getBaseUrl, requestUtil, getLogin, getUserProfile, requestPay } from '@/utils/requestUtil.js';

// const address = ref({});
// const cart = ref([]);
// const baseUrl = ref('');
// const totalPrice = ref(0);
// const totalNum = ref(0);
// const token=ref('');

// onMounted(() => {
//   baseUrl.value = getBaseUrl();

//   const storedAddress = uni.getStorageSync('address');
//   let storedCart = uni.getStorageSync('cart') || [];
//    token.value = uni.getStorageSync('token') || '';
//   // let token =uni.getStorageSync('token')||'';
//   // 过滤已选中的商品
//   storedCart = storedCart.filter(v => v.checked);

//   // 计算总价格和总数量
//   let totalPriceTemp = 0;
//   let totalNumTemp = 0;
//   storedCart.forEach(v => {
//     totalPriceTemp += v.num * v.price;
//     totalNumTemp += v.num;
//   });

//   address.value = storedAddress;
//   cart.value = storedCart;
//   totalPrice.value = totalPriceTemp;
//   totalNum.value = totalNumTemp;
// });

// // const handleOrderPay = async () => {
// // 	// uni.login({
// // 	//   provider: 'weixin',
// // 	//   timeout: 5000,
// // 	//   success: (res) => {
// // 	//     console.log("code=" + res.code);
// // 	//   }
// // 	// });
	
	
// // 	// let ret=await getLogin();
// // 	// console.log(ret.code);
	
	
// // 	// let res2 = await getUserProfile();
// // 	// console.log(res2.userInfo.nickName, res2.userInfo.avatarUrl);
	
	
// // 	Promise.all([getLogin(),getUserProfile()]).then((res)=>{
// // 	      console.log(res[0].code)
// // 	      console.log(res[1].userInfo.nickName,res[1].userInfo.avatarUrl)
		  
// // 		  let loginParam={
// // 			  code:res[0].code,
// // 			  nickName:res[1].userInfo.nickName,
// // 			  avatarUrl:res[1].userInfo.avatarUrl
// // 		  }
// // 		  console.log(loginParam)
// // 		  uni.setStorageSync('userInfo',res[1].userInfo);
// // 		  this.wxlogin(loginParam);
// // 	    })
	
	
// //   // const token = uni.getStorageSync('token');
// //   // if (!token) {
// //   //   Promise.all([getLogin(), getUserProfile()]).then(res => {
// //   //     const loginParam = {
// //   //       code: res[0].code,
// //   //       nickName: res[1].userInfo.nickName,
// //   //       avatarUrl: res[1].userInfo.avatarUrl
// //   //     };
// //   //     wxlogin(loginParam);
// //   //   });
// //   // } else {
// //   //   createOrder(token);
// //   // }
// // };


// // const handleOrderPay = async () => {
// //   try {
// //     const [loginRes, userProfileRes] = await Promise.all([getLogin(), getUserProfile()]);
// //     console.log(loginRes.code);
// //     console.log(userProfileRes.userInfo.nickName, userProfileRes.userInfo.avatarUrl);

// //     const loginParam = {
// //       code: loginRes.code,
// //       nickName: userProfileRes.userInfo.nickName,
// //       avatarUrl: userProfileRes.userInfo.avatarUrl
// //     };
// //     console.log(loginParam);
// //     uni.setStorageSync('userInfo', userProfileRes.userInfo);
// //     await wxlogin(loginParam);
// //   } catch (error) {
// //     console.error("处理订单支付失败", error);
// //   }
// // };
// const handleOrderPay = async () => {
//   // 判断缓存中是否有token
  
//   if (!token.value) {
//     try {
//       const [loginRes, userProfileRes] = await Promise.all([getLogin(), getUserProfile()]);
//       console.log(loginRes, userProfileRes);
//       const loginParam = {
//         code: loginRes.code,
//         nickName: userProfileRes.userInfo.nickName,
//         avatarUrl: userProfileRes.userInfo.avatarUrl
//       };
//       console.log(loginParam);
//       // 把用户信息放到缓存中
//       uni.setStorageSync('userInfo', userProfileRes.userInfo);
//       await wxlogin(loginParam);
//     } catch (error) {
//       console.error("登录失败", error);
//     }
//   } else {
//     console.log("token:" + token.value);
//     console.log("支付继续走，创建订单");
//     // 走支付 创建订单
//     await createOrder(token.value);
//   }
// };


// /**
//  * 请求后端获取用户token
//  * @param {Object} loginParam 
//  */
// const wxlogin = async (loginParam) => {
//   try {
//     const result = await requestUtil({
//       url: "/user/wxlogin",
//       data: loginParam,
//       method: "POST"
//     });
//     console.log(result);
// 	 token.value=result.data.token;
// 	 this.createOrder(token.value);
//   } catch (error) {
//     console.error("请求用户token失败", error);
//   }
// };









// // const wxlogin = async (loginParam) => {
// //   const result = await requestUtil({
// //     url: "/users/wxlogin",
// //     data: loginParam,
// //     method: "post"
// //   });

// //   if (result.code === 0) {
// //     const token = result.token;
// //     uni.setStorageSync('token', token);
// //     createOrder(token);
// //   }
// // };

// const createOrder = async (token) => {
//   try {
//     const totalPriceValue = totalPrice.value;
//     const addressValue = address.value.provinceName + address.value.cityName + address.value.countyName + address.value.detailInfo;
//     const consignee = address.value.userName;
//     const telNumber = address.value.telNumber;

//     const goods = cart.value.map(v => ({
//       goodsId: v.id,
//       goodsNumber: v.num,
//       goodsPrice: v.price,
//       goodsName: v.name,
//       goodsPic: v.proPic
//     }));

//     const orderParams = {
//       totalPrice: totalPriceValue,
//       address: addressValue,
//       consignee,
//       telNumber,
//       goods
//     };

//     const res = await requestUtil({
//       url: "/my/order/create",
//       method: "POST",
//       data: orderParams
//     });

//     const orderNo = res.orderNo;

//     // 处理支付逻辑（已注释）
//     // const preparePayRes = await requestUtil({
//     //   url: "/my/order/preparePay",
//     //   method: "POST",
//     //   data: { orderNo }
//     // });
//     // await requestPay(preparePayRes);

//     // 删除已支付的商品
//     let newCart = uni.getStorageSync('cart') || [];
//     newCart = newCart.filter(v => !v.checked);
//     uni.setStorageSync('cart', newCart);

//     uni.showToast({
//       title: '支付成功',
//       icon: 'none'
//     });

//     uni.navigateTo({
//       url: '/pages/order/index?type=0',
//     });

//   } catch (error) {
//     uni.showToast({
//       title: '支付失败',
//       icon: 'none'
//     });
//   }
// };






import { ref, onMounted } from 'vue';
import { getBaseUrl, requestUtil, getLogin, getUserProfile, requestPay } from '@/utils/requestUtil.js';
import { cart, address, setCart, setAddress } from '@/utils/cartStore.js';

// const address = ref({});
// const cart = ref([]);
const baseUrl = ref('');
const totalPrice = ref(0);
const totalNum = ref(0);
const token = ref('');


onMounted(() => {
  baseUrl.value = getBaseUrl();

  const storedAddress = uni.getStorageSync('address');
  let storedCart = uni.getStorageSync('cart') || [];
  token.value = uni.getStorageSync('token') || '';
  
  // 过滤已选中的商品
  storedCart = storedCart.filter(v => v.checked);

  // 计算总价格和总数量
  let totalPriceTemp = 0;
  let totalNumTemp = 0;
  storedCart.forEach(v => {
    totalPriceTemp += v.num * v.price;
    totalNumTemp += v.num;
  });

  address.value = storedAddress;
  cart.value = storedCart;
  totalPrice.value = totalPriceTemp;
  totalNum.value = totalNumTemp;
});

// 处理订单支付
const handleOrderPay = async () => {
  // 判断缓存中是否有token
  if (!token.value) {
    try {
      const [loginRes, userProfileRes] = await Promise.all([getLogin(), getUserProfile()]);
      console.log(loginRes, userProfileRes);
      const loginParam = {
        code: loginRes.code,
        nickName: userProfileRes.userInfo.nickName,
        avatarUrl: userProfileRes.userInfo.avatarUrl
      };
      console.log(loginParam);
      // 把用户信息放到缓存中
      uni.setStorageSync('userInfo', userProfileRes.userInfo);
      await wxlogin(loginParam);
    } catch (error) {
      console.error("登录失败", error);
    }
  } else {
    console.log("token:" + token.value);
    console.log("支付继续走，创建订单");
    // 走支付 创建订单
    await createOrder(token.value);
  }
};

/**
 * 请求后端获取用户token
 * @param {Object} loginParam 
 */
const wxlogin = async (loginParam) => {
  try {
    const result = await requestUtil({
      url: "/user/wxlogin",
      data: loginParam,
      method: "POST"
    });
    console.log(result);
    token.value = result.data.token;
	uni.setStorageSync('token', token.value);
	console.log("wxlogin"+token.value);
    // 直接调用 createOrder 而不是 this.createOrder
    await createOrder(token.value);
  } catch (error) {
    console.error("请求用户token失败", error);
  }
};

// const createOrder = async (token) => {
//   try {
//     const totalPriceValue = totalPrice.value;
//     const addressValue = address.value.provinceName + address.value.cityName + address.value.countyName + address.value.detailInfo;
//     const consignee = address.value.userName;
//     const telNumber = address.value.telNumber;

//     const goods = cart.value.map(v => ({
//       goodsId: v.id,
//       goodsNumber: v.num,
//       goodsPrice: v.price,
//       goodsName: v.name,
//       goodsPic: v.proPic
//     }));

//     const orderParams = {
//       totalPrice: totalPriceValue,
//       address: addressValue,
//       consignee,
//       telNumber,
//       goods
//     };

//     const res = await requestUtil({
//       url: "/my/order/create",
//       method: "POST",
//       data: orderParams,
// 	  header: { "token": token } // 直接在这里设置 token
//     });
// 	console.log(token.value);

//     const orderNo = res.orderNo;
// 	console.log("order"+orderNo.value);

//     // 处理支付逻辑（已注释）
//     // const preparePayRes = await requestUtil({
//     //   url: "/my/order/preparePay",
//     //   method: "POST",
//     //   data: { orderNo }
//     // });
//     // await requestPay(preparePayRes);

//     // 删除已支付的商品
//     let newCart = uni.getStorageSync('cart') || [];
//     newCart = newCart.filter(v => !v.checked);
//     uni.setStorageSync('cart', newCart);

//     uni.showToast({
//       title: '支付成功',
//       icon: 'none'
//     });

//     uni.navigateTo({
//       url: '/pages/order/order?type=0',
//     });

//   } catch (error) {
// 	  console.log(error);
//     uni.showToast({
//       title: '支付失败',
//       icon: 'none'
//     });
//   }
// };
const createOrder = async (token) => {
  try {
    const totalPriceValue = totalPrice.value;
    const addressValue = address.value.provinceName + address.value.cityName + address.value.countyName + address.value.detailInfo;
    const consignee = address.value.userName;
    const telNumber = address.value.telNumber;

    const goods = cart.value.map(v => ({
      goodsId: v.id,
      goodsNumber: v.num,
      goodsPrice: v.price,
      goodsName: v.name,
      goodsPic: v.proPic
    }));

    const orderParams = {
      totalPrice: totalPriceValue,
      address: addressValue,
      consignee,
      telNumber,
      goods
    };

    const res = await requestUtil({
      url: "/my/order/create",
      method: "POST",
      data: orderParams,
      header: { "token": token } // 直接在这里设置 token
    });

    // console.log("Token used for request:", token);
    // console.log("Response from createOrder:", res);
	// console.log(res.data);
	
	const orderNo = res.data.orderNo;
	  console.log("Order Number:", orderNo);
	// } else {
	//   throw new Error("Order creation failed, no orderNo returned");
	// }
    // if (res && res.orderNo) {
    //   const orderNo = res.orderNo;
    //   console.log("Order Number:", orderNo);
    // } else {
    //   throw new Error("Order creation failed, no orderNo returned");
    // }

    // 处理支付逻辑（已注释）
    // const preparePayRes = await requestUtil({
    //   url: "/my/order/preparePay",
    //   method: "POST",
    //   data: { orderNo }
    // });
    // await requestPay(preparePayRes);

    // 删除已支付的商品
    let newCart = uni.getStorageSync('cart') || [];
    newCart = newCart.filter(v => !v.checked);
    uni.setStorageSync('cart', newCart);
	setCart(newCart);

    uni.showToast({
      title: '支付成功',
      icon: 'none'
    });

    uni.navigateTo({
      url: '/pages/order/order?type=0',
    });

  } catch (error) {
    console.error("Error during order creation:", error); // 打印完整的错误信息
    uni.showToast({
      title: '支付失败',
      icon: 'none'
    });
  }
};

</script>

<style scoped>
.revice_address_row {
  border-bottom: 1rpx dotted gray;
  padding: 20rpx;
}
/* .revice_address_row .user_info .user_info_item {
  margin-top: 10rpx;
}
.revice_address_row .user_info .user_info_detail {
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 10rpx;
} */
.revice_address_row .user_info .user_info_item {
  color: #000000; /* 将字体颜色设置为黑色 */
  font-size: 16px; /* 调整字体大小为16px */
  font-weight: normal; /* 取消加粗 */
}

.revice_address_row .user_info .user_info_detail {
  color: #000000; /* 将字体颜色设置为黑色 */
  font-size: 16px; /* 调整字体大小为16px */
  font-weight: normal; /* 取消加粗 */
  margin-bottom: 10rpx;
}

.cart_content {
  background-color: #F5F5F5;
}
.cart_content .cart_main {
  padding: 2rpx 10rpx 10rpx 10rpx;
}
.cart_content .cart_main .cart_item {
  display: flex;
  background-color: white;
  border-radius: 10px;
  margin: 20rpx;
  padding-right: 20rpx;
}
.cart_content .cart_main .cart_item .cart_img_wrap {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
  margin: 20rpx;
  border-radius: 10px;
}
.cart_content .cart_main .cart_item .cart_img_wrap image {
  width: 80%;
}
.cart_content .cart_main .cart_item .cart_info_warp {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cart_content .cart_main .cart_item .cart_info_warp .goods_name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bolder;
}
.cart_content .cart_main .cart_item .cart_info_warp .goods_price_wrap {
  display: flex;
  justify-content: space-between;
}
.cart_content .cart_main .cart_item .cart_info_warp .goods_price_wrap .goods_price {
  color: var(--themeColor);
  font-size: 34rpx;
}
.cart_content .cart_main .cart_item .cart_info_warp .goods_price_wrap .cart_num_tool {
  display: flex;
}
.cart_content .cart_main .cart_item .cart_info_warp .goods_price_wrap .cart_num_tool .goods_num {
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding-left: 30rpx;
}
.footer_tool .total_price_wrap {
  flex: 5;
  display: flex;
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
  background-image: linear-gradient(90deg, #FF740B, #FE6227);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}
</style>
