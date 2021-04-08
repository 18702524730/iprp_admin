//订单状态
angular.module('iprpAdminApp').filter("deOrderStatusFilter",function(){
  return function(td) {
      if(td === -1){
          return "已关闭";
      }else if(td === 0){
          return "待付款";
      }else if(td === 1){
          return "已付款";
      }
  };
});
angular.module('iprpAdminApp').filter("demandStatusFilter",function(){
  return function(td) {
      if(td === 0){
          return "待处理";
      }else if(td === 1){
          return "处理中";
      }else if (td === 2) {
          return '已完成'
      }else if(td == -1){
          return "已关闭";
      } else{
        return '--'
      }
  };
});


