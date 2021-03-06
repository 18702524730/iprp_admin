angular.module("iprpAdminApp").factory("ProductService", function($resource,$stateParams,$httpParamSerializer,session) {
    return $resource(options.api.base_url + '/products/lists',{access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        "good_detail":{
            url:options.api.base_url + '/products/detail',
            method:'GET',
            isArray:false
        },
        'update_good_state':{
            url:options.api.base_url + '/products/updateproductpricestate',
            method:'GET',
            isArray: false
        },
        'update_good_price':{
            url:options.api.base_url + '/products/updateproductprice',
            method:'POST',
            headers: {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            isArray: false,
            transformRequest: function(data) {
                return $httpParamSerializer(data); 
            }
        },
        'add_product':{
            url:options.api.base_url + '/products/addproducts',
            method:'GET',
            isArray: false
        },
        'edit_product':{
            url:options.api.base_url + '/products/updateproducts',
            method:'GET',
            isArray: false
        },
        'businessTypeList':{
            url:options.api.base_url + '/businessType/lists',
            method:'GET',
            isArray: false
        }, 
        'classTypeList':{
            url:options.api.base_url + '/classType/listsbybusiness',
            method:'GET',
            isArray: false
        },
        'getGoods':{
            url:options.api.base_url + '/products/isHaveProductList',
            method:'GET',
            isArray: false
        },
        'getGoodInfo':{
            url:options.api.base_url + '/products/isHaveProduct',
            method:'GET',
            isArray: false
        },
        'businessCodes':{
            url:options.api.base_url + '/products/getallcode',
            method:'GET',
            isArray: false
        },
        // ????????????????????????
        'getTmlist':{
            url:options.api.base_url + '/trademark/getTmlist',
            method:'POST',
            isArray: false
        },
        // ????????????????????????
        'getTrademarkDetailById': {
          url:options.api.base_url + '/trademark/getTrademarkDetailById',
          method:'POST',
          isArray: false
        },
        // ????????????????????????
        'getTMOperateRecordList': {
          url:options.api.base_url + '/trademark/getTMOperateRecordList',
          method:'POST',
          isArray: false
        },
        // ????????????????????????
        'getTMRemarkList': {
          url:options.api.base_url + '/trademark/getTMRemarkList',
          method:'POST',
          isArray: false
        },
        // ??????????????????
        'addTMRemark': {
          url:options.api.base_url + '/trademark/addTMRemark',
          method:'POST',
          isArray: false
        },
        // ??????????????????????????????
        'findGroup': {
          url:options.api.base_url + '/trademark/findGroup',
          method:'GET',
          isArray: true
        },
        // ??????????????????
        'editSaleStatus': {
          url:options.api.base_url + '/trademark/editSaleStatus',
          method:'POST',
          isArray: false
        },
        // ??????????????????
        'editVerifyStatus': {
          url:options.api.base_url + '/trademark/editVerifyStatus',
          method:'POST',
          isArray: false
        }
    });
});


