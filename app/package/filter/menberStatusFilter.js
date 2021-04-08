angular.module('iprpAdminApp').filter("ApplyUserStatusFilter",function(){
    return function(td) {
        if(td === -1){
            return "待审核";
        }else if(td === 1){
            return "审核成功";
        }else if(td === 0){
            return "审核失败";
        }
    };
});
//新增
angular.module('iprpAdminApp').filter("memberApplySubjectFilter",function(){
    return function(td) {
        if(td === 1){
            return "大陆个体";
        }else if(td === 2){
            return "大陆企业";
        }else if(td ===3){
          return "境外个体";
        }else if(td ===4){
          return "境外企业";
        }else if(td ===5){
          return "大陆个人";
        }
    };
});
//发票类型
angular.module('iprpAdminApp').filter("invoiceSubjectFilter",function(){
    return function(td) {
        if(td === 1){
            return "增值税普通发票";
        }else if(td === 2){
            return "增值税专用发票";
        }
    };
});



angular.module('iprpAdminApp').filter("memberTypeFilter",function(){
    return function(td) {
        if(td === 0){
            return "普通用户";
        }else if(td === 1){
            return "集团用户";
        }
    };
});
angular.module('iprpAdminApp').filter("memberTypeFilter",function(){
    return function(td) {
        if(td === 0){
            return "普通用户";
        }else if(td === 1){
            return "集团用户";
        }
    };
});

angular.module('iprpAdminApp').filter("memberStatusFilter",function(){
    return function(td) {
        if(td === 0){
            return "关闭";
        }else if(td === 1){
            return "开启";
        }
    };
});

angular.module('iprpAdminApp').filter("memberSexFilter",function(){
    return function(td){
        if(td === 1){
           return "男";
        }else if(td === 2){
            return "女";
        }else if(td === null){
            return "保密";

        }
    }
});

angular.module('iprpAdminApp').filter("industryType",function(){
    return function(td) {
       if(td == "010001"){
           return "农、牧、林、渔业";
        }else if(td == "010002"){
            return "采矿业";
        }else if(td == "010003"){
            return "制造业";
        }else if(td == "010004"){
            return "电力、热力、燃气及水的生产和供应业";
        }else if(td == "010005"){
            return "环境和公共设施管理业";
        }else if(td == "010006"){
            return "建筑业";
        }else if(td == "010007"){
            return "交通运输、仓储业和邮政业";
        }else if(td == "010008"){
            return "信息传输、计算机服务和软件业";
        }else if(td == "010009"){
            return "批发和零售业";
        }else if(td == "010010"){
            return "住宿、餐饮业";
        }else if(td == "010011"){
            return "金融、保险业";
        }else if(td == "010012"){
            return "房地产业";
        }else if(td == "010013"){
            return "租赁和商务服务业";
        }else if(td == "010014"){
            return "科学研究、技术服务和地质勘查业";
        }else if(td == "010015"){
            return "水利、环境和公共设施管理业";
        }else if(td == "010016"){
            return "居民服务和其他服务业";
        }else if(td == "010017"){
            return "教育";
        }else if(td == "010018"){
            return "卫生、社会保障和社会服务业";
        }else if(td == "010019"){
            return "文化、体育、娱乐业";
        }else if(td == "010020"){
            return "综合（含投资类、主业不明显）";
        }else if(td == "010021"){
            return "其它";
        };
    };
});

