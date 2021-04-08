angular.module('iprpAdminApp').filter("InvoiceStateFilter",function(){
    return function(td) {
        if(td === 0){
            return "未开";
        }else if(td === 1){
            return "开票中";
        }else if(td === 2){
            return "已开";
        }
    };
});

angular.module('iprpAdminApp').filter("InvoiceAuditStateFilter",function(){
    return function(td) {
        if(td === 0){
            return "待审核";
        }else if(td === 1){
            return "审核成功";
        }else if(td === 2){
            return "审核失败"
        }
    };
});

angular.module('iprpAdminApp').filter("InvoiceTypeFilter",function(){
    return function(td) {
        if(td === 1){
            return "普通发票";
        }else if(td === 2){
            return "增值税发票";
        }
    };
});

angular.module('iprpAdminApp').filter("InvoiceOpenTypeFilter",function(){
    return function(td) {
        if(td === 1){
            return "电子发票";
        }else if(td === 2){
            return "纸质发票";
        }
    };
});


angular.module('iprpAdminApp').filter("OpenTypeFilter",function(){
    return function(td) {
        if(td === 1){
            return "官费";
        }else if(td === 2){
            return "服务费";
        }else if(td === 0){
            return "官费和服务费"
        }
    };
});

angular.module('iprpAdminApp').filter("InvoicePaySttFilter",function(){
    return function(td) {
        if(td == 0){
            return "未支付";
        }else if(td == 1){
            return "已支付";
        }else if(td == 2){
            return "已支付 未确认";
        }else if(td == 3){
            return "已支付 待确认";
        }else if(td == 4){
            return "已支付 全部收款成功";
        }else if(td == 5){
            return "已支付 部分收款成功";
        }else if(td == 6){
            return "已支付 划拨失败";
        }else if(td == 7){
            return "支付失败";
        }else if(td == 20){
            return "退款成功";
        }
    };
});