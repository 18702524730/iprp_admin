
// 使用对象
angular.module('iprpAdminApp').filter("usageObjType",function(){
  return function(input) {
    switch (input+0) {
      case 1: return 'B端';
      case 2: return 'C端';
      default: return '--'
    }
  };
});
// 发放状态
angular.module('iprpAdminApp').filter("couponStates",function(){
  return function(input) {
    switch (input+0) {
      case 0: return '已发完';
      case 1: return '发放中';
      case 2: return '已暂停';
      default: return '--'
    }
  };
});
// 重复领取
angular.module('iprpAdminApp').filter("RepeatGet",function(){
  return function(input) {
    switch (input+0) {
      case 0: return '不允许';
      case 1: return '允许';
      default: return '--'
    }
  };
});
// 拾贝券类型
angular.module('iprpAdminApp').filter("couponType",function(){
  return function(input) {
    switch (input+0) {
      case 1: return '升润券';
      case 2: return '提佣券';
      default: return '--'
    }
  };
});
// 获取方式
angular.module('iprpAdminApp').filter("obtainType",function(){
  return function(input) {
    switch (input+0) {
      case 1: return '用户领取';
      case 2: return '系统发放';
      default: return '--'
    }
  };
});
// 券状态
angular.module('iprpAdminApp').filter("couponStatus",function(){
  return function(input) {
    switch (input+0) {
      case 0: return '未使用';
      case 1: return '已使用';
      case 2: return '使用中';
      case -1: return '已过期';
      default: return '--'
    }
  };

});
// 使用时限
angular.module('iprpAdminApp').filter("couponTimeType",function(){
  return function(input) {
    switch (input+0) {
      case 1: return '固定时段';
      case 2: return '领取日计时';
      default: return '--'
    }
  };
});