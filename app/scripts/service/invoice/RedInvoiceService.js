angular.module("iprpAdminApp").factory("RedInvoiceService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/red/invoices/:invoice_id',{invoice_id:'@invoice_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'red_check_list':{
            url:options.api.base_url + '/red/check/invoices',
            method:'GET',
            isArray: false
        },
        'red_unOpen_list':{
            url:options.api.base_url + '/red/unOpen/invoices',
            method:'GET',
            isArray: false
        },
        'red_open_list':{
            url:options.api.base_url + '/red/open/invoices',
            method:'GET',
            isArray: false
        },
        'invoiceDetail':{
            method:'GET',
            isArray: false,
            params:{
                invoice_id : $stateParams.invoice_id
            }
        },
        'update':{
            method:'PUT',
            isArray: false,
            params:{
                invoice_id : $stateParams.invoice_id
            }
        },
        "red_invoice_check":{
            url:options.api.base_url + '/red/invoices/check/:invoice_id',
            method:'PUT',
            isArray: false,
            params:{
                invoice_id : $stateParams.invoice_id
            }
        },
        'open_electron_invoice':{
            url:options.api.base_url + '/red/turn_on/invoices',
            method:'PUT',
            isArray: false,
            params:{
                invoice_id : $stateParams.invoice_id
            }
        },
        'red_back_fill_invoice':{
            url:options.api.base_url + '/red/back/fill/invoices/:invoice_id',
            method:'PUT',
            isArray: false,
            params:{
                invoice_id : $stateParams.invoice_id
            }
        }
    })
});
