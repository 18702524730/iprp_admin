angular.module('iprpAdminApp').filter("servicerStatusFilter",function(){
    return function(td) {
        if(td === 1){
            return "正常";
        }else if(td === 0){
            return "冻结";
        }else if(td === 2){
            return "失信";
        }
    };
});

angular.module('iprpAdminApp').filter("serviceStatusFilter",function(){
    return function(td) {
        if(td === 0){
            return "禁用";
        }else if(td === 1){
            return "启用";
        }
    };
});
//退款状态 0 待审核 1 待退款 2 已退款 3 退款失败 4 退款中
angular.module('iprpAdminApp').filter("refundStatusFilter",function(){
    return function(td) {
        if(td === 0){
            return "待审核";
        }else if(td === 1){
            return "商家同意";
        }else if(td === 2){
            return "商家驳回";
        }else if(td === 3){
            return "退款完成";
        }else if(td === 4){
            return "先行赔付";
        }
    };
});
//退款方式 0 自动 1 手动
angular.module('iprpAdminApp').filter("refundTypeFilter",function(){
    return function(td) {
        if(td === 0){
            return "自动";
        }else if(td === 1){
            return "手动";
        }
    };
});

//退款类型（0：全部，1：服务费，2：官费，3：其他）
angular.module('iprpAdminApp').filter("refundFormFilter",function(){
    return function(td) {
        if(td === 0){
            return "全部退款";
        }else if(td === 1){
            return "退服务费";
        }else if(td === 2){
            return "退官费";
        }else if(td === 3){
            return "其他金额";
        }
    };
});

//订单状态，-1已取消 0 未付款 1 已付款 2 已完成
angular.module('iprpAdminApp').filter("orderStatusFilter",function(){
    return function(td) {
        if(td === 0){
            return "未付款";
        }else if(td === 1){
            return "已付款";
        }else if(td === 2){
            return "已完成";
        }else if(td === -1){
            return "已取消";
        }
    };
});

angular.module('iprpAdminApp').filter("isBadStatusFilter",function(){
    return function(td) {
        if(td === false){
            return "正常";
        }else if(td === true){
            return "失信";
        }
    };
});

//操作类型  0 申请退款 1 通过 2 驳回
angular.module('iprpAdminApp').filter("operatorStatusFilter",function(){
    return function(td) {
        if(td === 0){
            return "申请退款";
        }else if(td === 1){
            return "通过";
        }else if(td === 2){
            return "驳回";
        }
    };
});

//退款状态 0 待退款 1 退款中 2 已退款 3 退款失败
angular.module('iprpAdminApp').filter("refundStatus2Filter",function(){
    return function(td) {
        if(td === 0){
            return "待退款";
        }else if(td === 1){
            return "退款中";
        }else if(td === 2){
            return "已退款";
        }else if(td === 3){
            return "退款失败";
        }
    };
});



