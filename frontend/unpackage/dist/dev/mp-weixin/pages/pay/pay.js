"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const utils_cartStore = require("../../utils/cartStore.js");
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    const baseUrl = common_vendor.ref("");
    const totalPrice = common_vendor.ref(0);
    const totalNum = common_vendor.ref(0);
    const token = common_vendor.ref("");
    common_vendor.onMounted(() => {
      baseUrl.value = utils_requestUtil.getBaseUrl();
      const storedAddress = common_vendor.index.getStorageSync("address");
      let storedCart = common_vendor.index.getStorageSync("cart") || [];
      token.value = common_vendor.index.getStorageSync("token") || "";
      storedCart = storedCart.filter((v) => v.checked);
      let totalPriceTemp = 0;
      let totalNumTemp = 0;
      storedCart.forEach((v) => {
        totalPriceTemp += v.num * v.price;
        totalNumTemp += v.num;
      });
      utils_cartStore.address.value = storedAddress;
      utils_cartStore.cart.value = storedCart;
      totalPrice.value = totalPriceTemp;
      totalNum.value = totalNumTemp;
    });
    const handleOrderPay = async () => {
      if (!token.value) {
        try {
          const [loginRes, userProfileRes] = await Promise.all([utils_requestUtil.getLogin(), utils_requestUtil.getUserProfile()]);
          console.log(loginRes, userProfileRes);
          const loginParam = {
            code: loginRes.code,
            nickName: userProfileRes.userInfo.nickName,
            avatarUrl: userProfileRes.userInfo.avatarUrl
          };
          console.log(loginParam);
          common_vendor.index.setStorageSync("userInfo", userProfileRes.userInfo);
          await wxlogin(loginParam);
        } catch (error) {
          console.error("登录失败", error);
        }
      } else {
        console.log("token:" + token.value);
        console.log("支付继续走，创建订单");
        await createOrder(token.value);
      }
    };
    const wxlogin = async (loginParam) => {
      try {
        const result = await utils_requestUtil.requestUtil({
          url: "/user/wxlogin",
          data: loginParam,
          method: "POST"
        });
        console.log(result);
        token.value = result.data.token;
        common_vendor.index.setStorageSync("token", token.value);
        console.log("wxlogin" + token.value);
        await createOrder(token.value);
      } catch (error) {
        console.error("请求用户token失败", error);
      }
    };
    const createOrder = async (token2) => {
      try {
        const totalPriceValue = totalPrice.value;
        const addressValue = utils_cartStore.address.value.provinceName + utils_cartStore.address.value.cityName + utils_cartStore.address.value.countyName + utils_cartStore.address.value.detailInfo;
        const consignee = utils_cartStore.address.value.userName;
        const telNumber = utils_cartStore.address.value.telNumber;
        const goods = utils_cartStore.cart.value.map((v) => ({
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
        const res = await utils_requestUtil.requestUtil({
          url: "/my/order/create",
          method: "POST",
          data: orderParams,
          header: { "token": token2 }
          // 直接在这里设置 token
        });
        const orderNo = res.data.orderNo;
        console.log("Order Number:", orderNo);
        let newCart = common_vendor.index.getStorageSync("cart") || [];
        newCart = newCart.filter((v) => !v.checked);
        common_vendor.index.setStorageSync("cart", newCart);
        utils_cartStore.setCart(newCart);
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "none"
        });
        common_vendor.index.navigateTo({
          url: "/pages/order/order?type=0"
        });
      } catch (error) {
        console.error("Error during order creation:", error);
        common_vendor.index.showToast({
          title: "支付失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(utils_cartStore.address).provinceName + common_vendor.unref(utils_cartStore.address).cityName + common_vendor.unref(utils_cartStore.address).countyName),
        b: common_vendor.t(common_vendor.unref(utils_cartStore.address).detailInfo),
        c: common_vendor.t(common_vendor.unref(utils_cartStore.address).userName),
        d: common_vendor.t(common_vendor.unref(utils_cartStore.address).telNumber),
        e: common_vendor.f(common_vendor.unref(utils_cartStore.cart), (item, index, i0) => {
          return {
            a: `${baseUrl.value}image/product/${item.proPic}`,
            b: `/pages/product_detail/index?id=${item.id}`,
            c: common_vendor.t(item.name),
            d: `/pages/product_detail/index?id=${item.id}`,
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.num),
            g: item.goods_id
          };
        }),
        f: common_vendor.t(totalNum.value),
        g: common_vendor.t(totalPrice.value),
        h: common_vendor.o(handleOrderPay)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3a7adb9e"]]);
wx.createPage(MiniProgramPage);
