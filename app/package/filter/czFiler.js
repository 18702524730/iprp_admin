angular.module('iprpAdminApp').filter("czType",function(){
    return function(td) {
        if(td === 1){
            return "网页存证";
        }else if(td === 2){
            return "文件存证";
        }
    };
});
angular.module('iprpAdminApp').filter("czState",function(){
    return function(td) {
        var ret = ''
        switch (td+''){
          case 'null':
            ret = "未申请";
            break;
          case '1':
            ret = "审核中";
            break;
          case '2':
            ret = "审核通过";
            break;
          case '3':
            ret = "受理中";
            break;
          case '4':
            ret = "已出证";
            break;
          case '5':
            ret = "受理完毕";
            break;
          case '6':
            ret = "终止";
            break;
          case '7':
            ret = "拒绝受理";
            break;
          case '8':
            ret = "撤销中";
            break;
          case '9':
            ret = "已撤销";
            break;
        }
        return ret;
    };
});
angular.module('iprpAdminApp').filter("contactState",function(){
    return function(td) {
        if(!td){
            return "未联系";
        }else if(td === 1){
            return "未联系";
        }else if(td === 2){
            return "已联系";
        }
    };
});
