"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const _sfc_main = {
  setup() {
    const userInfo = common_vendor.ref({});
    const token = common_vendor.ref("");
    common_vendor.onMounted(() => {
      token.value = common_vendor.index.getStorageSync("token") || "";
      console.log("Initial token:", token.value);
      if (!token.value) {
        common_vendor.index.showModal({
          title: "友情提示",
          content: "微信授权登录后，才可进入个人中心",
          success: async (res) => {
            const [loginRes, userProfileRes] = await Promise.all([utils_requestUtil.getLogin(), utils_requestUtil.getUserProfile()]);
            console.log("loginRes:", loginRes);
            console.log("userProfileRes:", userProfileRes);
            const loginParam = {
              code: loginRes.code,
              nickName: userProfileRes.userInfo.nickName,
              avatarUrl: userProfileRes.userInfo.avatarUrl
            };
            common_vendor.index.setStorageSync("userInfo", userProfileRes.userInfo);
            userInfo.value = userProfileRes.userInfo;
            console.log("userInfo" + JSON.stringify(userInfo.value));
            const result = await utils_requestUtil.requestUtil({
              url: "/user/wxlogin",
              data: loginParam,
              method: "POST"
            });
            console.log(result);
            token.value = result.data.token;
            common_vendor.index.setStorageSync("token", token.value);
            console.log("wxlogin" + token.value);
          }
        });
      } else {
        console.log("token:", token.value);
        const storedUserInfo = common_vendor.index.getStorageSync("userInfo");
        console.log("storedUserInfo:", storedUserInfo);
        userInfo.value = storedUserInfo;
        console.log("store后userInfo" + JSON.stringify(userInfo.value));
      }
    });
    const handleEditAddress = () => {
      console.log("编辑收货地址");
      common_vendor.index.chooseAddress({});
    };
    const handleFeedback = () => {
      common_vendor.index.openSetting({
        success: (res) => {
          console.log(res);
        }
      });
    };
    return {
      userInfo,
      handleEditAddress,
      handleFeedback
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.userInfo.avatarUrl,
    b: common_vendor.t($setup.userInfo.nickName),
    c: `/pages/order/order?type=1`,
    d: `/pages/order/order?type=2`,
    e: `/pages/order/order?type=3`,
    f: `/pages/order/order?type=0`,
    g: common_vendor.o((...args) => $setup.handleEditAddress && $setup.handleEditAddress(...args)),
    h: common_vendor.o((...args) => $setup.handleFeedback && $setup.handleFeedback(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
