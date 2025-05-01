package com.shoptemplaate.shopbackend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

//商品大类
@TableName("t_bigType")
@Data
public class BigType implements Serializable {

    @Setter
    @Getter
    private Integer id; // 编号

    @Getter
    @Setter
    private String name; // 名称

    @Setter
    @Getter
    private String remark; // 备注

    @Setter
    @Getter
    private String image="default.jpg"; // 封面图片

    @TableField(select = false)
    private List<SmallType> smallTypeList; // 小类集合

}
