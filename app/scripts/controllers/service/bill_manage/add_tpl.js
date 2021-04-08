angular.module('iprpAdminApp').controller('AddTplCtrl', function ($scope,BillTemplateService,$location) {

    //创建空对象
    $scope.add_bill_template_obj = { };

    //添加模板
    $scope.addBillTpl = function(){
        if(!$scope.add_bill_template_obj.template_name || !$scope.add_bill_template_obj.template_description){
            $scope.add_bill_template_tpl_Form.submitted = true;
        }else{
            BillTemplateService.bill_tpl.add_template({},$scope.add_bill_template_obj,function(data){
                $scope.bill_template = data;
                if($scope.bill_template != undefined){
                    $location.path('/main/merchant_home/add_bill_tpl_deploy/' + $scope.bill_template.bill_template_id);
                }
            },function(error){
                alert(error.data.msg);
            })
        }
    }
});