angular.module("iprpAdminApp").factory("BillTemplateFeedService", function ($resource,session,$stateParams) {

    return {
        bill_tpl_feed: $resource(options.api.base_url + '/bill_templates_feed_backs/:bill_template_feedback_id',
            {bill_template_feedback_id: '@bill_template_feedback_id',access_token:function(){return session.accessToken}}, {
                "get": {
                    method: 'GET',
                    isArray: true,
                    params:{
                        bill_template_id:$stateParams.bill_template_id
                    }
                },
                "detail_feed_template":{
                    method: 'GET',
                    isArray: false,
                    param:{
                        bill_template_feedback_id:$stateParams.bill_template_feedback_id
                    }
                },
                'feed_back':{
                    url:options.api.base_url + '/templates_feed_backs',
                    method: 'GET',
                    isArray: true
                },
                'update_feed_back':{
                    method: 'PUT',
                    isArray: false,
                    param:{
                        bill_template_feedback_id:$stateParams.bill_template_feedback_id
                    }
                },
                'add_feed_back':{
                    method: 'POST',
                    isArray: false,
                    param:{
                        bill_template_feedback_id:$stateParams.bill_template_feedback_id
                    }
                }
            })
    }
});