<template>
  <view class="user_info">
    <!-- 用户背景信息开始 -->
    <view class="user_info_bg">
      <view class="user_info_warp">
        <image class="user_icon" :src="userInfo.avatarUrl"></image>
        <view class="user_name">{{ userInfo.nickName }}</view>
      </view>
    </view>
    <!-- 用户背景信息结束 -->

    <!-- 用户操作菜单开始 -->
    <view class="user_menu">
      <!-- 订单管理开始 -->
      <view class="orders_warp">
        <view class="orders_title">我的订单</view>
        <view class="orders_content">
          <navigator :url="`/pages/order/order?type=1`">
            <view class="iconfont icon-daifukuan"></view>
            <view class="order_name">待付款</view>
          </navigator>
          <navigator :url="`/pages/order/order?type=2`">
            <view class="iconfont icon-daishouhuo"></view>
            <view class="order_name">待收货</view>
          </navigator>
          <navigator :url="`/pages/order/order?type=3`">
            <view class="iconfont icon-tuikuan"></view>
            <view class="order_name">退款/退货</view>
          </navigator>
          <navigator :url="`/pages/order/order?type=0`">
            <view class="iconfont icon-dingdan"></view>
            <view class="order_name">全部订单</view>
          </navigator>
        </view>
      </view>
      <!-- 订单管理结束 -->

      <!-- 收货地址开始 -->
      <view class="address_warp" @click="handleEditAddress">
        收货地址管理
      </view>
      <!-- 收货地址结束 -->

      <!-- 应用相关信息开始 -->
      <view class="app_info_warp">
        <view class="app_info_item app_info_contact">
          <text>联系客服</text>
          <text>19910722859</text>
        </view>
        <view class="app_info_item">
          <button @click="handleFeedback" class="feedback">意见反馈</button>
        </view>
        <view class="app_info_item">
          关于我们
        </view>
      </view>
      <!-- 应用相关信息结束 -->
    </view>
    <!-- 用户操作菜单结束 -->
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getBaseUrl, requestUtil, getLogin, getUserProfile, requestPay } from '@/utils/requestUtil.js';

export default {
  setup() {
    const userInfo = ref({});
    const token = ref('');

    onMounted(() => {
      token.value = uni.getStorageSync('token') || '';
      console.log('Initial token:', token.value);

      if (!token.value) {
        uni.showModal({
          title: '友情提示',
          content: '微信授权登录后，才可进入个人中心',
          success: async (res) => {
            const [loginRes, userProfileRes] = await Promise.all([getLogin(), getUserProfile()]);
            
            console.log('loginRes:', loginRes);
            console.log('userProfileRes:', userProfileRes);
            
            const loginParam = {
              code: loginRes.code,
              nickName: userProfileRes.userInfo.nickName,
              avatarUrl: userProfileRes.userInfo.avatarUrl
            };
            
            uni.setStorageSync('userInfo', userProfileRes.userInfo);
			
            userInfo.value = userProfileRes.userInfo;
			console.log("userInfo"+JSON.stringify(userInfo.value));
            
            const result = await requestUtil({
              url: "/user/wxlogin",
              data: loginParam,
              method: "POST"
            });
            console.log(result);
            token.value = result.data.token;
            uni.setStorageSync('token', token.value);
            console.log("wxlogin" + token.value);
          }
        });
      } else {
        console.log('token:', token.value);
        const storedUserInfo = uni.getStorageSync('userInfo');
        console.log('storedUserInfo:', storedUserInfo);
        userInfo.value = storedUserInfo;
		console.log("store后userInfo"+JSON.stringify(userInfo.value));
      }
    });

    const handleEditAddress = () => {
      console.log('编辑收货地址');
      uni.chooseAddress({});
    };

    const handleFeedback = () => {
      uni.openSetting({
        success: (res) => {
          console.log(res);
        }
      });
    };

    return {
      userInfo,
      handleEditAddress,
      handleFeedback
    };
  }
};
</script>

