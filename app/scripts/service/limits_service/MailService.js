angular.module('iprpAdminApp').factory('MailTemplateService',function(session,$stateParams,$resource) {

    return $resource(options.api.base_url + '/mailTemplates/:code',{code:'@code',access_token:function(){return session.accessToken}},{
        'mailTpl_list': {
            method: 'GET',
            isArray: false
        },
        'mailTpl_detail':{
            method: 'GET',
            isArray: false,
            params:{
                code:$stateParams.code
            }
        },
        'edit_mailTpl':{
            method: 'PUT',
            isArray: false,
            params:{
                code:$stateParams.code
            }
        },
        'add_mailTpl':{
            url:options.api.base_url + '/mailTemplates',
            method: 'POST',
            isArray: false
        },
        'deleteBatch':{
            method: 'DELETE',
            isArray: false
        }
    });
});