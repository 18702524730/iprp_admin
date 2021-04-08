angular.module('iprpAdminApp').filter("keerperType",function(){
    return function(td) {
        if(td === 1){
            return "企业知识产权分析报告";
        }else if(td === 2){
            return "近似商标监测报告";
        }else if(td === 3){
            return "电商监测及销售报告";
        }
    };
});
angular.module('iprpAdminApp').filter("keerperState",function(){
    return function(td) {
        if(td === 1){
            return "未报告";
        }else if(td === 2){
            return "待报告";
        }else if(td === 3){
            return "报告中";
        }else if(td === 4){
            return "已报告";
        }
    };
});