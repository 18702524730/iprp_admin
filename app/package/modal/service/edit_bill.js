angular.module('iprpAdminApp').controller('EditTplCtrl', function ($scope,BillTemplateService,$location) {

    $scope.temp_template_id = localStorage.getItem('bill_template_id');
    $scope.template_id = $scope.temp_template_id;

    BillTemplateService.bill_tpl.detail_template(
        {bill_template_id:$scope.template_id},function(data){
            $scope.bill_detail_template = data;
        },function(error){
            alert(error.data.msg);
        });

    //编辑模板
    $scope.editBillTpl = function(){
        if(!$scope.bill_detail_template.template_name || !$scope.bill_detail_template.template_description){
            $scope.edit_bill_template_tpl_Form.submitted = true;
        }else{
            BillTemplateService.bill_tpl.edit_template({bill_template_id:$scope.template_id},$scope.bill_detail_template,function(data){
                localStorage.removeItem('bill_template_id');
                $scope.$close({bill_template_id:$scope.template_id});
            },function(error){
                alert(error.data.msg)
            })
        }
    }
    //关闭
    $scope.cancel = function () {
        $scope.$dismiss("cancel");
    };
});