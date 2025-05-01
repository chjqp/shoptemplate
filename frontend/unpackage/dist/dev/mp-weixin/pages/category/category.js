"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_requestUtil = require("../../utils/requestUtil.js");
const SearchBar = () => "../../components/SearchBar.js";
const _sfc_main = {
  components: {
    SearchBar
    // 确保正确注册了组件
  },
  data() {
    return {
      leftMenuList: [],
      rightContent: [],
      baseUrl: "",
      currentIndex: 0,
      scrollTop: 0,
      Cates: []
    };
  },
  async mounted() {
    try {
      await this.getCates();
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  },
  methods: {
    async getCates() {
      try {
        const result = await utils_requestUtil.requestUtil({ url: "/bigType/findCategories" });
        console.log(result);
        this.Cates = result.data.message || [];
        this.baseUrl = utils_requestUtil.getBaseUrl();
        this.leftMenuList = this.Cates.map((v) => v.name);
        if (this.Cates.length > 0 && this.Cates[this.currentIndex]) {
          this.rightContent = this.Cates[this.currentIndex].smallTypeList || [];
        } else {
          this.rightContent = [];
        }
      } catch (error) {
        console.log("Failed to fetch categories:", error);
        this.Cates = [];
        this.rightContent = [];
      }
    },
    handleItemTap(index) {
      var _a;
      if (this.Cates && this.Cates[index]) {
        this.currentIndex = index;
        this.rightContent = ((_a = this.Cates[index]) == null ? void 0 : _a.smallTypeList) || [];
        this.scrollTop = 0;
      } else {
        console.error(`Invalid category index: ${index}`);
      }
    }
  },
  onShow() {
    const app = getApp();
    const index = app.globalData.index;
    if (index !== -1 && this.Cates.length > 0 && this.Cates[index]) {
      this.handleItemTap(index);
      app.globalData.index = -1;
    } else if (index !== -1) {
      console.error("Invalid category index or data not loaded");
    }
  }
};
if (!Array) {
  const _component_SearchBar = common_vendor.resolveComponent("SearchBar");
  _component_SearchBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.leftMenuList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index === $data.currentIndex ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.handleItemTap(index), index)
      };
    }),
    b: common_vendor.f($data.rightContent, (item1, index1, i0) => {
      return {
        a: common_vendor.t(item1.name),
        b: common_vendor.f(item1.productList, (item2, index2, i1) => {
          return {
            a: `${$data.baseUrl}/image/product/${item2.proPic}`,
            b: common_vendor.t(item2.name),
            c: common_vendor.t(item2.price),
            d: item2.id,
            e: `/pages/product_detail/product_detail?id=${item2.id}`
          };
        }),
        c: item1.id
      };
    }),
    c: $data.scrollTop
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8145b772"]]);
wx.createPage(MiniProgramPage);
