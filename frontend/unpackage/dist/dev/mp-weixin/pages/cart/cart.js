"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_cartStore = require("../../utils/cartStore.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const baseUrl = common_vendor.ref("");
    const allChecked = common_vendor.ref(false);
    const totalPrice = common_vendor.ref(0);
    const totalNum = common_vendor.ref(0);
    const handleChooseAddress = () => {
      common_vendor.index.chooseAddress({
        success: (result) => {
          console.log(result);
          utils_cartStore.setAddress(result);
        },
        fail: (result) => {
          console.log(result);
        }
      });
    };
    const handleItemNumEdit = (id, operation) => {
      const index = utils_cartStore.cart.value.findIndex((v) => v.id === id);
      if (utils_cartStore.cart.value[index].num === 1 && operation === -1) {
        common_vendor.index.showModal({
          title: "系统提示",
          content: "您是否要删除？",
          success: (res) => {
            if (res.confirm) {
              utils_cartStore.cart.value.splice(index, 1);
              utils_cartStore.setCart(utils_cartStore.cart.value);
            }
          }
        });
      } else {
        utils_cartStore.cart.value[index].num += operation;
        utils_cartStore.setCart(utils_cartStore.cart.value);
      }
    };
    const handleItemChange = (id) => {
      const index = utils_cartStore.cart.value.findIndex((v) => v.id === id);
      utils_cartStore.cart.value[index].checked = !utils_cartStore.cart.value[index].checked;
      utils_cartStore.setCart(utils_cartStore.cart.value);
    };
    const handleItemAllCheck = () => {
      allChecked.value = !allChecked.value;
      utils_cartStore.cart.value.forEach((v) => v.checked = allChecked.value);
      utils_cartStore.setCart(utils_cartStore.cart.value);
    };
    const updateCartState = () => {
      let allCheckedTemp = true;
      let totalPriceTemp = 0;
      let totalNumTemp = 0;
      utils_cartStore.cart.value.forEach((v) => {
        if (v.checked) {
          totalPriceTemp += v.num * v.price;
          totalNumTemp += v.num;
        } else {
          allCheckedTemp = false;
        }
      });
      allChecked.value = utils_cartStore.cart.value.length !== 0 ? allCheckedTemp : false;
      totalPrice.value = totalPriceTemp;
      totalNum.value = totalNumTemp;
    };
    const handlePay = () => {
      if (!utils_cartStore.address.value.userName) {
        common_vendor.index.showToast({
          title: "您还没有选择收货地址",
          icon: "none"
        });
        return;
      }
      if (totalNum.value === 0) {
        common_vendor.index.showToast({
          title: "您还没有选购商品",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/pay/pay"
      });
    };
    common_vendor.onMounted(() => {
      baseUrl.value = utils_requestUtil.getBaseUrl();
      updateCartState();
    });
    common_vendor.watch(utils_cartStore.cart, updateCartState, { deep: true });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(utils_cartStore.address).userName
      }, !common_vendor.unref(utils_cartStore.address).userName ? {
        b: common_vendor.o(handleChooseAddress)
      } : {
        c: common_vendor.t(common_vendor.unref(utils_cartStore.address).userName),
        d: common_vendor.t(common_vendor.unref(utils_cartStore.address).telNumber),
        e: common_vendor.t(common_vendor.unref(utils_cartStore.address).provinceName + common_vendor.unref(utils_cartStore.address).cityName + common_vendor.unref(utils_cartStore.address).countyName + common_vendor.unref(utils_cartStore.address).detailInfo),
        f: common_vendor.o(handleChooseAddress)
      }, {
        g: common_vendor.unref(utils_cartStore.cart).length !== 0
      }, common_vendor.unref(utils_cartStore.cart).length !== 0 ? {
        h: common_vendor.f(common_vendor.unref(utils_cartStore.cart), (item, index, i0) => {
          return {
            a: item.checked,
            b: item.id,
            c: common_vendor.o(($event) => handleItemChange(item.id), item.goods_id),
            d: `${baseUrl.value}image/product/${item.proPic}`,
            e: `/pages/product_detail/index?id=${item.id}`,
            f: common_vendor.t(item.name),
            g: `/pages/product_detail/index?id=${item.id}`,
            h: common_vendor.t(item.price),
            i: common_vendor.o(($event) => handleItemNumEdit(item.id, -1), item.goods_id),
            j: common_vendor.t(item.num),
            k: common_vendor.o(($event) => handleItemNumEdit(item.id, 1), item.goods_id),
            l: item.goods_id
          };
        })
      } : {
        i: common_assets._imports_0
      }, {
        j: allChecked.value,
        k: common_vendor.o(handleItemAllCheck),
        l: common_vendor.t(totalPrice.value),
        m: common_vendor.t(totalNum.value),
        n: common_vendor.o(handlePay)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c91e7611"]]);
wx.createPage(MiniProgramPage);
