angular.module('iprpAdminApp').filter("productStatusFilter",function(){
    return function(td) {
        if(td === 1){
            return "已上架";
        }else if(td === 2){
            return "未上架";
        }else if(td === 3){
            return "已下架";
        }
    };
});
angular.module('iprpAdminApp').filter("productType",function(){
    return function(td) {
        if(td === 3){
            return "品质商家";
        }else if(td === 4){
            return "商标交易";
        }else if(td === 5){
            return "优选商家";
        }else if(td === 6){
            return "支付成功页还购买了";
        }
    };
});