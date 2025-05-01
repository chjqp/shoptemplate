"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "SearchBar",
  setup(__props) {
    const onFocus = () => {
      common_vendor.index.navigateTo({
        url: `/pages/search/search`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "22",
          color: "#999"
        }),
        b: common_vendor.o(onFocus),
        c: _ctx.searchQuery,
        d: common_vendor.o(($event) => _ctx.searchQuery = $event.detail.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2334f7bd"]]);
wx.createComponent(Component);
