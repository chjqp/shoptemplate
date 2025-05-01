<!-- <template>
  <view>
    <Tabs :tabs="tabs" @tabsItemChange="handleTabsItemChange">
      <view class="order_main">
        <view class="order_item" v-for="item in orders" :key="item.order_id">
          <view class="order_no_row">
            <view class="order_no_text">订单编号</view>
            <view class="order_no_value">{{ item.orderNo }}</view>
          </view>
          <view class="order_price_row">
            <view class="order_price_text">订单价格</view>
            <view class="order_price_value">¥{{ item.totalPrice }}</view>
          </view>
          <view class="order_time_row">
            <view class="order_time_text">订单日期</view>
            <view class="order_time_value">{{ item.createDate }}</view>
          </view>
        </view>
      </view>
    </Tabs>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import Tabs from '@/components/Tabs.vue';
import { requestUtil } from '@/utils/requestUtil.js';

export default {
  components: {
    Tabs
  },
  setup() {
    const orders = ref([]);
    const tabs = ref([
      { id: 0, value: "全部订单", isActive: true },
      { id: 1, value: "待付款", isActive: false },
      { id: 2, value: "待收货", isActive: false },
      { id: 3, value: "退款/退货", isActive: false }
    ]);
    const QueryParams = ref({
      type: 0,
      page: 1,
      pageSize: 10
    });
    const totalPage = ref(1);
    const token = ref('');

    const changeTitleByIndex = (index) => {
      tabs.value.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    };

    const handleTabsItemChange = (index) => {
      changeTitleByIndex(index);
      QueryParams.value.type = index;
      QueryParams.value.page = 1;
      orders.value = [];
      getOrders();
    };

    const getOrders = async () => {
      try {
        console.log("Fetching orders with token:", token.value);
        const res = await requestUtil({
          url: "/my/order/list",
          data: QueryParams.value,
          header: { "token": token.value } // 直接在这里设置 token
        });
        console.log("Response:", res);
        if (res.statusCode === 200) {
          if (res.data.code === 200 || res.data.code === 0) {
            totalPage.value = res.data.totalPage;
            orders.value = [...orders.value, ...(res.data.orderList || [])];
          } else {
            console.error("Error fetching orders:", res.data.msg);
          }
        } else {
          console.error("HTTP Error:", res.statusCode);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    onMounted(() => {
      token.value = uni.getStorageSync('token') || '';
      console.log("Token on mounted:", token.value);
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const { type } = currentPage.options;
      changeTitleByIndex(type);
      QueryParams.value.type = type;
      getOrders();
    });

    return {
      orders,
      tabs,
      handleTabsItemChange
    };
  }
};
</script>

<style scoped>
.order_main {
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  color: #000; /* 修改为黑色 */
}

.order_main .order_item {
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  color: #000; /* 修改为黑色 */
}

.order_main .order_item .order_no_row,
.order_main .order_item .order_price_row,
.order_main .order_item .order_time_row {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 0;
  color: #000; /* 修改为黑色 */
}

.order_main .order_item .order_price_row .order_price_value {
  color: #000; /* 修改为黑色 */
  font-size: 32rpx;
}
</style> -->
<template>
  <view>
    <Tabs :tabs="tabs" @tabsItemChange="handleTabsItemChange">
      <view class="order_main">
        <view class="order_item" v-for="item in orders" :key="item.order_id">
          <view class="order_no_row">
            <view class="order_no_text">订单编号</view>
            <view class="order_no_value">{{ item.orderNo }}</view>
          </view>
          <view class="order_price_row">
            <view class="order_price_text">订单价格</view>
            <view class="order_price_value">¥{{ item.totalPrice }}</view>
          </view>
          <view class="order_time_row">
            <view class="order_time_text">订单日期</view>
            <view class="order_time_value">{{ item.createDate }}</view>
          </view>
        </view>
      </view>
    </Tabs>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import Tabs from '@/components/Tabs.vue';
import { requestUtil } from '@/utils/requestUtil.js';

export default {
  components: {
    Tabs
  },
  setup() {
    const orders = ref([]);
    const tabs = ref([
      { id: 0, value: "全部订单", isActive: true },
      { id: 1, value: "待付款", isActive: false },
      { id: 2, value: "待收货", isActive: false },
      { id: 3, value: "退款/退货", isActive: false }
    ]);
    const QueryParams = ref({
      type: 0,
      page: 1,
      pageSize: 10
    });
    const totalPage = ref(1);
    const token = ref('');

    const changeTitleByIndex = (index) => {
      tabs.value.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    };

    const handleTabsItemChange = (index) => {
      changeTitleByIndex(index);
      QueryParams.value.type = index;
      QueryParams.value.page = 1;
      orders.value = [];
      getOrders();
    };

    const getOrders = async () => {
      try {
        console.log("Fetching orders with token:", token.value);
        const res = await requestUtil({
          url: "/my/order/list",
          data: QueryParams.value,
          header: { "token": token.value } ,// 直接在这里设置 token
		  method:"GET",
        });
        console.log("Response:", res);
        if (res.statusCode === 200) {
          if (res.data.code === 200 || res.data.code === 0) {
            totalPage.value = res.data.totalPage;
            orders.value = [...orders.value, ...(res.data.orderList || [])];
          } else {
            console.error("Error fetching orders:", res.data.msg);
          }
        } else {
          console.error("HTTP Error:", res.statusCode);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    onMounted(() => {
      token.value = uni.getStorageSync('token') || '';
      console.log("Token on mounted:", token.value);
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const { type } = currentPage.options;
      changeTitleByIndex(type);
      QueryParams.value.type = type;
      getOrders();
    });

    return {
      orders,
      tabs,
      handleTabsItemChange
    };
  }
};
</script>

<style scoped>
.order_main {
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  color: #000; /* 修改为黑色 */
}

.order_main .order_item {
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  color: #000; /* 修改为黑色 */
}

.order_main .order_item .order_no_row {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 0;
  color: #000; /* 修改为黑色 */
}

.order_main .order_item .order_no_row .order_no_value {
  color: #000; /* 修改为黑色 */
}

.order_main .order_item .order_price_row {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 0;
  color: #000; /* 修改为红色 */
}

.order_main .order_item .order_price_row .order_price_value {
  color: #FF0000; /* 修改为红色 */
  font-size: 32rpx;
}

.order_main .order_item .order_time_row {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 0;
  color: #000; /* 修改为黑色 */
}
</style>