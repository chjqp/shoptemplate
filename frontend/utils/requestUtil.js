////////// const baseUrl = "http://localhost:8081/";
// let ajaxTimes=0;
// /**
//  * 返回 baseUrl
//  */
// export const getBaseUrl = () => {
//   return baseUrl;
// }

// /**
//  * 封装的请求工具函数
//  */
// export const requestUtil = (params) => {
// 	var start = new Date().getTime();
// 	  console.log("ajaxTimes="+ajaxTimes)
	
// 	  ajaxTimes++;
	
// 	   while(true)  if(new Date().getTime()-start > 100) break;
// 	  // 显示加载中 效果
// 	  uni.showLoading({
// 	    title: '加载中'
// 	  });
	  

	
	
	
//   return new Promise((resolve, reject) => {
//     uni.request({
//       ...params,
//       url: baseUrl + params.url,
//       success: (result) => {
// 		  //console.log("成功")
// 		ajaxTimes--;
// 		console.log("a"+ajaxTimes);
// 		if(ajaxTimes==0){
// 		  //  关闭正在等待的图标
// 		  uni.hideLoading();
// 		}
//         resolve(result);
		
//       },
//       fail: (err) => {
// 		ajaxTimes--;
// 		console.log("a"+ajaxTimes);
// 		if(ajaxTimes==0){
// 		  //  关闭正在等待的图标
// 		  uni.hideLoading();
// 		}
// 		  // console.log("失败");
//         reject(err);
		
// 		complete:()=>{
				
// 			  }
		
//       }
//     });
//   });
// }

// 记录异步请求的次数
let ajaxTimes = 0;

// 定义公共的URL
const baseUrl = "http://localhost:8083/";
 // const baseUrl = "http://yidaproserver.ltd:7026/";


/**
 * 返回baseUrl
 */
export const getBaseUrl = () => {
  return baseUrl;
}

/**
 * uni.getUserProfile封装
 */
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * uni.login封装
 */
