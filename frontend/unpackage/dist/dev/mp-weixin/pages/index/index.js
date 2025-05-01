"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
if (!Math) {
  SearchBar();
}
const SearchBar = () => "../../components/SearchBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const baseUrl = common_vendor.ref("");
    const bigTypeList_row1 = common_vendor.ref([]);
    const bigTypeList_row2 = common_vendor.ref([]);
    const hotProductList = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      await getSwiperList();
      await getBigTypeList();
      await getHotProductList();
    });
    const getSwiperList = async () => {
      try {
        const result = await utils_requestUtil.requestUtil({ url: "/product/findSwiper" });
        baseUrl.value = utils_requestUtil.getBaseUrl();
        swiperList.value = result.data.swiperList;
      } catch (error) {
        console.error("请求失败", error);
      }
    };
    const getBigTypeList = async () => {
      try {
        const result = await utils_requestUtil.requestUtil({ url: "/bigType/findAll" });
        bigTypeList_row1.value = result.data.message.filter((item, index) => index < 5);
        bigTypeList_row2.value = result.data.message.filter((item, index) => index >= 5);
      } catch (error) {
        console.error("请求失败", error);
      }
    };
    const getHotProductList = async () => {
      try {
        const result = await utils_requestUtil.requestUtil({ url: "/product/findHot" });
        hotProductList.value = result.data.message;
      } catch (error) {
        console.error("请求失败", error);
      }
    };
    const handleTypeJump = (index) => {
      console.log("跳转到分类：", index);
      const app = getApp();
      app.globalData.index = index;
      common_vendor.index.switchTab({
        url: "/pages/category/category"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (swiper, k0, i0) => {
          return {
            a: `${baseUrl.value}image/swiper/${swiper.swiperPic}`,
            b: swiper.id
          };
        }),
        b: common_vendor.f(bigTypeList_row1.value, (bigType, index, i0) => {
          return {
            a: `${baseUrl.value}image/bigType/${bigType.image}`,
            b: bigType.id,
            c: common_vendor.o(($event) => handleTypeJump(index), bigType.id)
          };
        }),
        c: common_vendor.f(bigTypeList_row2.value, (bigType, index, i0) => {
          return {
            a: `${baseUrl.value}image/bigType/${bigType.image}`,
            b: bigType.id,
            c: common_vendor.o(($event) => handleTypeJump(index + 5), bigType.id)
          };
        }),
        d: common_vendor.f(hotProductList.value, (hotProduct, index, i0) => {
          return {
            a: `${baseUrl.value}image/product/${hotProduct.proPic}`,
            b: common_vendor.t(hotProduct.name),
            c: common_vendor.t(hotProduct.price),
            d: `/pages/product_detail/product_detail?id=${hotProduct.id}`,
            e: hotProduct.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
