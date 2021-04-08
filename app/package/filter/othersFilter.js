angular.module('iprpAdminApp').filter('orderTypeFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      if(input == '10'){
        return '待提交';
      }
      if(input == '11'){
        return '财务审核';
      }
      if(input == '12'){
        return '平台审核';
      }
      if(input == '13'){
        return '审核通过';
      }
      
    }
  })
  angular.module('iprpAdminApp').filter('payTypeFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      if(input == '1'){
        return '支付宝';
      }
      if(input == '2'){
        return '对公打款';
      }
      if(input == '3'){
        return '其他';
      }
      if(input == '4'){
        return '周期结算';
      }
    }
  })
  angular.module('iprpAdminApp').filter('orderstateFormat',function(){
    return function(input){
      // if(input == null || input=='' || typeof(input) == "undefined"){
      //   return "--";
      // }
      if(input == '-1'){
        return '已关闭';
      }
      if(input == '0'){
        return '待付款';
      }
      if(input == '1'){
        return '已付款';
      }
      
    }
  })
  angular.module('iprpAdminApp').filter('paystateFormat',function(){
    return function(input){
      // if(input == null || input=='' || typeof(input) == "undefined"){
      //   return "--";
      // }
      if(input == '0'){
        return '未支付';
      }
      if(input == '1'){
        return '已支付';
      }
      
    }
  })
  angular.module('iprpAdminApp').filter('subjectTypeFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      if(input == '1' || input == '3'|| input == '5'){
        return '申请人';
      }
      if(input == '2' || input == '4'){
        return '企业';
      }
    }
  })
  angular.module('iprpAdminApp').filter('invoiceTypeFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      if(input == '1' ){
        return '增值税普通发票';
      }
      if(input == '2' ){
        return '增值税专用发票';
      }
    }
  })
  angular.module('iprpAdminApp').filter('picType',function(){
    return function(input){
      if(input == '1' ){
        return '黑白色';
      }
      if(input == '2' ){
        return '指定色';
      }
    }
  })
  angular.module('iprpAdminApp').filter('originType',function(){
    return function(input){
      if(input == '1' ){
        return 'PC';
      }else if(input == '5'){
        return "渠道"
      }else {
        return 'H5'
      }
    }
  })
  angular.module('iprpAdminApp').filter('orderServerStateFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "";
      }
      if(input == '1'){
        return '待服务';
      }
      if(input == '2'){
        return '服务中';
      }
      if(input == '3'){
        return '服务完成';
      }
      
    }
  })
  angular.module('iprpAdminApp').filter('checkedStautsFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "";
      }
      if(input == '1'){
        return '认证成功';
      }
      if(input == '2'){
        return '认证中';
      }
      if(input == '4'){
        return '认证失败';
      }
    }
  })
  angular.module('iprpAdminApp').filter('confirmStatusFormat',function(){
    return function(input){
      // if(input == null || input=='' || typeof(input) == "undefined"){
      //   return "";
      // }
      if(input == '1'){
        return '已确认';
      }
      if(input == '0'){
        return '待确认';
      }
    }
  })
  angular.module('iprpAdminApp').filter('epidemicSourceFormat',function(){
    return function(input){
      // if(input == null || input=='' || typeof(input) == "undefined"){
      //   return "";
      // }
      if(input == '1'){
        return 'web';
      }
      if(input == '2'){
        return 'h5';
      }
    }
  })
  
  angular.module('iprpAdminApp').filter('processStatusFormat',function(){
    return function(input){
      // if(input == null || input=='' || typeof(input) == "undefined"){
      //   return "";
      // }
      if(input == '1'){
        return '已处理';
      }
      if(input == '0'){
        return '待处理';
      }
    }
  })
  angular.module('iprpAdminApp').filter('ClsDataFormat',function(){
    var cateIdData = [
      {
        "id": 1,
        "goodsname": "化工产品"
      },
      {
        "id": 2,
        "goodsname": "颜料油漆"
      },
      {
        "id": 3,
        "goodsname": "日用化工"
      },
      {
        "id": 4,
        "goodsname": "工业用油"
      },
      {
        "id": 5,
        "goodsname": "医药制剂"
      },
      {
        "id": 6,
        "goodsname": "五金器具"
      },
      {
        "id": 7,
        "goodsname": "机械设备"
      },
      {
        "id": 8,
        "goodsname": "手工用具"
      },
      {
        "id": 9,
        "goodsname": "电子产品"
      },
      {
        "id": 10,
        "goodsname": "医疗用品"
      },
      {
        "id": 11,
        "goodsname": "家用电器"
      },
      {
        "id": 12,
        "goodsname": "运载工具"
      },
      {
        "id": 13,
        "goodsname": "军火烟花"
      },
      {
        "id": 14,
        "goodsname": "珠宝首饰"
      },
      {
        "id": 15,
        "goodsname": "音乐器具"
      },
      {
        "id": 16,
        "goodsname": "文具用品"
      },
      {
        "id": 17,
        "goodsname": "绝缘材料"
      },
      {
        "id": 18,
        "goodsname": "皮革皮具"
      },
      {
        "id": 19,
        "goodsname": "建筑材料"
      },
      {
        "id": 20,
        "goodsname": "家具工艺"
      },
      {
        "id": 21,
        "goodsname": "日用器具"
      },
      {
        "id": 22,
        "goodsname": "缆绳帐篷"
      },
      {
        "id": 23,
        "goodsname": "纺织纺线"
      },
      {
        "id": 24,
        "goodsname": "床上用品"
      },
      {
        "id": 25,
        "goodsname": "服装鞋帽"
      },
      {
        "id": 26,
        "goodsname": "饰品编带"
      },
      {
        "id": 27,
        "goodsname": "地席墙帷"
      },
      {
        "id": 28,
        "goodsname": "娱乐器械"
      },
      {
        "id": 29,
        "goodsname": "食品调料"
      },
      {
        "id": 30,
        "goodsname": "副食调料"
      },
      {
        "id": 31,
        "goodsname": "林业农业"
      },
      {
        "id": 32,
        "goodsname": "啤酒饮料"
      },
      {
        "id": 33,
        "goodsname": "酒精饮料"
      },
      {
        "id": 34,
        "goodsname": "烟草烟具"
      },
      {
        "id": 35,
        "goodsname": "广告销售"
      },
      {
        "id": 36,
        "goodsname": "金融地产"
      },
      {
        "id": 37,
        "goodsname": "建筑维修"
      },
      {
        "id": 38,
        "goodsname": "通讯服务"
      },
      {
        "id": 39,
        "goodsname": "运输旅游"
      },
      {
        "id": 40,
        "goodsname": "材料处理"
      },
      {
        "id": 41,
        "goodsname": "教育娱乐"
      },
      {
        "id": 42,
        "goodsname": "设计研发"
      },
      {
        "id": 43,
        "goodsname": "餐饮住宿"
      },
      {
        "id": 44,
        "goodsname": "医疗美容"
      },
      {
        "id": 45,
        "goodsname": "法律服务"
      }
    ];
    return function(input){
      return '第'+ input + '类 - ' + cateIdData[input-1]['goodsname']
    }
  })
  angular.module('iprpAdminApp').filter('reportTypeFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "";
      }
      if(input == '1'){
        return '侵犯知识产权';
      }
      if(input == '2'){
        return '伪劣商品';
      }
      
    }
  })
  angular.module('iprpAdminApp').filter('refundAuditStateFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "";
      }
      if(input == '0'){
        return '待审核';
      }
      if(input == '1'){
        return '商家同意';
      }
      if(input == '2'){
        return '商家驳回';
      }
      if(input == '3'){
        return '退款完成';
      }
      if(input == '4'){
        return '先行赔付';
      }
    }
  })
  angular.module('iprpAdminApp').filter('srcChannelFormat',function(){
    return function(input){
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "";
      }
      if(input == '1'){
        return '拾贝网';
      }
      if(input == '2'){
        return '拾贝宝';
      }
    }
  })

  angular.module('iprpAdminApp').filter('dealStateFormat',function(){
    return function(input){
      if(input === null || input==='' || typeof(input) === "undefined"){
        return "";
      }
      if(input == '0'){
        return '平台受理中';
      }
      if(input == '1'){
        return '专家处理中';
      }
      if(input == '2'){
        return '问题已完结';
      }
    }
  })
  angular.module('iprpAdminApp').filter('busiChangeFormat',function(){
    return function(input){
      if(input === null || input==='' || typeof(input) === "undefined"){
        return "";
      }
      if(input == '0'){
        return '未转化';
      }
      if(input == '1'){
        return '已转化';
      }
    }
  })

  angular.module('iprpAdminApp').filter('oemstateFormat',function(){
    return function(input){
      // if(input == null || input=='' || typeof(input) == "undefined"){
      //   return "";
      // }
      if(input == '1'){
        return '已处理';
      }
      if(input == '0'){
        return '未处理';
      }
    }
  })