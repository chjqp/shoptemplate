import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/layout/index.vue'),
    redirect:'/home',
    children:[
      {
        path: "/home",
        name: "首页",
        component: () =>
          import( "../views/home/index"),
      },
      {
        path: "/user",
        name: "用户管理",
        component: () =>
          import( "../views/user"),
      },
      {
        path: "/bigType",
        name: "商品大类管理",
        component: () =>
          import( "../views/bigType"),
      },
      {
        path: "/smallType",
        name: "商品小类管理",
        component: () =>
          import( "../views/smallType"),
      },
      {
        path: "/product",
        name: "商品管理",
        component: () =>
          import( "../views/product"),
      },
      {
        path: "/order",
        name: "订单管理",
        component: () =>
          import( "../views/order"),
      },
      {
        path: "/modifyPassword",
        name: "修改密码",
        component: () =>
          import( "../views/modifyPassword"),
      }
    ]
  },
  // 其他路由配置
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


// import { createRouter, createWebHashHistory } from "vue-router";


// const routes = [

//   {
//     path: "/",
//     name: "首页",
//     component: () =>import( "../views/layout/index.vue"),
//     redirect:'/home',
//     children:[
//       {
//         path: "/home",
//         name: "首页",
//         component: () =>
//           import( "../views/home/index"),
//       },
//       {
//         path: "/user",
//         name: "用户管理",
//         component: () =>
//           import( "../views/user"),
//       },
//       {
//         path: "/bigType",
//         name: "商品大类管理",
//         component: () =>
//           import( "../views/bigType"),
//       },
//       {
//         path: "/smallType",
//         name: "商品小类管理",
//         component: () =>
//           import( "../views/smallType"),
//       },
//       {
//         path: "/product",
//         name: "商品管理",
//         component: () =>
//           import( "../views/product"),
//       },
//       {
//         path: "/order",
//         name: "订单管理",
//         component: () =>
//           import( "../views/order"),
//       },
//       {
//         path: "/modifyPassword",
//         name: "修改密码",
//         component: () =>
//           import( "../views/modifyPassword"),
//       }
//     ]
//   },
//   {
//     path: "/login",
//     name: "Login",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import( "../views/login/login.vue"),
//   }
// ];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

// export default router;
