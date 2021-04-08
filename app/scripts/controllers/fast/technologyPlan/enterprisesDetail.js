angular.module('iprpAdminApp').controller('FastEnterprisesDetailCtrl', function ($scope,$modal,Enterprises,PaginationService,$location, $stateParams) {
  $('#enterprisesList').siblings().removeClass("selected");
  $('#enterprisesList').addClass("selected");
  init_data();
  
  //上传图片

$scope.sellerApplicationDetail = {}
$scope.dataList = []
$scope.id = $stateParams.id
// 初始化数据
function init_data () {
  Enterprises.demand_detail({id: $stateParams.id}, function(data){

		data.saleResult == 0 ? $scope.dataList[0] = 70 : $scope.dataList[0] = 90;
		$scope.dataList[1] = data.researchCostResult == 0 ? 70 : 90;
    $scope.dataList[2] = data.intellectualPropertyResult == 1 ? 90 : 70;
    
    drawLine($scope.dataList)
      if (data.apply2019Status == 1) {
        data.apply2019StatusText = "新认定"
      } else if (data.apply2019Status == 2) {
        data.apply2019StatusText = "复评"
      } else {
        data.applyTypeText = "--"
      }
      switch (data.companySize) {
        case 1:
          data.companyText = "50人以下"
          break
        case 2:
          data.companyText = "50～100人"
          break
        case 3:
          data.companyText = "100人以上"
          break
        default:
          data.companyText = "--"
      }
      if (data.intellectualPropertyIso==1){
        data.intellectualPropertyIsoText = '未实施'
      } else if (data.intellectualPropertyIso==2){
        data.intellectualPropertyIsoText = '实施中'
      } else if(data.intellectualPropertyIso == 3){
        data.intellectualPropertyIsoText = '取得证书'
      } else {
        data.intellectualPropertyIsoText = '--'
      }
      if (data.wantPledge==1){
        data.wantPledgeText = '有'
      } else if (data.wantPledge==2){
        data.wantPledgeText = '没有'
      } else {
        data.wantPledgeText = '--'
      }
      if (data.wantTechButt==1){
        data.wantTechButtText = '有'
      } else if (data.wantTechButt==2){
        data.wantTechButtText = '没有'
      } else {
        data.wantTechButtText = '--'
      }
      if (data.result==1){
        data.resultText = '重点培育'
      } else if (data.result==2){
        data.resultText = '培育'
      } else {
        data.resultText = '--'
      }
      switch (data.researchOrgLevel) {
        case 1:
          data.researchOrgLevelText = "区级"
          break
        case 2:
          data.researchOrgLevelText = "市级"
          break
          case 3:
          data.researchOrgLevelText = "省级"
          break
          case 4:
          data.researchOrgLevelText = "国家级"
          break
          case 5:
          data.researchOrgLevelText = "未设有"
          break
        default:
          data.researchOrgLevelText = "--"
      }

      switch (data.street) {
        case 1:
          data.streetText = "闸弄口街道"
          break
        case 2:
          data.streetText = "凯旋街道"
          break
        case 3:
          data.streetText = "采荷街道"
          break
          case 4:
          data.streetText = "四季青街道"
          break
          case 5:
          data.streetText = "笕桥街道"
          break
          case 6:
          data.streetText = "彭埠街道"
          break
          case 7:
          data.streetText = "钱塘智慧城"
          break
          case 8:
          data.streetText = "丁兰街道"
          break
        default:
          data.streetText = "--"
      }
    
    $scope.demandDetail = data;
    if (!$scope.demandDetail.memberDemandRemarksList || $scope.demandDetail.memberDemandRemarksList.length === 0){
      $scope.loading_text = "没有符合条件的记录";//加载页面内容
      return;
    }
  }, function(error){
    alert(error.data.msg);
  })
}
$scope.addRemarks = function () {
  layer.open({
    type: 1,
    content: $('#Dialog'),
    title: '能力图',
    // btn: ['确定', '取消'],
    btnAlign: 'c',
    anim: 2,
    cancel: function (index, layero) {
      layer.close(index)
      return false;
    },
    success: function () {
      $scope.remarks = ''
    }
  })
}

// init_label_data();
$scope.type = $stateParams.type
$scope.auditFormData = {}
$scope.id=$stateParams.seller_id
// 初始化数据
function init_label_data(){
  ChannelApplicationService.seller_detail({id: $stateParams.seller_id}, function(data){
    $scope.to_loading = true;//默认 开始 加载
    $scope.loading_text = "加载中...";//加载页面内容
    if (data.applyType == 0) {
      data.applyTypeText = "个人商家"
    } else if (data.applyType == 1) {
      data.applyTypeText = "机构商家"
    } else if (data.applyType == 2) {
      data.applyTypeText = "个人合伙人"
    } else if (data.applyType == 3) {
      data.applyTypeText = "机构合伙人"
    } else {
      data.applyTypeText = "--"
    }
    if (data.adminRemark) {
      if (data.adminRemark.indexOf('[') == 0) {
        data.adminRemark = JSON.parse(data.adminRemark)
      } else {
        data.adminRemark = []
      }
    }
    $scope.audit_data = data;
    console.log('addaa', $scope.audit_data)
    if ($scope.type == 'det') {
      $scope.auditFormData.auditStatus = data.confirm
      $scope.auditFormData.reason = data.confirmDesc
    }

    if (!$scope.audit_data.adminRemark || $scope.audit_data.adminRemark.length === 0){
      $scope.loading_text = "没有符合条件的记录";//加载页面内容
      return;
    }
    $scope.to_loading = false;//如果不为空 结束加载页面
    console.log($scope.audit_data)
  }, function(error){
    alert(error.data.msg);
  })
}
function drawLine(data){
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById('myChart'))
  // 绘制图表
  myChart.setOption({
    title: {
        text: ''
    },
    radar: [
        {
            indicator: [
                { text: '销售收入增长率', max: 100 },
                { text: '研发费\n用比例', max: 100 },
                { text: '知识产权', max: 100 }
            ],
            center: ['50%', '55%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
                fontSize: '13px',
                width: '40px',
                formatter:'{value}',
                textStyle: {
                    color:'#00D2FF'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(0, 210, 255, .35)',
                    'rgba(0, 210, 255, .25)', 'rgba(0,210,255,0.15)',
                    'rgba(0,210,255,0.05)'],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 1
                }
            },
            axisLine: {
                lineStyle: {
                  color: 'rgba(0,210,255,0.5)',
                  type: 'dashed'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0,210,255,0.5)',
                    type: 'dashed'
                }
            }
        }
    ],
    series: [
        {
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    // color: 各异,
                    width: 1,
                    lineStyle: {
                        width:1,
                        color: '#00D2FF'
                    }
                }
            },
            data: [

                {
                    value: data,
                    symbol: 'circle',
                    symbolSize: 5,
                    symbolColor: '#00D2FF',
                    color: "#00D2FF",
                    lineStyle: {
                      normal: {
                        type: 'solid',
                        width: 1,
                        color: '#00D2FF'
                      }
                    },
                    itemStyle: {  
                      normal: {
                        color: "#00D2FF"      
                      }     
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(0,210,255,0.4)'
                        }
                    }
                }
            ]
        }
    ]
  });
}
});
