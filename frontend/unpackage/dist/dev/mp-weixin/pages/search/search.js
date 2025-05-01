"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const _sfc_main = {
  setup() {
    const productList = common_vendor.ref([]);
    const isFocus = common_vendor.ref(false);
    const inputValue = common_vendor.ref("");
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
      }, 1e3);
    };
    const search = async (q) => {
      const res = await utils_requestUtil.requestUtil({ url: "/product/search", data: { q } });
      console.log(res);
      productList.value = res.data.message;
    };
    const handleCancel = () => {
      inputValue.value = "";
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $setup.inputValue = $event.detail.value, (...args) => $setup.handleInput && $setup.handleInput(...args)]),
    b: $setup.inputValue,
    c: $setup.isFocus
  }, $setup.isFocus ? {
    d: common_vendor.o((...args) => $setup.handleCancel && $setup.handleCancel(...args))
  } : {}, {
    e: common_vendor.f($setup.productList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: `/pages/product_detail/product_detail?id=${item.id}`
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
