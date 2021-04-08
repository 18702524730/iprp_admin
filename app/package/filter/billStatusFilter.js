angular.module('iprpAdminApp').filter("AccountTypeFilter",function(){
    return function(td) {
        if(td === 1){
            return "结算";
        }else if(td === 2){
            return "支付";
        }else if(td === 3){
            return "扣费";
        }else if(td === 4){
            return "退费";
        }
    };
});

angular.module('iprpAdminApp').filter("BillTypeFilter",function(){
    return function(td) {
        if(td === 1){
            return "官费";
        }else if(td === 2){
            return "服务费";
        }else if(td === 3){
            return "促销费";
        }
    };
});

angular.module('iprpAdminApp').filter("PaymentStateFilter",function(){
    return function(td) {
        if(td === 0){
            return "未付款";
        }else if(td === 1){
            return "已付款";
        }
    };
});

angular.module('iprpAdminApp').filter("BillOrderStateFilter",function(){
    return function(td) {
        if(td === 0){
            return "待审核";
        }else if(td === 1){
            return "待结算";
        }else if(td === 2){
            return "结算成功";
        }
    };
});

angular.module('iprpAdminApp').filter("BillOrderPayStateFilter",function(){
    return function(td) {
        if(td === 0){
            return "待审核";
        }else if(td === 1){
            return "待结算";
        }else if(td === 2){
            return "结算中";
        }else if(td === 3){
            return "结算成功";
        }
    };
});

angular.module('iprpAdminApp').filter("BillOrderPayTypeFilter",function(){
    return function(td) {
        if(td === 1){
            return "支付";
        }else if(td === 2){
            return "退款";
        }
    };
});