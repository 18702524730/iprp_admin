angular.module("iprpAdminApp").factory("bsOrderService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/findBsOrdersList/:order_id',{order_id:'@order_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'orderDetail':{
            url:options.api.base_url + '/findBsOrderDetailById',
            method:'GET',
            isArray: false,
            params:{
                order_id : $stateParams.order_id
            }
        },
        'setServiceState':{
            url:options.api.base_url + '/setOrderFeedback',
            method:'GET',
            isArray: false
        },
        'productType':{
            url:options.api.base_url + '/product',
            method:'GET',
            isArray: true
        },
        'feedbackList':{
            url:options.api.base_url + '/getOrderFeedbackList',
            method:'GET',
            isArray: false
        },
        'serviceStatus':{
            url:options.api.base_url + '/getBsFeedbackListByBsId',
            method:'GET',
            isArray: false
        },
        'setupList':{
            url:options.api.base_url + '/common/services',
            method:'GET',
            isArray: false
        },
        'setupPartnerList':{
            url:options.api.base_url + '/common/partner',
            method:'GET',
            isArray: false
        },
        'setupOrders':{
            url:options.api.base_url + '/orders/:order_id',
            method:'PUT',
            isArray: false
        },
        'setupPartnerOrders':{
            url:options.api.base_url + '/resetPartner/:order_id',
            method:'PUT',
            isArray: false
        },
        'partnerList':{
        	url:options.api.base_url + '/findPartnerBsOrdersList',
            method:'GET',
            isArray: false
        },
        'findOrderOrigin':{
            url:options.api.base_url + '/findOrderOriginAll',
            method:'GET',
            isArray: true
        },
        'findOrderPlatfom':{
            url:options.api.base_url + '/findCustPlatformAll',
            method:'GET',
            isArray: true
        },
        //渠道工单
        'channelWorkOrderList':{
            url:options.api.base_url + '/findChannelWorkOrderList',
            method:'GET',
            isArray: false
        },
        'channelWorkOrderDetail':{
            url:options.api.base_url + '/findChannelWorkOrderDetail/:workOrderSn',
            method:'GET',
            isArray: false,
            params:{
                workOrderSn : $stateParams.workOrderSn
            }
        },
        'channelWorkOrderAudit':{
            url:options.api.base_url + '/auditChannelWorkOrder',
            method:'PUT',
            isArray: false,
            
        },
        'channelPrevImg':{
            url:options.api.base_url + '/preview',
            method:'GET',
            isArray: false,
        },
        // 渠道服务单
        'channelList':{
            url:options.api.base_url + '/findChannelServiceOrderList',
            method:'GET',
            isArray: false
        },
        'channelOrderDetail':{
            url:options.api.base_url + '/findChannelServiceOrderDetail/:workOrderSn',
            method:'GET',
            isArray: false,
            params:{
                orderSn : $stateParams.workOrderSn
            }
        },
        'getServiceState':{
            url:options.api.base_url + '/getBsFeedbackListByBsId',
            method:'GET',
            isArray: false
        },
        //企业主体审核列表
        "company_audit_list":{
            url:options.api.base_url + '/verifyList',
            method: 'GET',
            isArray: false
        },
        "company_audit_detail":{
            url:options.api.base_url + '/verifyDetail/:applySubjectId',
            method: 'GET',
            isArray: false,
            params:{
                applySubjectId: $stateParams.applySubjectId
            }
        },
        
        'company_audit_verify':{
            url:options.api.base_url + '/verifyApplySubject',
            method:'POST',
            isArray: false
        },
        //天猫尼斯推荐列表
        "tmall_nice_list":{
            url:options.api.base_url + '/findChannelNiceList',
            method: 'GET',
            isArray: false
        },
        //快麦订单信息
        "quick_wheat_list":{
            url:options.api.base_url + '/findKuaiMaiList',
            method: 'GET',
            isArray: false
        },
    })
});

