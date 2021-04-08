angular.module('iprpAdminApp').filter("consultationType",function(){
    return function(td) {
        if(td === 1){
            return "专利服务";
        }else if(td === 2){
            return "版权服务";
        }else if(td === 3){
            return "科技服务";
        }else if(td === 4){
            return "维权服务";
        }else if(td === 5){
            return "其它服务";
        }else if(td === 6){
            return "国际商标服务";
        }else if(td === 7){
            return "运营推广落地页";
        }else if(td === 8){
            return "2019新春活动";
        }else if(td === 9){
            return "投诉";
        }else if(td === 10){
            return "申诉";
        }else if(td === 12){
            return "联盟服务";
        }
    };
});
angular.module('iprpAdminApp').filter("consultationModular",function(){
    return function(td) {
        if(td === 1){
            return "PCT申请";
        }else if(td === 2){
            return "巴黎公约国申请";
        }else if(td === 3){
            return "更多版权服务";
        }else if(td === 4){
            return "国家高新技术企业认定";
        }else if(td === 5){
            return "双软企业认定";
        }else if(td === 6){
            return "科技型初创企业培育工程企业";
        }else if(td === 7){
            return "杭州市重大科技创新项目";
        }else if(td === 8){
            return "商标侵权";
        }else if(td === 9){
            return "专利侵权";
        }else if(td === 10){
            return "版权侵权";
        }else if(td === 11){
            return "申请流程";
        }else if(td === 12){
            return "更多专利";
        }else if(td === 13){
            return "单一国";
        }else if(td === 14){
            return "马德里";
        }else if(td === 15){
            return "商标查询";
        }else if(td === 16){
            return "电商资料包下载";
        }else if(td === 17){
            return "电商监测维权";
        }else if(td === 18){
            return "电商质监投诉";
        }else if(td === 19){
            return "专利侵权判定报告";
        }else if(td === 20){
            return "防疫知产咨询";
        }
    };
});
angular.module('iprpAdminApp').filter("source",function(){
    return function(td) {
        //1联盟官网;2联盟服务号;3拾贝服务号;4拾贝订阅号;5工艺资源网
        if(td === 1){
            return "联盟官网";
        }else if(td === 2){
            return "联盟服务号";
        }else if(td === 3){
            return "拾贝服务号";
        }else if(td === 4){
            return "拾贝订阅号";
        }else if(td === 5){
            return "工艺资源网";
        }
    };
});

angular.module('iprpAdminApp').filter("patentType",function(){
    return function(td) {
        if(td === 1){
            return "外观设计专利";
        }else if(td === 2){
            return "发明专利";
        }else if(td === 3){
            return "实用新型专利";
        }
    };
});
angular.module('iprpAdminApp').filter("consultationState",function(){
    return function(td) {
        if(td === 0){
            return "待联系";
        }else if(td === 1){
            return "联系中";
        }else if(td === 2){
            return "已联系";
        }
    };
});

angular.module('iprpAdminApp').filter("adviseTypeF",function(){
    return function(td) {
        if(td == 1){
            return "无效信息";
        }else if(td == 2){
            return "建议";
        }else if(td === 3){
            return "投诉";
        }else if(td === 4){
            return "求助";
        }
    };
});
angular.module('iprpAdminApp').filter("patentOrderState",function(){
    return function(td) {
        if(td == 0){
            return "待受理";
        }else if(td == 1){
            return "已受理(待支付)";
        }else if(td === 2){
            return "报告出具中(已支付)";
        }else if(td === 3){
            return "报告完成";
        }else if(td === -1){
            return "已关闭";
        }
    };
});
angular.module('iprpAdminApp').filter("protectOrderState",function(){
    return function(td) {
        if(td == 0){
            return "待受理";
        }else if(td == 1){
            return "已受理";
        }else if(td === 2){
            return "已完成";
        }else if(td === -1){
            return "已关闭";
        }
    };
});
angular.module('iprpAdminApp').filter("intellectualPropertyType",function(){
    return function(td) {
        if(td == 1){
            return "商标";
        }else if(td == 2){
            return "版权";
        }else if(td === 3){
            return "外观设计专利";
        }else if(td === 4){
            return "发明专利";
        }else if(td === 5){
            return "实用新型专利";
        }else if(td === 6){
            return "其他";
        }
    };
});
angular.module('iprpAdminApp').filter("ciqServiceType",function(){
    return function(td) {
        if(td == 1){
            return "海关知识产权备案";
        }else if(td == 2){
            return "海关查处";
        }else if(td === 3){
            return "专项行动";
        }
    };
});
angular.module('iprpAdminApp').filter("serviceTypeF",function(){
    return function(td) {
        if(td == 1){
            return "投诉";
        }else if(td == 2){
            return "申诉";
        }
    };
});
angular.module('iprpAdminApp').filter("involvePlatformF",function(){
    return function(td) {
        if(td == 1){
            return "淘宝";
        }else if(td == 2){
            return "天猫";
        }else if(td === 3){
            return "京东";
        }
    };
});
angular.module('iprpAdminApp').filter("caseTypeF",function(){
    return function(td) {
        if(td == 1){
            return "商标侵权";
        }else if(td == 2){
            return "专利侵权";
        }else if(td === 3){
            return "版权侵权";
        }else if(td === 4){
            return "行业低价治理";
        }else if(td === 5){
            return "其它";
        }
    };
});
