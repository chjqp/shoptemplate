package com.shoptemplaate.shopbackend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shoptemplaate.shopbackend.entity.WxUserInfo;
import com.shoptemplaate.shopbackend.mapper.WxUserInfoMapper;
import com.shoptemplaate.shopbackend.service.IWxUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 微信用户信息Service实现类
 
 */
@Service("wxUserInfoService")
public class IWxUserInfoServiceImpl extends ServiceImpl<WxUserInfoMapper,WxUserInfo> implements IWxUserInfoService {

    @Autowired
    private WxUserInfoMapper wxUserInfoMapper;


}
