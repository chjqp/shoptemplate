"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleItemTap(index) {
      this.$emit("tabsItemChange", index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabs, (item, index, i0) => {
      return {
        a: common_vendor.t(item.value),
        b: item.id,
        c: common_vendor.n(item.isActive ? "active" : ""),
        d: common_vendor.o(($event) => $options.handleItemTap(index), item.id)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b4e653d7"]]);
wx.createComponent(Component);
