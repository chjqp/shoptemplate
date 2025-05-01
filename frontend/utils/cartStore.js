// utils/cartStore.js
import { ref, watch } from 'vue';

// 创建全局状态
const cart = ref(uni.getStorageSync('cart') || []);
const address = ref(uni.getStorageSync('address') || {});

// 设置购物车状态，并自动保存到本地存储
const setCart = (cartData) => {
  cart.value = cartData;
  uni.setStorageSync('cart', cartData);
};

// 设置地址状态，并自动保存到本地存储
const setAddress = (addressData) => {
  address.value = addressData;
  uni.setStorageSync('address', addressData);
};

// 监听cart变化，更新本地存储
watch(cart, (newCart) => {
  uni.setStorageSync('cart', newCart);
}, { deep: true });

export {
  cart,
  address,
  setCart,
  setAddress
};
