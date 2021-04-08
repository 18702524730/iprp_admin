angular.module("iprpAdminApp").factory("LabelServicerService", function($resource,$stateParams,session) {
  return $resource(options.api.base_url + '/findMerchantLabelList',{label_id:'@label_id',access_token:function(){return session.accessToken}},{
      'label_list':{
          method:'GET',
          isArray: false
      },

      'label_detail':{
      		url : options.api.base_url + '/findMerchantLabelDetail/:label_id',
          method:'GET',
          isArray: false,
          params:{
              label_id : $stateParams.label_id
          }
      },
      'label_add':{
      		url : options.api.base_url + '/addMerchantLabel',
          method:'POST',
          isArray: false,
      },
      'label_edit':{
          url : options.api.base_url + '/editMerchantLabel',
          method:'PUT',
          isArray: false,
      },
      'switchMerchantLabel':{
          url : options.api.base_url + '/switchMerchantLabel',
          method:'PUT',
          isArray: false
      },
      'shop_label_list':{
      		url : options.api.base_url + '/findEnableMerchantLabel',
          method:'GET',
          isArray: false,
      },
  })
});
