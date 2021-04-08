angular.module("iprpAdminApp").factory("PartnerService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/refunds/:refund_id',{refund_id:'@refund_id',access_token:function(){return session.accessToken}},{
        'list':{
          url: options.api.base_url + '/partnerRefunds',
          method:'GET',
          isArray: false
        },
        'refundDetail':{
            method:'GET',
            isArray: false,
            params:{
                refund_id : $stateParams.refund_id
            }
        },
        'productType':{
            url:options.api.base_url + '/product',
            method:'GET',
            isArray: true
        },  
        // 查询合伙人列表
        'parnterList':{
            url:options.api.base_url + '/findPartnerList',
            method:'GET'
        }, 
        // 查询合伙人详情
        'findPartnerDetail':{
            url:options.api.base_url + '/findPartnerDetail/:memberSn',
            params:{
                memberSn : $stateParams.memberSn
            },
            method:'GET'
        },
        // 合伙人邀约达人
        'countPartnerIncome':{
            url:options.api.base_url + '/countPartnerIncome',
            method:'GET'
        },

        // 查询下级合伙人列表
        'findSubPartnerList':{
            url:options.api.base_url + '/findSubPartnerList',
            method:'GET'
        },
        // 查询提现审核列表
        'findWithdrawAuditList':{
            url:options.api.base_url + '/findWithdrawAuditList',
            method:'GET'
        },
        // 查询提现详情
        'findWithdrawAuditDetail':{
            url:options.api.base_url + '/findWithdrawAuditDetail/:id',
            params:{
                id : $stateParams.id
            },
            method:'GET'
        },
        // 提现审核
        'auditWithdrawDetail':{
            url:options.api.base_url + '/auditWithdrawDetail',
            method:'PUT'
        },
        // 查询提现详情提现记录列表
        'findWithdrawAuditDetailRecordList':{
            url:options.api.base_url + '/findWithdrawAuditDetailRecordList',
            method:'GET'
        },

        
        // 删除合伙人材料，类目文件
        'deleteMaterial':{
            url:options.api.base_url + '/deleteMaterial/:id',
            method:'DELETE'
        },
        // 合伙人商品
        'findPartnerGoods':{
            url:options.api.base_url + '/findPartnerGoods',
            method:'GET'
        },
        // 合伙人商品信息
        'findPartnerGoodsDetail':{
            url:options.api.base_url + '/findPartnerGoodsDetail/:id',
            method:'GET'
        },
        // 合伙人上下架
        'partnerGoodsUpperDown':{
            url:options.api.base_url + '/partnerGoodsUpperDown',
            method:'PUT'
        },
        // 合伙人商品编辑
        'editPartnerGoods':{
            url:options.api.base_url + '/editPartnerGoods',
            method:'PUT'
        },
        // 添加合伙人商品
        'addPartnerGoods':{
            url:options.api.base_url + '/addPartnerGoods',
            method:'PUT'
        },
        // 合伙人材料类目
        'materialCenter':{
            url:rootConfig.indexUrl + '/partner/b/materialCenter.htm',
            method:'GET',
            isArray: true
        },
        // 添加合伙人材料类目
        'addMaterialCategory':{
            url:options.api.base_url + '/addMaterialCategory',
            method:'POST',
            isArray: true
        },
        // 添加合伙人材料
        'addMaterial':{
            url:options.api.base_url + '/addMaterial',
            method:'POST',
            isArray: true
        },
        // 创建合伙人
        'addPartner':{
            url:options.api.base_url + '/addPartner',
            method:'POST',
            isArray: true
        },
        // 查看邀请码
        'showQrCode':{
            url:options.api.base_url + '/showQrCode',
            method:'GET',
            isArray: false
        }
    });
});
