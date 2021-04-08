angular.module('iprpAdminApp').filter("orderStatusFilter",function(){
    return function(td) {
        if(td === -1){
            return "已关闭";
        }else if(td === 0){
            return "未付款";
        }else if(td === 1){
            return "已付款";
        }else if(td === 2){
            return "完成";
        }
    };
});

angular.module('iprpAdminApp').filter("refundStateFilter",function(){
    return function(input){
      var ret = ''
      switch (input+''){
        case '0':
          ret = "退款审核中";
          break;
        case '1':
          ret = "已退款";
          break;
        case '2':
          ret = "已驳回";
          break;
      }
      return ret;
    };
});

angular.module('iprpAdminApp').filter("PromotionFilter",function(){
    return function(td) {
        if(td === 0){
            return "否";
        }else if(td === 1){
            return "是";
        }
    };
});

angular.module('iprpAdminApp').filter("OrderIsCloseFilter",function(){
    return function(td) {
        if(td === 1){
            return "是";
        }else if(td === 0){
            return "否";
        }
    };
});

angular.module('iprpAdminApp').filter("RefundTypeFilter",function(){
    return function(td) {
        if(td === 0){
            return "线下";
        }else if(td === 1){
            return "线上";
        }
    };
});
angular.module('iprpAdminApp').filter("RefundBearerFilter",function(){
    return function(td) {
        if(td === 0){
            return "平台";
        }else if(td === 1){
            return "服务商";
        }
    };
});
angular.module('iprpAdminApp').filter("paymentStatusFilter",function(){
    return function(td) {
        if(td === 0){
            return "未支付";
        }else if(td === 1){
            return "已支付";
        }
    };
});

angular.module('iprpAdminApp').filter("orderApplyTypeFilter",function(){
    return function(td) {
        td = td+''
        if(td == '1'){
            return "大陆个体";
        }else if(td == '2'){
            return "大陆企业";
        }else if(td == '3'){
            return "境外个体";
        }else if(td == '4'){
            return "境外企业";
        }else if(td == '5'){
            return "大陆个人";
        }
    };
});

angular.module('iprpAdminApp').filter("cxbApplyTypeFilter",function(){
    return function(td) {
        td = td+''
        if(td == '1'){
            return "国内个人";
        }else if(td == '2'){
            return "国内企业";
        }else if(td == '3'){
            return "境外个人";
        }else if(td == '4'){
            return "境外企业";
        }
    };
});

angular.module('iprpAdminApp').filter("wmApplyTypeFilter",function(){
    return function(td) {
        td = td+''
        if(td == '1'){
            return "出口企业";
        }else if(td == '2'){
            return "出口企业";
        }else if(td == '3'){
            return "进口企业";
        }else if(td == '4'){
            return "进口企业";
        }
    };
});

angular.module('iprpAdminApp').filter("cxbStautsFilter",function(){
    return function(td) {
        td = td+''
        if(td == '1'){
            return "待材料评审";
        }else if(td == '2'){
            return "评审不通过";
        }else if(td == '3'){
            return "已评审待确认";
        }else if(td == '4'){
            return "已确认待上报";
        }else if(td == '5'){
            return "已上报待审核";
        }else if(td == '6'){
            return "申报中";
        }else if(td == '7'){
            return "审核不通过";
        }else if(td == '8'){
            return "申报结束";
        }
    };
});

angular.module('iprpAdminApp').filter("orderCheckAcceptFilter",function(){
    return function(td) {
        td = td+''
        if(td == '0'){
            return "未发起验收";
        }else if(td == '1'){
            return "服务验收中";
        }else if(td == '2'){
            return "服务已验收";
        }else if(td == '3'){
            return "验收不通过";
        }
    };
});

angular.module('iprpAdminApp').filter("orderServiceStateFilter",function(){
    return function(td) {
        td = td+''
        if(td == '1'){
            return "待服务";
        }else if(td == '2'){
            return "服务中";
        }else if(td == '3'){
            return "服务完成";
        }else if(td == '4'){
            return "服务关闭";
        }
    };
});


angular.module('iprpAdminApp').filter("strToStar",function(){
    return function(str, start, end) {
    	if (!str) { return '' };
    	console.log(str, start, end)
        let arr = str.split('');
		    let start_ = start-1 || 0;
		    let end_ = end || 0;
		    arr.forEach( (item, index) => {
		      if (index>start_ && index<(arr.length-end_)) {
		        arr[index] = '*';
		      }
		    })
		    return arr.join('');
    };
});



