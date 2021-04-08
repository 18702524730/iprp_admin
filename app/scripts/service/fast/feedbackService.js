angular.module("iprpAdminApp").factory("FeedbackService", function($resource,$httpParamSerializer,$stateParams,session) {
    return $resource(options.api.base_url + '/spAdvise/:spAdviseId',{spAdviseId:'@spAdviseId',access_token:function(){return session.accessToken}},{
        'detail':{
            method:'GET',
            params:{
                spAdviseId : $stateParams.spAdviseId
            },
            isArray: false
        },
        'list':{
            url:options.api.base_url + '/spAdvise/list',
            method:'GET',
            isArray: false
        },
        'setFeedbackType':{
            url:options.api.base_url + '/setAdviseType',
            method:'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            isArray: false,
            transformRequest: function(data) {
                return $httpParamSerializer(data);
            }
        },
        'feedBackApply':{
            url:options.api.base_url + '/spApply/list',
            method:'GET',
            isArray: false
        },
        'confirmLink':{
            url:options.api.base_url + '/contact',
            method:'GET',
            isArray: false
        },
        // 查询求购好标列表
        'buyGoodsTrademarkList':{
            url:options.api.base_url + '/buyGoodsTrademarkList',
            method:'POST',
            isArray: false
        },
        // 查询求购好标详情
        'buyGoodsTrademarkDetail':{
            url:options.api.base_url + '/buyGoodsTrademarkDetail',
            method:'GET',
            isArray: false
        },
        // 查询求购好标备注
        'buyGoodsTrademarkRemarkList':{
            url:options.api.base_url + '/buyGoodsTrademarkRemarkList',
            method:'GET',
            isArray: true
        },
        // 添加求购好标备注
        'remarkBuyGoodsTrademark':{
            url:options.api.base_url + '/remarkBuyGoodsTrademark',
            method:'GET',
            isArray: false
        },
        // 设置求购好标状态
        'updateBuyGoodsTrademark':{
            url:options.api.base_url + '/updateBuyGoodsTrademark',
            method:'GET',
            isArray: false
        },
        // 查询商标速卖列表
        'fastSaleTrademarkList':{
            url:options.api.base_url + '/fastSaleTrademarkList',
            method:'POST',
            isArray: false
        },
        // 查询商标速卖加备注
        'fastSaleTrademarkRemarkList':{
            url:options.api.base_url + '/fastSaleTrademarkRemarkList',
            method:'GET',
            isArray: true
        },
        // 添加商标速卖加备注
        'remarkFastSaleTrademark':{
            url:options.api.base_url + '/remarkFastSaleTrademark',
            method:'GET',
            isArray: false
        },
        // 设置商标速卖状态
        'updateFastSaleTrademark':{
            url:options.api.base_url + '/updateFastSaleTrademark',
            method:'GET',
            isArray: false
        },
        // 查询我要砍价列表
        'bargainTrademarkList':{
            url:options.api.base_url + '/bargainTrademarkList',
            method:'POST',
            isArray: false
        },
        // 设置我要看极爱状态
        'updateBargainTrademark':{
            url:options.api.base_url + '/updateBargainTrademark',
            method:'GET',
            isArray: false
        },
        // 查看我要砍价备注列表
        'bargainTrademarkRemarkList':{
            url:options.api.base_url + '/bargainTrademarkRemarkList',
            method:'GET',
            isArray: true
        },
        // 添加我要砍价备注
        'remarkBargainTrademark':{
            url:options.api.base_url + '/remarkBargainTrademark',
            method:'GET',
            isArray: false
        },
        // 查询外贸服务平台问题列表
        'findZjForeignTradeIPProblemList':{
            url:options.api.base_url + '/findZjForeignTradeIPProblemList',
            method:'GET',
            isArray: false
        },
        // 查询外贸服务平台问题详情
        'findZjForeignTradeIPProblemDetail':{
            url:options.api.base_url + '/findZjForeignTradeIPProblemDetail/:id',
            method:'GET',
            isArray: false,
            params:{
                id : $stateParams.id
            }
        },
        // 处理外贸服务平台问题
        'handleZjForeignTradeIPProblem':{
            url:options.api.base_url + '/handleZjForeignTradeIPProblem',
            method:'PUT',
            isArray: false,
        },
        // 查询oem列表
        'findZjForeignTradeOemIdentifyList':{
            url:options.api.base_url + '/findZjForeignTradeOemIdentifyList',
            method:'GET',
            isArray: false
        },
        // 查询oem详情
        'findZjForeignTradeOemIdentifyDetail':{
            url:options.api.base_url + '/findZjForeignTradeOemIdentifyDetail/:id',
            method:'GET',
            isArray: false,
            params:{
                id : $stateParams.id
            }
        },
        // 处理oem问题
        'handleZjForeignTradeOemIdentify':{
            url:options.api.base_url + '/handleZjForeignTradeOemIdentify',
            method:'PUT',
            isArray: false,
        },
    });
});
