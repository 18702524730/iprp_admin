angular.module('iprpAdminApp').filter("PayStateFilter",function(){
    return function(td) {
        if(td === 1){
            return "启用";
        }else if(td === 0){
            return "禁用";
        }
    };
});
angular.module('iprpAdminApp').filter("ExpressIsOrderFilter",function(){
    return function(td) {
        if(td === true){
            return "是";
        }else if(td === false){
            return "否";
        }
    };
});
angular.module('iprpAdminApp').filter("ExpressStateFilter",function(){
    return function(td) {
        if(td === 1){
            return "启用";
        }else if(td === 0){
            return "禁用";
        }
    };
});