<style scoped>
/* .user_info .user_info_bg {
  position: relative;
  height: 40vh;
 background-color:  #FF5700 ;
}
.user_info .user_info_bg .user_info_warp {
  position: relative;
  top: 30%;
  text-align: center;
  background-color:  #FF5700 ;
  
}
.user_info .user_info_bg .user_info_warp .user_icon {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
background-color:  #FF5700 ;
}
.user_info .user_info_bg .user_info_warp .user_name {
	background-color:  #FF5700 ;
  color: #000;
}
.user_menu {
  margin-top: 15rpx;
background-color:  #FF5700 ;
}
.user_menu .orders_warp {
  margin: 15rpx;
  background-color:  #FF5700 ;
}
.user_menu .orders_warp .orders_title {
  padding: 15rpx;
  padding-left: 35rpx;
  border-bottom: 5rpx solid #F6F6F4;
  background-color:  #FF5700 ;
  
}
.user_menu .orders_warp .orders_content {
  padding: 20rpx;
  display: flex;
  text-align: center;
}
.user_menu .orders_warp .orders_content navigator {
  padding: 15rpx 0;
  flex: 1;
  text-align: center;
}
.user_menu .orders_warp .orders_content navigator .iconfont {
  font-size: 24px;
}
.user_menu .address_warp {
  margin: 15rpx;
  margin-top: 20rpx;
  background-color: #fff;
  padding: 20rpx 0;
  padding-left: 35rpx;
  color:#000;
}
.user_menu .app_info_warp {
  margin: 15rpx;
  margin-top: 20rpx;
  background-color: #fff;
}
.user_menu .app_info_warp .app_info_item {
  padding: 20rpx;
  padding-left: 35rpx;
  border-bottom: 5rpx solid #F6F6F4;
  color:#000;
}
.user_menu .app_info_warp .feedback {
  margin: 0;
  padding: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 28rpx;
  font-weight: normal;
  flex-grow: 1;
}
.user_menu .app_info_warp .feedback::after {
  border: none;
}
.user_menu .app_info_warp .app_info_contact {
  display: flex;
  justify-content: space-between;
  color:#000;
} */
.user_info .user_info_bg {
  position: relative;
  height: 40vh;
  background-color: #FF5700; /* This changes the gray background to the specified color */
}

.user_info .user_info_bg .user_info_warp {
  position: relative;
  top: 30%;
  text-align: center;
}


.user_info .user_info_bg .user_info_warp .user_icon {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user_info .user_info_bg .user_info_warp .user_name {
  color: #333;
  font-weight: bold;
}

.user_menu {
  margin-top: 15rpx;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user_menu .orders_warp {
  margin: 15rpx;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user_menu .orders_warp .orders_title {
  padding: 15rpx;
  padding-left: 35rpx;
  border-bottom: 1px solid #ddd;
  color: #444;
}

.user_menu .orders_warp .orders_content {
  padding: 20rpx;
  display: flex;
  text-align: center;
}

.user_menu .orders_warp .orders_content navigator {
  padding: 15rpx 0;
  flex: 1;
  text-align: center;
  color: #007BFF;
}

.user_menu .orders_warp .orders_content navigator .iconfont {
  font-size: 24px;
}

.user_menu .address_warp {
  margin: 15rpx;
  margin-top: 20rpx;
  background-color: #fff;
  padding: 20rpx 0;
  padding-left: 35rpx;
  color: #444;
  border-radius: 8rpx;
}

.user_menu .app_info_warp {
  margin: 15rpx;
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user_menu .app_info_warp .app_info_item {
  padding: 20rpx;
  padding-left: 35rpx;
  border-bottom: 1px solid #ddd;
  color: #444;
}

.user_menu .app_info_warp .feedback {
  margin: 0;
  padding: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 28rpx;
  font-weight: normal;
  flex-grow: 1;
  color: #007BFF;
}

.user_menu .app_info_warp .feedback::after {
  border: none;
}

.user_menu .app_info_warp .app_info_contact {
  display: flex;
  justify-content: space-between;
  color: #444;
}

</style>
