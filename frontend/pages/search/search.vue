<template>
  <view>
    <view class="search_row">
      <input v-model="inputValue" placeholder="请输入商品关键字" @input="handleInput" />
      <button v-if="isFocus" @click="handleCancel">取消</button>
    </view>
    <view class="search_content">
      <navigator v-for="item in productList" :key="item.id" :url="`/pages/product_detail/product_detail?id=${item.id}`" class="search_item">
        {{ item.name }}
      </navigator>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue';
import { getBaseUrl, requestUtil } from '@/utils/requestUtil.js';

export default {
  setup() {
    const productList = ref([]);
    const isFocus = ref(false);
    const inputValue = ref('');
    let TimeId = -1;

    const handleInput = (e) => {
      const value = e.target.value;
      console.log(value);
      if (!value.trim()) {
        productList.value = [];
        isFocus.value = false;
        return;
      }
      isFocus.value = true;
      clearTimeout(TimeId);
      TimeId = setTimeout(() => {
        search(value);
      }, 1000);
    };

    const search = async (q) => {
      const res = await requestUtil({ url: "/product/search", data: { q } });
      console.log(res);
      productList.value = res.data.message;
    };

    const handleCancel = () => {
      inputValue.value = '';
      isFocus.value = false;
      productList.value = [];
    };

    return {
      productList,
      isFocus,
      inputValue,
      handleInput,
      handleCancel
    };
  }
};
</script>

<style scoped>
.search_row {
  height: 60rpx;
  display: flex;
}
.search_row input {
  background-color: #FFFFFF;
  flex: 1;
  height: 100%;
  padding-left: 30rpx;
  color: #000000; /* 设置文字颜色为黑色 */
}
.search_row button {
  display: flex;
  width: 110rpx !important;
  height: 100%;
  font-size: 26rpx;
  padding: 0;
  margin: 0 10rpx;
  justify-content: center;
  align-items: center;
}
.search_content {
  margin-top: 15rpx;
  padding: 0px;
}
.search_content .search_item {
  background-color: #FFFFFF;
  font-size: 26rpx;
  padding: 15rpx;
  align-items: center;
  border-bottom: 1rpx solid #EAEAEA;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>