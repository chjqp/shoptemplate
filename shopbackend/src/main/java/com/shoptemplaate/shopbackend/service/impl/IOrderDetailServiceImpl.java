package com.shoptemplaate.shopbackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shoptemplaate.shopbackend.entity.OrderDetail;
import com.shoptemplaate.shopbackend.mapper.OrderDetailMapper;
import com.shoptemplaate.shopbackend.service.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 订单细表Service实现类
 
 */
@Service("orderDetailService")
public class IOrderDetailServiceImpl extends ServiceImpl<OrderDetailMapper,OrderDetail> implements IOrderDetailService {

    @Autowired
    private OrderDetailMapper orderDetailMapper;

}
