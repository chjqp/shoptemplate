// package com.shoptemplaate.shopbackend;

// import org.mybatis.spring.annotation.MapperScan;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.context.properties.EnableConfigurationProperties;

// import com.shoptemplaate.shopbackend.properties.WeixinProperties;

// @SpringBootApplication
// @MapperScan("com.shoptemplaate.shopbackend.mapper")

// @MapperScan("com.shoptemplaate.shopbackend.properties")
// @EnableConfigurationProperties(WeixinProperties.class)
// public class ShopbackendApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(ShopbackendApplication.class, args);
//     }

// }
package com.shoptemplaate.shopbackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.shoptemplaate.shopbackend.properties.WeixinProperties;

@SpringBootApplication
@MapperScan("com.shoptemplaate.shopbackend.mapper")
@EnableConfigurationProperties(WeixinProperties.class)
public class ShopbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopbackendApplication.class, args);
    }

}