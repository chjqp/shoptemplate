"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/category/category.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./pages/search/search.js";
  "./pages/product_detail/product_detail.js";
  "./pages/pay/pay.js";
  "./pages/order/order.js";
}
const _sfc_main = {
  onLaunch() {
    console.log("App Launch");
  },
  globalData: {
    index: -1
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
