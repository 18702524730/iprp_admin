angular.module("iprpAdminApp").factory("InvoiceService", function($resource,$stateParams,session) {

    return {
        invoice : $resource(options.api.base_url + '/invoices/:invoice_id', {invoice_id:'@invoice_id',access_token:function(){return session.accessToken}}, {
            "unOpen_list": {
                url:options.api.base_url + '/unOpen/invoices',
                method: 'GET',
                isArray: false
            },
            "open_list": {
                url:options.api.base_url + '/open/invoices',
                method: 'GET',
                isArray: false
            },
            "detail":{
                method:'GET',
                isArray: false,
                params:{
                    invoice_id : $stateParams.invoice_id
                }
            },
            "turn_on_invoices":{
                url:options.api.base_url + '/turn_on/invoices',
                method:'PUT',
                isArray: false,
                params:{
                    invoice_id : $stateParams.invoice_id
                }
            },
            'back_fill_invoice':{
                url:options.api.base_url + '/back/fill/invoices/:invoice_id',
                method:'PUT',
                isArray: false,
                params:{
                    invoice_id : $stateParams.invoice_id
                }
            },
            //国内商标线上
            "findOnlineInvoiceList": {
                url:options.api.base_url + '/findOnlineInvoiceList',
                method: 'GET',
                isArray: false
            },
            "editOnlineOrderInvoice": {
                url:options.api.base_url + '/editOnlineOrderInvoice',
                method: 'PUT',
                isArray: false
            },
            //国内商标云表
            "selectTradeMark": {
                url:options.api.base_url + '/selectTradeMark',
                method: 'GET',
                isArray: false
            },
            "createTradeMark": {
                url:options.api.base_url + '/createTradeMark',
                method: 'POST',
                isArray: false
            },
            //国际商标云表
            "selectTrademarkInternational": {
                url:options.api.base_url + '/selectTrademarkInternational',
                method: 'GET',
                isArray: false
            },
            "createTrademarkInternational": {
                url:options.api.base_url + '/createTrademarkInternational',
                method: 'POST',
                isArray: false
            },
            //商标其他业务云表
            "selectTradeMarkOther": {
                url:options.api.base_url + '/selectTradeMarkOther',
                method: 'GET',
                isArray: false
            },
            "createTradeMarkOther": {
                url:options.api.base_url + '/createTradeMarkOther',
                method: 'POST',
                isArray: false
            },
            //著作权云表
            "selectSoftWare": {
                url:options.api.base_url + '/selectSoftWare',
                method: 'GET',
                isArray: false
            },
            "createSoftWare": {
                url:options.api.base_url + '/createSoftWare',
                method: 'POST',
                isArray: false
            },
            //科技项目
            "selectTech": {
                url:options.api.base_url + '/selectTech',
                method: 'GET',
                isArray: false
            },
            "createTech": {
                url:options.api.base_url + '/createTech',
                method: 'POST',
                isArray: false
            },
            //专利许可
            "selectPatentBook": {
                url:options.api.base_url + '/selectPatentBook',
                method: 'GET',
                isArray: false
            },
            "createPatentBook": {
                url:options.api.base_url + '/createPatentBook',
                method: 'POST',
                isArray: false
            },
            //遗留案件
            "selectRemainCase": {
                url:options.api.base_url + '/findRemainCaseInvoiceList',
                method: 'GET',
                isArray: false
            },
            "editRemainCaseInvoice": {
                url:options.api.base_url + '/editRemainCaseInvoice',
                method: 'PUT',
                isArray: false
            }
        }),
        backfill_express : $resource(options.api.base_url + '/invoices/express/:invoice_id', {invoice_id:'@invoice_id',access_token:function(){return session.accessToken}}, {
            "update":{
                method:'PUT',
                isArray: false,
                params:{
                    invoice_id : $stateParams.invoice_id
                }
            }
        }),
        export : $resource(options.api.base_url + '/invoices/export/:invoice_id',{invoice_id:'@invoice_id',access_token:function(){return session.accessToken}},{
            "update":{
                method:'GET',
                isArray: false
            }
        }),
        zs_ai:$resource(options.api.base_url + '/statisticsReconciliation/:invoice_id',{invoice_id:'@invoice_id',access_token:function(){return session.accessToken}},{
            "update":{
                method:'GET',
                isArray: false
            },
            "reconci": {
                url:options.api.base_url + '/reconciliation',
                method: 'GET',
                isArray: false
            },
            "liation":{
                url:options.api.base_url + '/ZSReconciliation',
                method: 'GET',
                isArray: false  
            }
        })
    }
});
