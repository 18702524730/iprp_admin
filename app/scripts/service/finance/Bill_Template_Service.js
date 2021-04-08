angular.module("iprpAdminApp").factory("BillTemplateService", function ($resource,session,$stateParams) {

    return {
        bill_tpl: $resource(options.api.base_url + '/bill_templates/:bill_template_id',
            {bill_template_id: '@bill_template_id',access_token:function(){return session.accessToken}}, {
                "get": {
                    method: 'GET',
                    isArray: false
                },
                "no_privilege_get":{
                    url:options.api.base_url + '/no_privilege/bill_templates',
                    isArray: false
                },
                "detail_template":{
                    method: 'GET',
                    isArray: false,
                    param:{
                        bill_template_id:$stateParams.bill_template_id
                    }
                },
                "add_template":{
                    method: 'POST',
                    isArray: false
                },
                "edit_template":{
                    method: 'PUT',
                    isArray: false,
                    param:{
                        bill_template_id:$stateParams.bill_template_id
                    }
                },
                "delete_template":{
                    method: 'DELETE',
                    isArray: false,
                    param:{
                        bill_template_id:$stateParams.bill_template_id
                    }
                }
        })
    }
});