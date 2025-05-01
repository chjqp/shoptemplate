package com.shoptemplaate.shopbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.shoptemplaate.shopbackend.interceptor.SysInterceptor;

// web 项目配置类
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//                 .allowedOrigins("*")
//                 .allowCredentials(true)
//                 .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE","OPTIONS")
//                 .maxAge(3600);
//     }
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOriginPatterns("*") // 使用 allowedOriginPatterns 代替 allowedOrigins
            .allowCredentials(true)
            .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
            .maxAge(3600);
}

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/swiper/**")
                .addResourceLocations("file:D:\\workspace\\JavaProject\\shoptemplate\\java1234-mall\\swiperImgs\\");

        // 注意本地资源路径的图片文件夹后面必须再加\\,不然会出问题
        registry.addResourceHandler("/image/bigType/**")
                .addResourceLocations("file:D:\\workspace\\JavaProject\\shoptemplate\\java1234-mall\\bigTypeImgs\\");

        // 如果需要启用其他资源处理器，请取消注释以下代码
        registry.addResourceHandler("/image/product/**")
                .addResourceLocations("file:D:\\workspace\\JavaProject\\shoptemplate\\java1234-mall\\productImgs\\");
        registry.addResourceHandler("/image/productSwiperImgs/**")
                .addResourceLocations("file:D:\\workspace\\JavaProject\\shoptemplate\\java1234-mall\\productSwiperImgs\\");
        registry.addResourceHandler("/image/productIntroImgs/**")
                .addResourceLocations("file:D:\\workspace\\JavaProject\\shoptemplate\\java1234-mall\\productIntroImgs\\");
        registry.addResourceHandler("/image/productParaImgs/**")
                .addResourceLocations("file:D:\\workspace\\JavaProject\\shoptemplate\\java1234-mall\\productParaImgs\\");
    }
     @Bean
    public SysInterceptor sysInterceptor(){
        return new SysInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] patterns=new String[]{"/adminLogin","/product/**","/bigType/**","/user/wxlogin","/weixinpay/**"};
        registry.addInterceptor(sysInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }
}
