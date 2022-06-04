/* jshint esversion: 6 */
import Vue from 'vue'
import {
  HOME_CASUAL,
  CATEGORY_LIST,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  GOODS_DETAIL,
  GOODS_COMMENT,
  USER_INFO,
  RESET_USER_INFO,
  CART_GOODS_LIST,
  CHANGE_GOODS_COUNT,
  SELECTED_ALL_GOODS,
  SELECTED_SINGLE_GOODS,
  DEL_SINGLE_GOODS,
  DEL_ALL_GOODS,
  RECEIVE_INFO,
  CHANGE_RECEIVE_INFO,
  DEL_RECEIVE_INFO,
  SHOPPING_RECORD,
  CANCEL_SHOPPING,
  DEL_SINGLE_RECORD,
  DEL_ALL_RECORD,
  SEARCH_KEYWORDS,
  FROZEN_USER,
  RECOVERY_USER
} from './mutation-types'

export default {
  [HOME_CASUAL](state, {
    homecasual
  }) {
    state.homecasual = homecasual;
  },

  [CATEGORY_LIST](state, {
    categoryList
  }) {
    state.categoryList = categoryList;
  },

  [HOME_SHOP_LIST](state, {
    homeshoplist
  }) {
    state.homeshoplist = state.homeshoplist.concat(homeshoplist);
  },

  [RECOMMEND_SHOP_LIST](state, {
    recommendshoplist
  }) {
    state.recommendshoplist = recommendshoplist;
  },

  [GOODS_DETAIL](state, {
    goodsDetail
  }) {
    state.goodsDetail = goodsDetail;
  },

  [GOODS_COMMENT](state, {
    goodsComment
  }) {
    state.goodsComment = goodsComment;
  },

  [USER_INFO](state, {
    userInfo
  }) {
    state.userInfo = userInfo;
  },

  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },

  [CART_GOODS_LIST](state, {
    cartgoods
  }) {
    state.cartgoods = cartgoods;
  },

  [CHANGE_GOODS_COUNT](state, {
    goods,
    count
  }) {
    const index = state.cartgoods.indexOf(goods);
    state.cartgoods[index].buy_count = count;
  },

  [SELECTED_ALL_GOODS](state, {
    isSelectedAll
  }) {
    state.cartgoods.forEach((goods) => {
      if (goods.checked) {
        // 该属性存在
        goods.checked = !isSelectedAll;
      } else {
        Vue.set(goods, 'checked', !isSelectedAll);
      }
    });
  },

  [SELECTED_SINGLE_GOODS](state, {
    goods
  }) {
    const index = state.cartgoods.indexOf(goods);
    if (!goods.checked) {
      //Vue.set(goods, 'checked', true);
      state.cartgoods[index].checked = true;
    } else {
      state.cartgoods[index].checked = !state.cartgoods[index].checked;
    }
  },

  [DEL_SINGLE_GOODS](state, {
    goods
  }) {
    goods.buy_count = 0;
    const index = state.cartgoods.indexOf(goods);
    state.cartgoods.splice(index, 1);
  },

  [DEL_ALL_GOODS](state) {
    state.cartgoods = [];
  },

  [RECEIVE_INFO](state, {
    receiveInfo
  }) {
    state.receiveInfo = receiveInfo;
  },

  [CHANGE_RECEIVE_INFO](state, {
    id,
    receive_name,
    receive_phone,
    receive_address,
    address_default
  }) {
    const index = state.receiveInfo.indexOf(id);
    state.receiveInfo[index].receive_name = receive_name;
    state.receiveInfo[index].receive_phone = receive_phone;
    state.receiveInfo[index].receive_address = receive_address;
    state.receiveInfo[index].address_default = address_default;
  },

  [DEL_RECEIVE_INFO](state, {
    id
  }) {
    const index = state.receiveInfo.indexOf(id);
    state.receiveInfo.splice(index, 1);
  },

  [SHOPPING_RECORD](state, {
    shoppingrecord
  }) {
    state.shoppingrecord = shoppingrecord;
  },

  [CANCEL_SHOPPING](state, {
    id
  }) {
    const index = state.shoppingrecord.indexOf(id);
    state.shoppingrecord[index].status = 2;
  },
  // 删除记录不是真正删除数据库，而是不对用户进行显示
  [DEL_SINGLE_RECORD](state, {
    id
  }) {
    const index = state.shoppingrecord.indexOf(id);
    state.shoppingrecord[index].status = 3;
  },

  [DEL_ALL_RECORD](state, {
    user_id
  }) {
    state.shoppingrecord.forEach(function (item) {
      if (state.shoppingrecord[item].user_id === user_id) {
        state.shoppingrecord[item].status = 3;
      }
    });
  },

  [SEARCH_KEYWORDS](state, {
    searchresults
  }) {
    state.searchresults = searchresults;
  },
  
  [FROZEN_USER](state,{
    id
  }){
    const index = state.userInfo.indexOf(id);
    state.userInfo[index].user_status = 0;
  },

  [RECOVERY_USER](state,{
    id
  }){
    const index = state.userInfo.indexOf(id);
    state.userInfo[index].user_status = 1;
  },
}
