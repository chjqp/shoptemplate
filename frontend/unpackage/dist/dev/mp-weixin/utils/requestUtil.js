"use strict";
const common_vendor = require("../common/vendor.js");
let ajaxTimes = 0;
const baseUrl = "http://localhost:8083/";
const getBaseUrl = () => {
  return baseUrl;
};
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.getUserProfile({
      desc: "获取用户信息",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const getLogin = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      timeout: 5e3,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const requestUtil = (params) => {
  var start = (/* @__PURE__ */ new Date()).getTime();
  console.log("ajaxTimes=" + ajaxTimes);
  ajaxTimes++;
  while (true)
    if ((/* @__PURE__ */ new Date()).getTime() - start > 100)
      break;
  common_vendor.index.showLoading({
    title: "加载中"
  });
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
    const storedToken = common_vendor.index.getStorageSync("token");
    console.log("Stored token:", storedToken);
    if (storedToken) {
      header["token"] = storedToken;
    } else {
      console.warn("No token found in storage");
    }
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...params,
      url: baseUrl + params.url,
      // 拼接完整 URL
      header,
      // 使用新的 header
      success: (result) => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          common_vendor.index.hideLoading();
        }
        resolve(result);
      },
      fail: (err) => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          common_vendor.index.hideLoading();
        }
        console.error("Request failed:", err);
        reject(err);
      }
    });
  });
};
exports.getBaseUrl = getBaseUrl;
exports.getLogin = getLogin;
exports.getUserProfile = getUserProfile;
exports.requestUtil = requestUtil;
