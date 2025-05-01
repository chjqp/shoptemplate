package com.shoptemplaate.shopbackend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shoptemplaate.shopbackend.entity.Product;
import com.shoptemplaate.shopbackend.entity.ProductSwiperImage;
import com.shoptemplaate.shopbackend.entity.R;
import com.shoptemplaate.shopbackend.service.IProductService;
import com.shoptemplaate.shopbackend.service.IProductSwiperImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 商品控制器

 */
@RestController
@RequestMapping("/product")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    private IProductService productService;

    @Autowired
    private IProductSwiperImageService productSwiperImageService;

    /**
     * 查询轮播商品
     * @return
     */
//    @RequestMapping("/findSwiper")
    @GetMapping("/findSwiper")
//    public R findSwiper(){
//        List<Product> swiperList = productService.findSwiper();
//        Map<String,Object> map=new HashMap<>();
//        map.put("message",swiperList);
//        return R.ok(map);
//    }
    public R findSwiper() {
        List<Product> swiperList = productService.list(new QueryWrapper<Product>().eq("isSwiper", 1));
        Map<String, Object> map = new HashMap<>();
        map.put("swiperList", swiperList);
        return R.ok(map);
    }

    /**
     * 查询热门推荐商品
     * @return
     */
//    @RequestMapping("/findHot")
//    public R findHot(){
//        List<Product> productList = productService.findHot();
//        Map<String,Object> map=new HashMap<>();
//        map.put("message",productList);
//        return R.ok(map);
//    }

    @GetMapping("findHot")
    public R findHot() {
        // 创建分页对象，页码从 1 开始，这里是第 1 页，每页 8 条记录
        Page<Product> page = new Page<>(1, 8);

        // 添加排序条件，按 "hotDateTime" 列进行排序（默认升序）
        QueryWrapper<Product> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("isHot", 1).orderByDesc("hotDateTime");

        // 查询带分页结果
        Page<Product> pageProduct = productService.page(page, queryWrapper);

        // 获取分页后的记录列表
        List<Product> hotProductList = pageProduct.getRecords();

        // 准备返回的数据
        Map<String, Object> map = new HashMap<>();
        map.put("message", hotProductList);

        // 返回结果
        return R.ok(map);
    }



    /**
     * 根据id查询商品
     * @param id
     * @return
     */
//    @RequestMapping("/detail")
//    public R detail(Integer id){
//        Product product = productService.getById(id);
//        List<ProductSwiperImage> productSwiperImageList = productSwiperImageService.list(new QueryWrapper<ProductSwiperImage>().eq("productId", product.getId()).orderByAsc("sort"));
//        product.setProductSwiperImageList(productSwiperImageList);
//        Map<String,Object> map=new HashMap<>();
//        map.put("message",product);
//        return R.ok(map);
//    }



    /**
     * 根据id查询商品信息
     * @param id
     * @return
     */
    @GetMapping("/detail")
    public R detail(Integer id) {
        logger.info("Fetching product details for product ID: {}", id);

        Product product = productService.getById(id);
        if (product == null) {
            logger.warn("Product with ID {} not found", id);
            return R.error("Product not found");
        }

        logger.info("Product found: {}", product);

        List<ProductSwiperImage> productSwiperImageList = productSwiperImageService
                .list(new QueryWrapper<ProductSwiperImage>()
                        .eq("productId", product.getId())
                        .orderByAsc("sort"));

        logger.debug("Fetched productSwiperImageList: {}", productSwiperImageList);

        product.setProductSwiperImageList(productSwiperImageList);
        Map<String, Object> map = new HashMap<>();
        map.put("message", product);

        logger.info("Returning product details with swiper images: {}", product);
        return R.ok(map);
    }

    /**
     * 商品搜索
     * @param q
     * @return
     */
    @GetMapping("/search")
    public R search(String q){
        List<Product> producetList = productService.list(new QueryWrapper<Product>().like("name", q));
        Map<String,Object> map=new HashMap<>();
        map.put("message",producetList);
        return R.ok(map);
    }





}
