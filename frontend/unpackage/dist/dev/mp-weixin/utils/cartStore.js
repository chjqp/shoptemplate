"use strict";
const common_vendor = require("../common/vendor.js");
const cart = common_vendor.ref(common_vendor.index.getStorageSync("cart") || []);
const address = common_vendor.ref(common_vendor.index.getStorageSync("address") || {});
const setCart = (cartData) => {
  cart.value = cartData;
  common_vendor.index.setStorageSync("cart", cartData);
};
const setAddress = (addressData) => {
  address.value = addressData;
  common_vendor.index.setStorageSync("address", addressData);
};
common_vendor.watch(cart, (newCart) => {
  common_vendor.index.setStorageSync("cart", newCart);
}, { deep: true });
exports.address = address;
exports.cart = cart;
exports.setAddress = setAddress;
exports.setCart = setCart;
