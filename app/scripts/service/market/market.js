angular.module("iprpAdminApp").factory("marKetList", function($resource, $httpParamSerializer, $stateParams,session) {
    return $resource(options.api.base_url + '/deleteOperatePosition/:id',{id:'@id',access_token:function(){return session.accessToken}},{

        // 删除平台运营位
        'deleteOperatePosition':{
            method:'DELETE',
            isArray: false
        },
        // 平台运营位详情
        'findOperatePositionDetail':{
            url:options.api.base_url + '/findOperatePositionDetail/:id',
            method:'GET',
            isArray: false,
            params: {
                id: $stateParams.id
            }
        },
        'recharge':{
            url:options.api.base_url + '/phonebill',
            method:'GET',
            isArray: false
        },
        'prize':{
            url:options.api.base_url + '/prizerecord',
            method:'GET',
            isArray: false
        },
        'winnum':{
            url:options.api.base_url + '/PrizeNum',
            method:'GET',
            isArray: false
        },
        'activeList':{
            url:options.api.base_url + '/billloss',
            method:'GET',
            isArray: true
        },
        'activeChange':{
            url:options.api.base_url + '/setbillloss',
            method:'PUT',
            isArray: false
         },
        'reset':{
            url:options.api.base_url + '/getIssueDetail',
            method:'GET',
            isArray: false
        },
        'phoneexcel':{
            url:options.api.base_url + '/billexcel',
            method:'GET',
            isArray: false
        },
        'exportwin':{
            url:options.api.base_url + '/turnTableExcel',
            method:'GET',
            isArray: false
        },
        //幸运列表
        'luckyList':{
            url:options.api.win_url + '/luckyList.htm',
            method:'GET',
            isArray: false
        },
        // 实时列表
        'realTime':{
            url:options.api.win_url + '/realTime.htm',
            method:'GET',
            isArray: false
        },
        // 实时榜单
        'setReal':{
            url:options.api.base_url + '/setRealTime',
            method:'PUT',
            isArray: false
        },
        // 幸运榜单
        'setLucky':{
            url:options.api.base_url + '/setLuckyList',
            method:'PUT',
            isArray: false
        },
        // 查询运营位列表
        'findAllPosition':{
            url:options.api.base_url + '/findAllPosition',
            method:'POST',
            isArray: false
        },
        // 删除运营位列表
        'delAllPosition':{
            url:options.api.base_url + '/delAllPosition',
            method:'GET',
            isArray: false
        },
        // 查询运营位商标
        'findPositionTrademark':{
            url:options.api.base_url + '/findPositionTrademark',
            method:'POST',
            isArray: false
        },
        // 新增运营位
        'addAllPosition':{
            url:options.api.base_url + '/addAllPosition',
            method:'POST',
            isArray: false
        },
        // 查询运营位详情
        'findPositionById':{
            url:options.api.base_url + '/findPositionById',
            method:'GET',
            isArray: false
        },
        // 修改运营位
        'updateAllPosition':{
            url:options.api.base_url + '/updateAllPosition',
            method:'POST',
            isArray: false
        },
        // 删除运营位商标
        'delPositionTrademark':{
            url:options.api.base_url + '/delPositionTrademark',
            method:'GET',
            isArray: false
        },
        // 上移下移商标运营位接口
        'movePositionTrademark':{
            url:options.api.base_url + '/movePositionTrademark',
            method:'GET',
            isArray: false
        },
        // 新增运营位商标
        'addPositionTrademark':{
            url:options.api.base_url + '/addPositionTrademark',
            method:'GET',
            isArray: false
        },
        // 更换运营位商标
        'updatePositionTrademark':{
            url:options.api.base_url + '/updatePositionTrademark',
            method:'GET',
            isArray: false
        },
        // 查询平台运营位列表
        'findOperatePositionList':{
            url:options.api.base_url + '/findOperatePositionList',
            method:'GET',
            isArray: false
        },
        // 编辑平台运营位
        'editOperatePosition':{
            url:options.api.base_url + '/editOperatePosition',
            method:'PUT',
            isArray: false
        },
        // 添加平台运营位
        'addOperatePosition':{
            url:options.api.base_url + '/addOperatePosition',
            method:'POST',
            isArray: false
        },
        // 查询运营位列表
        'findAllPosition':{
            url:options.api.base_url + '/findAllPosition',
            method:'POST',
            isArray: false
        },
        // 删除运营位列表
        'delAllPosition':{
            url:options.api.base_url + '/delAllPosition',
            method:'GET',
            isArray: false
        },
        // 查询运营位商标
        'findPositionTrademark':{
            url:options.api.base_url + '/findPositionTrademark',
            method:'POST',
            isArray: false
        },
        // 新增运营位
        'addAllPosition':{
            url:options.api.base_url + '/addAllPosition',
            method:'POST',
            isArray: false
        },
        // 查询运营位详情
        'findPositionById':{
            url:options.api.base_url + '/findPositionById',
            method:'GET',
            isArray: false
        },
        // 修改运营位
        'updateAllPosition':{
            url:options.api.base_url + '/updateAllPosition',
            method:'POST',
            isArray: false
        },
        // 删除运营位商标
        'delPositionTrademark':{
            url:options.api.base_url + '/delPositionTrademark',
            method:'GET',
            isArray: false
        },
        // 上移下移商标运营位接口
        'movePositionTrademark':{
            url:options.api.base_url + '/movePositionTrademark',
            method:'GET',
            isArray: false
        },
        // 新增运营位商标
        'addPositionTrademark':{
            url:options.api.base_url + '/addPositionTrademark',
            method:'GET',
            isArray: false
        },
        // 更换运营位商标
        'updatePositionTrademark':{
            url:options.api.base_url + '/updatePositionTrademark',
            method:'GET',
            isArray: false
        },
        // 拾贝券列表
        'findSebeCouponList':{
            url:options.api.base_url + '/findSebeCouponList',
            method:'GET',
            isArray: false
        },
        // 发放拾贝券
        'sendSebeCoupon':{
            url:options.api.base_url + '/sendSebeCoupon',
            method:'POST',
            isArray: false
        },
        // 查看拾贝券
        'findSebeCouponDetail':{
            url:options.api.base_url + '/findSebeCouponDetail/:couponId',
            method:'GET',
            isArray: false
        },
        // 更改拾贝券
        'updateSebeCouponSendState':{
            url:options.api.base_url + '/updateSebeCouponSendState',
            method:'PUT',
            isArray: false
        },
        // 拾贝券领取记录列表
        'findSebeCouponObtainRecordList':{
            url:options.api.base_url + '/findSebeCouponObtainRecordList',
            method:'GET',
            isArray: false
        },
        // 添加拾贝券
        'addSebeCoupon':{
            url:options.api.base_url + '/addSebeCoupon',
            method:'POST',
            isArray: false
        },
        // 查询所有服务类目
        'findAllCategory':{
            url:rootConfig.indexUrl + '/partner/findAllCategory.htm',
            method:'GET',
            isArray: true
        },
        // 查询所有服务类目
        'exportExcelMemberPhone':{
            url:options.api.base_url + '/exportExcelMemberPhone/:couponId',
            method:'GET',
            isArray: true
        }
        
    }); 
});
