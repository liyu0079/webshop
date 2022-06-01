/* jshint esversion: 6 */
// 1. 引入对应模块
import Vue from 'vue'
import VueRouter  from 'vue-router'

const Home = ()=> import('./../pages/Home/Home');
const Login = ()=> import('./../pages/Login/Login');
const Register = ()=> import('./../pages/Register/Register')
const Search = ()=> import('./../pages/Search/Search');
const Goods = ()=> import('./../pages/Goods/Goods');
const SelfCenter = ()=> import('./../pages/SelfCenter/SelfCenter');
const ShopCar = ()=> import('./../pages/ShopCar/ShopCar');
const AdminLogin = ()=> import('./../pages/AdminLogin/AdminLogin');
const Admin = ()=> import('./../pages/Admin/Admin');
const SearchDetail = ()=> import('./../pages/SearchDetail/SearchDetail');
const Trade = ()=> import('./../pages/Trade/Trade');
const Pay = ()=> import('./../pages/Pay/Pay');
const PaySuccess = ()=> import('./../pages/PaySuccess/PaySuccess');
const OrderCenter = ()=>import('./../pages/OrderCenter/OrderCenter');

const Profile = ()=> import('./../pages/SelfCenter/Children/Profile');
const Update = ()=> import('./../pages/SelfCenter/Children/Update');
const EditPwd = ()=> import('./../pages/SelfCenter/Children/EditPwd');
const EditPhone = ()=> import('./../pages/SelfCenter/Children/EditPhone');
const Sales = ()=> import('./../pages/SelfCenter/Children/Sales');
const AdminSales = ()=> import('./../pages/Admin/Children/AdminSales');
const AddGoods = ()=> import('./../pages/Admin/Children/AddGoods');
const AdminGoods = ()=> import('./../pages/Admin/Children/AdminGoods');
const AdminUpdate = ()=> import('./../pages/Admin/Children/AdminUpdate');
const AdminUsers = ()=> import('./../pages/Admin/Children/AdminUsers');

// 2. 声明使用
Vue.use(VueRouter);

// 3. 输出路由对象
export default  new VueRouter({
  // 3.1 配置一级路由
  routes: [
	{
	  path: '/home',
	  component: Home,
	  meta: {showHeaderTop: true, showHeaderSearch: true}
	},
	{
	  path: '/login',
	  component: Login
	},
  {
	  path: '/register',
	  component: Register
	},
	{
	  path: '/search/:id/:pageNo',
	  component: Search,
	  meta: {showHeaderTop: true, showHeaderSearch: true}
  },
  {
	  path: '/goods/:id',
	  component: Goods,
	  meta: {showHeaderTop: true}
  },
  {
	  path: '/selfcenter',
    component: SelfCenter,
    children: [
      {path: 'profile', component: Profile},
      {path: 'update', component: Update},
      {path: 'editpwd', component: EditPwd},
      {path: 'editphone', component: EditPhone},
      {path: 'sales', component: Sales},
      {path: '/selfcenter',redirect: '/selfcenter/profile'}
    ],
  },
  {
	  path: '/shopcar',
	  component: ShopCar,
	  meta: {showHeaderTop: true}
	},
  {
    path: '/trade',
    component: Trade,
    meta: {showHeaderTop: true}    
 },
  {
     path: '/pay',
     component: Pay,
     meta: {showHeaderTop: true}    
  },
  {
     path: '/paysuccess',
     component: PaySuccess,
     meta: {showHeaderTop: true}    
  },
  {
    path: '/ordercenter',
    component: OrderCenter,
    meta: {showHeaderTop: true}    
 },
	{
	  path: '/adminlogin',
	  component: AdminLogin
  },
  {
	  path: '/admin',
    component: Admin,
    children: [
      {path: 'adminsales', component: AdminSales},
      {path: 'adminusers', component: AdminUsers},
      {path: 'addgoods', component: AddGoods},
      {path: 'admingoods', component: AdminGoods},
      {path: 'adminupdate', component: AdminUpdate},
      {path: '/admin',redirect: '/admin/admingoods'}
    ],
  },
  {
	  path: '/searchdetail',
    component: SearchDetail,
	  meta: {showHeaderTop: true, showHeaderSearch: true}
  },
	{
	  path: '/',
	  redirect: '/home'
	},
  ]
});
