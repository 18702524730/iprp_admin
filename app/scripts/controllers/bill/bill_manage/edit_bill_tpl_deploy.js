angular.module('iprpAdminApp').controller('EditBillTplDeployCtrl', function ($scope,$modal,$stateParams,BusinessClassService,BillTemplateService,BillTemplateFeedService,BusinessService,$location) {
    $('#bill_manage').siblings().removeClass("selected");
    $('#bill_manage').addClass("selected");

    init_bill_template_detail();
    function init_bill_template_detail(){
        BillTemplateService.bill_tpl.detail_template(
            {bill_template_id:$stateParams.bill_template_id},function(data){
                $scope.bill_detail_template = data;
            },function(error){
                alert(error.data.msg);
            })
    }

    /**
     * 服务分类
     */
    $scope.obj = { };
    BusinessClassService.business_class_tree(function(data){
        $scope.business_class_tree_list = data;
    });

    /**
     * 根据服务分类查看服务
     * @param id
     */
    $scope.get_business = function(id){
        BusinessService.list({
            "pg_index" : 0,
            "pg_count": 999,
            bs_class_id : id
        },function(data){
            $scope.business = data;
        },function(error){
            alert(error.data.msg)
        })
    };

    /**
     * 模板配置阶段列表
     */
    init_template_feed();
    function init_template_feed(){
        BillTemplateFeedService.bill_tpl_feed.feed_back({
            bill_template_id:$stateParams.bill_template_id,
            bs_id:$scope.bs_id === null || $scope.bs_id === undefined ? null : $scope.bs_id
        },function(data){
            $scope.bill_template_feed_backs_list = data;
        },function(error){
            alert(error.data.msg);
        });
    }
    //按服务查询
    $scope.search = function(){
        init_template_feed();
    };

    //编辑
    $scope.edit_tpl = function(index){
        localStorage.setItem("bill_template_id", index);
        $modal.open({
            resolve:{

            },
            backdrop:false,
            keyboard:true,
            templateUrl: 'package\\modal\\service\\edit_bill.html',
            controller: 'EditTplCtrl'
        }).result.then(function (result) {
             init_bill_template_detail();
        });
    };


    //编辑
    $scope.service_charge_allocation_detail = function(sp_commission_rate,bs_id,name,bill_feed_back_id){
        if(sp_commission_rate === null && sp_commission_rate != 0){
            $modal.open({
                resolve:{
                    bill_template_id:function(){
                        return $stateParams.bill_template_id;
                    },
                    feed_back_name:function(){
                        return name;
                    },
                    bs_id : function(){
                        return bs_id;
                    },
                    bill_feed_back_id : function(){
                        return bill_feed_back_id;
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\service\\add_service_charge_allocation.html',
                controller: 'AddServiceChargeAllocationCtrl'
            }).result.then(function (result) {
                init_bill_template_detail();
                init_template_feed();
            });
        }else{
            $modal.open({
                resolve:{
                    bill_template_id:function(){
                        return $stateParams.bill_template_id;
                    },
                    bs_id : function(){
                        return bs_id;
                    },
                    bill_feed_back_id:function(){
                        return bill_feed_back_id
                    }
                },
                backdrop:false,
                keyboard:true,
                templateUrl: 'package\\modal\\service\\service_charge_allocation.html',
                controller: 'ServiceChargeAllocationCtrl'
            }).result.then(function (result) {
                 init_bill_template_detail();
                 init_template_feed();
            });
        }
    }
});