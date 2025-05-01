package com.shoptemplaate.shopbackend.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.shoptemplaate.shopbackend.constant.SystemConstant;
import com.shoptemplaate.shopbackend.entity.R;
import com.shoptemplaate.shopbackend.entity.WxUserInfo;
import com.shoptemplaate.shopbackend.properties.WeixinProperties;
import com.shoptemplaate.shopbackend.service.IWxUserInfoService;

// import com.java1234.constant.SystemConstant;
// import com.java1234.entity.R;
// import com.java1234.entity.WxUserInfo;
// import com.java1234.properties.WeixinProperties;
// import com.java1234.service.IWxUserInfoService;
// import com.java1234.util.HttpClientUtil;
// import com.java1234.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.shoptemplaate.shopbackend.util.HttpClientUtil;
import com.shoptemplaate.shopbackend.util.JwtUtils;

/**
 * 微信用户Controller
 * 
 */
@RestController
// @RequestMapping("/users")
@RequestMapping("/user")
public class UsersController {

    // @RequestMapping("/wxlogin")
    // public R wxLogin(@RequestBody WxUserInfo wxUserInfo) {
    // System.out.println(wxUserInfo);
    // return R.ok();
    // }

    @Autowired
    private WeixinProperties weixinProperties;
    @Autowired
    private HttpClientUtil httpClientUtil;
    @Autowired
    IWxUserInfoService wxUserInfoService;

    /**
     * 微信用户登录
     * 
     * @param wxUserInfo
     * @return
     */
    @RequestMapping("/wxlogin")
    public R wxLogin(@RequestBody WxUserInfo wxUserInfo) {
        // System.out.println("code="+wxUserInfo.getCode());
        // 通过jscode2session 获取openId
        String jscode2sessionUrl = weixinProperties.getJscode2sessionUrl() + "?appid=" + weixinProperties.getAppid()
                + "&secret=" + weixinProperties.getSecret() + "&js_code=" + wxUserInfo.getCode()
                + "&grant_type=authorization_code";
        // System.out.println(jscode2sessionUrl);
        String result = httpClientUtil.sendHttpGet(jscode2sessionUrl);
        // System.out.println(result);
        JSONObject jsonObject = JSON.parseObject(result);
        String openid = jsonObject.get("openid").toString();
        System.out.println(openid);
        WxUserInfo resultWxUserInfo = wxUserInfoService.getOne(new QueryWrapper<WxUserInfo>().eq("openid", openid));
        if (resultWxUserInfo == null) { // 不存在 插入用户
            System.out.println("不存在 插入用户");
            wxUserInfo.setOpenid(openid);
            wxUserInfo.setRegisterDate(new Date());
            wxUserInfo.setLastLoginDate(new Date());
            wxUserInfoService.save(wxUserInfo);
        } else { // 存在 更新用户信息
            System.out.println("存在 更新用户信息");
            resultWxUserInfo.setNickName(wxUserInfo.getNickName());
            resultWxUserInfo.setAvatarUrl(wxUserInfo.getAvatarUrl());
            resultWxUserInfo.setLastLoginDate(new Date());
            wxUserInfoService.updateById(resultWxUserInfo);
        }
             // 利用jwt生成token返回到前端
        String token = JwtUtils.createJWT(openid, wxUserInfo.getNickName(), SystemConstant.JWT_TTL);
        Map<String,Object> resultMap=new HashMap<String,Object>();
        resultMap.put("token",token);
        return R.ok(resultMap);
    }

    // @Autowired
    // private WeixinProperties weixinProperties;

    // @Autowired
    // private HttpClientUtil httpClientUtil;

    // @Autowired
    // private IWxUserInfoService wxUserInfoService;

    // /**
    // * 微信登录
    // * @return
    // */
    // @RequestMapping("/wxlogin")
    // public R wxLogin(@RequestBody WxUserInfo wxUserInfo){
    // System.out.println(weixinProperties);
    // System.out.println("code="+wxUserInfo.getCode());
    // String
    // jscode2sessionUrl=weixinProperties.getJscode2sessionUrl()+"?appid="+weixinProperties.getAppid()+"&secret="+weixinProperties.getSecret()+"&js_code="+wxUserInfo.getCode()+"&grant_type=authorization_code";
    // System.out.println(jscode2sessionUrl);
    // String result = httpClientUtil.sendHttpGet(jscode2sessionUrl); //
    // 带code请求获取openId
    // System.out.println(result);
    // JSONObject jsonObject = JSON.parseObject(result);
    // String openid = jsonObject.get("openid").toString(); // 获取openId
    // WxUserInfo resultUserInfo = wxUserInfoService.getOne(new
    // QueryWrapper<WxUserInfo>().eq("openid", openid));
    // if(resultUserInfo==null){ // 不存在 插入用户
    // wxUserInfo.setOpenid(openid);
    // wxUserInfo.setRegisterDate(new Date());
    // wxUserInfo.setLastLoginDate(new Date());
    // wxUserInfoService.save(wxUserInfo);
    // System.out.println(wxUserInfo.getId());
    // }else{ // 存在 更新用户信息
    // System.out.println("存在");
    // resultUserInfo.setNickName(wxUserInfo.getNickName());
    // resultUserInfo.setAvatarUrl(wxUserInfo.getAvatarUrl());
    // resultUserInfo.setLastLoginDate(new Date());
    // wxUserInfoService.updateById(resultUserInfo);
    // wxUserInfo.setId(resultUserInfo.getId());
    // }
    // //把token返回给客户端
    // String token = JwtUtils.createJWT(openid, wxUserInfo.getNickName(),
    // SystemConstant.JWT_TTL);
    // Map<String,Object> resultMap=new HashMap<String,Object>();
    // resultMap.put("token",token);
    // return R.ok(resultMap);

    // }

}
