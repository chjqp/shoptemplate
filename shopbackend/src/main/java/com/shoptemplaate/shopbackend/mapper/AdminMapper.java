package com.shoptemplaate.shopbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.shoptemplaate.shopbackend.entity.Admin;

/**
 
 */
public interface AdminMapper extends BaseMapper<Admin> {

    /**
     * 修改
     * @param admin
     * @return
     */
    public Integer update(Admin admin);

}
