/*合伙人相关过滤器*/

/*是否实名认证*/
angular.module('iprpAdminApp').filter("isAuthenticationFil",function(){
  return function(input) {
    switch (input) {
      case 0: return '未实名'; break;
      case 1: return '已实名'; break;
    }
  };
});

/*合伙人店铺状态*/
angular.module('iprpAdminApp').filter("partnerStoreStatusFil",function(){
  return function(input) {
    switch (input) {
      case 0: return '正常'; break;
      case 1: return '冻结'; break;
    }
  };
});
/**
 * 合伙人账号类型
 */
angular.module('iprpAdminApp').filter("memberType",function(){
  return function(input) {
    switch (+input) {
      case 1: return '自行申请';
      case 2: return '手动创建';
      default:
        return '--'
    }
  };
});

/*合伙人开店状态*/
angular.module('iprpAdminApp').filter("isOpentatusFil",function(){
  return function(input) {
    switch (input) {
      case 0: return '未开店'; break;
      case 1: return '已开店'; break;
    }
  };
});

/*审核状态*/
angular.module('iprpAdminApp').filter("withdrawStateFil",function(){
  return function(input) {
    switch (input) {
      case 0: return '提现中'; break;
      case 1: return '提现成功'; break;
      case -1: return '提现失败'; break;
    }
  };
});

/*IPT项目*/
/*客户端*/
angular.module('iprpAdminApp').filter("miniSourceFil",function(){
  return function(input) {
    switch (input) {
      case 0: return '小程序-B';
      case 1: return '小程序-C';
      default: return '--'
    }
  };
});
/*行为类型*/
angular.module('iprpAdminApp').filter("logTypeFil",function(){
  return function(input) {
    switch (input) {
      case 0: return '注册';
      case 1: return '登录';
      case 2: return '签到';
      case 3: return '邀请他人注册';
      case 4: return '邀请他人开店';
      case 5: return '开店';
      case 6: return '订单完成'; 
      case 7: return '服务完成';
      case 8: return '季度分红'; 
      case 9: return '服务评价'; 
      case 101: return '2018中秋博饼';
    }
  };
});
/*上链状态*/
angular.module('iprpAdminApp').filter("onChainFil",function(){
  return function(input) {
    switch (input) {
      case 2: return '未上链'; break;
      case 1: return '已上链'; break;
    }
  };
});
/**创力奖励记录行为 */
angular.module('iprpAdminApp').filter("awardLogType",function(){
  return function(input) {
    switch (input) {
      case 0: return '登录';
      case 1: return '分享被访问';
    }
  };
});
/**珍珠生成记录类型 */
angular.module('iprpAdminApp').filter("IPTLogType",function(){
  return function(input) {
    switch (input) {
      case 1: return '注册生成';
      case 2: return '日常生成';
      default: return '--';
    }
  };
});
/**珍珠领取状态 */
angular.module('iprpAdminApp').filter("iptState",function(){
  return function(input) {
    switch (input+0) {
      case 0: return '未拾取'; break;
      case 1: return '已拾取'; break;
      case 2: return '未拾取'; break;
    }
  };
});
// 珍珠状态、
angular.module('iprpAdminApp').filter("iptState2",function(){
  return function(input) {
    switch (input+0) {
      case 0: return '有效';
      case 1: return '有效';
      case 2: return '失效';
      default: return '--'
    }
  };
});
// B端banner跳转类型
angular.module('iprpAdminApp').filter("jumpType",function(){
  return function(input) {
    switch (input+0) {
      case 1: return '跳转url';
      case 2: return '富文本内容';
      default: return '--'
    }
  };
});