export const getLogin = () => {
  return new Promise((resolve, reject) => {
    // 获取小程序登录成功后的code
    uni.login({
      provider: 'weixin',
      timeout: 5000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * promise形式的 小程序的微信支付封装
 */
export const requestPay = (pay) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      ...pay,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 后端请求工具类封装
 * @param {*} params 请求参数
 */
// export const requestUtil = (params) => {
//   // 判断 URL 中是否带有 /my/ 请求的是私有的路径 带上 header token
//   // let header = { ...params.header };
//   // if (params.url.includes("/my/")) {
//   //   // 拼接 header 带上 token
//   //   header["token"] = uni.getStorageSync("token");
//   // }

//   ajaxTimes++;

//   // 显示加载中效果
//   uni.showLoading({
//     title: "加载中",
//     mask: true
//   });

//   return new Promise((resolve, reject) => {
//     uni.request({
//       ...params,
//       header: header,
//       url: baseUrl + params.url,
//       success: (result) => {
//         resolve(result.data);
//       },
//       fail: (err) => {
//         reject(err);
//       },
//       complete: () => {
//         ajaxTimes--;
//         if (ajaxTimes === 0) {
//           // 关闭正在等待的图标
//           uni.hideLoading();
//         }
//       }
//     });
//   });
// }



/**
 * 封装的请求工具函数
 */
// export const requestUtil = (params) => {
// 	var start = new Date().getTime();
// 	  console.log("ajaxTimes="+ajaxTimes)
	
// 	  ajaxTimes++;
	
// 	   while(true)  if(new Date().getTime()-start > 100) break;
// 	  // 显示加载中 效果
// 	  uni.showLoading({
// 	    title: '加载中'
// 	  });
	  

	
	
	
//   return new Promise((resolve, reject) => {
//     uni.request({
//       ...params,
//       url: baseUrl + params.url,
//       success: (result) => {
// 		  //console.log("成功")
// 		ajaxTimes--;
// 		console.log("a"+ajaxTimes);
// 		if(ajaxTimes==0){
// 		  //  关闭正在等待的图标
// 		  uni.hideLoading();
// 		}
//         resolve(result);
		
//       },
//       fail: (err) => {
// 		ajaxTimes--;
// 		console.log("a"+ajaxTimes);
// 		if(ajaxTimes==0){
// 		  //  关闭正在等待的图标
// 		  uni.hideLoading();
// 		}
// 		  // console.log("失败");
//         reject(err);
		
// 		complete:()=>{
				
// 			  }
		
//       }
//     });
//   });
// }
// export const requestUtil = (params) => {
//   var start = new Date().getTime();
//   console.log("ajaxTimes=" + ajaxTimes);

//   ajaxTimes++;

//   while (true) if (new Date().getTime() - start > 100) break;
//   // 显示加载中效果
//   uni.showLoading({
//     title: '加载中'
//   });

//   // 初始化 header
//   let header = { ...params.header };
  
//   // 如果请求的 URL 包含 "/my/"，则附加 token
//   if (params.url.includes("/my/")) {
//     // 拼接 header 带上 token
//     // header["token"] = uni.getStorageSync("token");
// 	const storedToken = uni.getStorageSync("token");
// 	console.log("storedtoken"+storedToken);
// 	    if (storedToken) {
// 			console.log(storedToken);
// 	      header["token"] = storedToken;
// 	    } else {
// 	      console.warn("No token found in storage");
// 	    }
//   }

//   return new Promise((resolve, reject) => {
//     uni.request({
//       ...params,
//       url: baseUrl + params.url, // 拼接完整 URL
//       header: header, // 使用新的 header
//       success: (result) => {
//         ajaxTimes--;
//         console.log("a" + ajaxTimes);
//         if (ajaxTimes == 0) {
//           // 关闭正在等待的图标
//           uni.hideLoading();
//         }
//         resolve(result);
//       },
//       fail: (err) => {
//         ajaxTimes--;
//         console.log("a" + ajaxTimes);
//         if (ajaxTimes == 0) {
//           // 关闭正在等待的图标
//           uni.hideLoading();
//         }
//         reject(err);
//       },
//       complete: () => {
//         // 任何必要的完成后的逻辑
//       }
//     });
//   });
// };


// export const wxlogin = async (loginParam) => {
//   try {
//     const result = await requestUtil({
//       url: "/user/wxlogin",
//       data: loginParam,
//       method: "POST"
//     });
//     console.log(result);
//     token.value = result.data.token;
// 	uni.setStorageSync('token', token.value);
// 	console.log("wxlogin"+token.value);
//     // 直接调用 createOrder 而不是 this.createOrder
//     await createOrder(token.value);
//   } catch (error) {
//     console.error("请求用户token失败", error);
//   }
// };


export const requestUtil = (params) => {
  var start = new Date().getTime();
  console.log("ajaxTimes=" + ajaxTimes);

  ajaxTimes++;

  while (true) if (new Date().getTime() - start > 100) break;
  // 显示加载中效果
  uni.showLoading({
    title: '加载中'
  });

  // 初始化 header
  let header = { ...params.header };
  
  // 如果请求的 URL 包含 "/my/"，则附加 token
  if (params.url.includes("/my/")) {
    const storedToken = uni.getStorageSync("token");
    console.log("Stored token:", storedToken);  // Log the token
    if (storedToken) {
      header["token"] = storedToken;
    } else {
      console.warn("No token found in storage");
    }
  }

  return new Promise((resolve, reject) => {
    uni.request({
      ...params,
      url: baseUrl + params.url, // 拼接完整 URL
      header: header, // 使用新的 header
      success: (result) => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          // 关闭正在等待的图标
          uni.hideLoading();
        }
        resolve(result);
      },
      fail: (err) => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          // 关闭正在等待的图标
          uni.hideLoading();
        }
        console.error("Request failed:", err);  // Log any request failure
        reject(err);
      }
    });
  });
};
