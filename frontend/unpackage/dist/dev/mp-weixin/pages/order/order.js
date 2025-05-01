"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const Tabs = () => "../../components/Tabs.js";
const _sfc_main = {
  components: {
    Tabs
  },
  setup() {
    const orders = common_vendor.ref([]);
    const tabs = common_vendor.ref([
      { id: 0, value: "全部订单", isActive: true },
      { id: 1, value: "待付款", isActive: false },
      { id: 2, value: "待收货", isActive: false },
      { id: 3, value: "退款/退货", isActive: false }
    ]);
    const QueryParams = common_vendor.ref({
      type: 0,
      page: 1,
      pageSize: 10
    });
    const totalPage = common_vendor.ref(1);
    const token = common_vendor.ref("");
    const changeTitleByIndex = (index) => {
      tabs.value.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    };
    const handleTabsItemChange = (index) => {
      changeTitleByIndex(index);
      QueryParams.value.type = index;
      QueryParams.value.page = 1;
      orders.value = [];
      getOrders();
    };
    const getOrders = async () => {
      try {
        console.log("Fetching orders with token:", token.value);
        const res = await utils_requestUtil.requestUtil({
          url: "/my/order/list",
          data: QueryParams.value,
          header: { "token": token.value },
          // 直接在这里设置 token
          method: "GET"
        });
        console.log("Response:", res);
        if (res.statusCode === 200) {
          if (res.data.code === 200 || res.data.code === 0) {
            totalPage.value = res.data.totalPage;
            orders.value = [...orders.value, ...res.data.orderList || []];
          } else {
            console.error("Error fetching orders:", res.data.msg);
          }
        } else {
          console.error("HTTP Error:", res.statusCode);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };
    common_vendor.onMounted(() => {
      token.value = common_vendor.index.getStorageSync("token") || "";
      console.log("Token on mounted:", token.value);
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const { type } = currentPage.options;
      changeTitleByIndex(type);
      QueryParams.value.type = type;
      getOrders();
    });
    return {
      orders,
      tabs,
      handleTabsItemChange
    };
  }
};
if (!Array) {
  const _component_Tabs = common_vendor.resolveComponent("Tabs");
  _component_Tabs();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.orders, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.orderNo),
        b: common_vendor.t(item.totalPrice),
        c: common_vendor.t(item.createDate),
        d: item.order_id
      };
    }),
    b: common_vendor.o($setup.handleTabsItemChange),
    c: common_vendor.p({
      tabs: $setup.tabs
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-93207a4f"]]);
wx.createPage(MiniProgramPage);
