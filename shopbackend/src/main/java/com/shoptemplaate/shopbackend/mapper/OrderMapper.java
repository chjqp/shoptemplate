package com.shoptemplaate.shopbackend.mapper;

import com.shoptemplaate.shopbackend.entity.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 订单主表Mapper接口
 */
public interface OrderMapper extends BaseMapper<Order> {

    /**
     * 根据条件分页查询订单
     * @param map 查询条件
     * @return 订单列表
     */
    List<Order> list(Map<String, Object> map);

    /**
     * 根据条件，查询订单总记录数
     * @param map 查询条件
     * @return 订单总记录数
     */
    Long getTotal(Map<String, Object> map);
}