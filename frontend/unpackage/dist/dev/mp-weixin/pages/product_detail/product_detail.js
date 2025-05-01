"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const utils_cartStore = require("../../utils/cartStore.js");
const _sfc_main = {
  __name: "product_detail",
  setup(__props) {
    const productObj = common_vendor.ref(null);
    const baseUrl = common_vendor.ref("");
    const activeIndex = common_vendor.ref(0);
    const getProductDetail = async (id) => {
      try {
        const result = await utils_requestUtil.requestUtil({ url: "/product/detail", data: { id } });
        productObj.value = result.data.message;
        console.log(result);
      } catch (error) {
        console.error("请求失败", error);
      }
    };
    common_vendor.onMounted(() => {
      baseUrl.value = utils_requestUtil.getBaseUrl();
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const id = currentPage.options.id;
      getProductDetail(id);
    });
    const addToCart = () => {
      if (!productObj.value)
        return;
      setCartAdd();
      common_vendor.index.showToast({
        title: "加入成功",
        icon: "success",
        mask: true
      });
    };
    const setCartAdd = () => {
      let currentCart = utils_cartStore.cart.value;
      let index = currentCart.findIndex((v) => v.id === productObj.value.id);
      if (index === -1) {
        productObj.value.num = 1;
        currentCart.push(productObj.value);
      } else {
        currentCart[index].num++;
      }
      utils_cartStore.setCart(currentCart);
    };
    const buyNow = () => {
      if (!productObj.value)
        return;
      setCartAdd();
      common_vendor.index.switchTab({
        url: "/pages/cart/cart"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: productObj.value
      }, productObj.value ? common_vendor.e({
        b: common_vendor.f(productObj.value.productSwiperImageList, (item, index, i0) => {
          return {
            a: `${baseUrl.value}image/productSwiperImgs/${item.image}`,
            b: index
          };
        }),
        c: common_vendor.t(productObj.value.price),
        d: common_vendor.t(productObj.value.name),
        e: common_vendor.t(productObj.value.description),
        f: activeIndex.value === 0 ? 1 : "",
        g: common_vendor.o(($event) => activeIndex.value = 0),
        h: activeIndex.value === 1 ? 1 : "",
        i: common_vendor.o(($event) => activeIndex.value = 1),
        j: activeIndex.value === 0
      }, activeIndex.value === 0 ? {
        k: productObj.value.productIntroImgs
      } : activeIndex.value === 1 ? {
        m: productObj.value.productParaImgs
      } : {}, {
        l: activeIndex.value === 1
      }) : {}, {
        n: common_vendor.o(addToCart),
        o: common_vendor.o(buyNow)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0eb4e14b"]]);
wx.createPage(MiniProgramPage);
