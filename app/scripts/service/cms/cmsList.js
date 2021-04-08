angular.module("iprpAdminApp").factory("CmsUrl", function($resource,$httpParamSerializer,$stateParams,session) {
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
        // 查询我要砍价列表
        'bargainTrademarkList':{
            url:options.api.base_url + '/bargainTrademarkList',
            method:'POST',
            isArray: false
        },
        // 查询商品评价列表
        'findEvaluateGoodsList':{
            url:options.api.base_url + '/evaluate/findEvaluateGoodsList',
            method:'GET',
            isArray: false
        },
        // 查询商品评价详情
        'findEvaluateGoodsDetail':{
            url:options.api.base_url + '/evaluate/findEvaluateGoodsDetail/:id',
            params:{
                id : $stateParams.id
            },
            method:'GET',
            isArray: false
        },
        // 商品评价状态显示/隐藏
        'updateEvaluateGoodsState':{
            url:options.api.base_url + '/evaluate/updateEvaluateGoodsState',
            method:'PUT',
            isArray: false
        },
        // 查询店铺评价列表
        'findEvaluateShopList':{
            url:options.api.base_url + '/evaluate/findEvaluateShopList',
            method:'GET',
            isArray: false
        },
        // 查询店铺评价详情
        'findEvaluateShopDetail':{
            url:options.api.base_url + '/evaluate/findEvaluateShopDetail/:id',
            params:{
                id : $stateParams.id
            },
            method:'GET',
            isArray: false
        },
        // 店铺评价状态显示/隐藏
        'updateEvaluateShopState':{
            url:options.api.base_url + '/evaluate/updateEvaluateShopState',
            method:'PUT',
            isArray: false
        },
        // 查询店铺评价列表
        'findEvaluateShopList':{
            url:options.api.base_url + '/evaluate/findEvaluateShopList',
            method:'GET',
            isArray: false
        },
        // 查询评价标签列表
        'findLabel':{
            url:options.api.base_url + '/evaluate/findLabel',
            method:'GET',
            isArray: false
        },
        // 新增评价标签
        'addLabel':{
            url:options.api.base_url + '/evaluate/addLabel',
            method:'POST',
            isArray: false
        },
        // 修改评价标签
        'updateLabel':{
            url:options.api.base_url + '/evaluate/updateLabel',
            method:'PUT',
            isArray: false
        },
        // 删除评价标签
        'deleteLabel':{
            url:options.api.base_url + '/evaluate/deleteLabel/:id',
            params:{
                id : $stateParams.id
            },
            method:'DELETE',
            isArray: false
        }
    });
});
