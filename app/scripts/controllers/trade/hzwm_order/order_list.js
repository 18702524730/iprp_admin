angular.module('iprpAdminApp').controller('HzwmOrderListCtrl',function($scope,cxbOrderService,ntOrderService, PaginationService,$location,$state,session,$stateParams){
    $('#hzwm_order_list').parent().siblings().children('a').removeClass("selected");
    $('#hzwm_order_list').addClass("selected");
    var showTable = localStorage.getItem('showTable')
    $scope.showTable = showTable === 'true' ? 'true' : 'false';
    console.log($scope.showTable)

    var initStatistics = function() {
    	if ($scope.showTable === 'false') {
	    	// 面板统计数据
	    	cxbOrderService.hzwmStatistics({applyArea: ($scope.isAll ? '全国' : '杭州')}, function(data){
	        $scope.statisticData = data;
	        renderCharts(data);
		    },function(error){
		      //alert(error.data.msg);
		    });
	    } else {
	    	$scope.search_order();
	    }
    }

    $scope.obj = {
    	bussinessType: '',
    }

    $scope.goback = function() {
    	$scope.showTable = 'false';
		localStorage.setItem('showTable', 'false');
		$scope.obj.bussinessType = null;
    	console.log($scope.showTable)
    	initStatistics();
    	$location.search({}).replace();
    }

    var renderCharts = function(D) {
	    	/*D = {
				    "gnxs": 1012,//国内线上
				    "gnxs_feiyong": 1,//国内线上_费用
				    "gnxs_yonghu": 1,//国内线上_用户
				    "gjxx": 797,//国际线下
				    "gjxx_feiyong": 2207090,//国际线下_费用
				    "gjxx_yonghu": 177,//国际线下_用户
				    "gnxx": 1720,//国内线下
				    "gnxx_feiyong": 701097,//国内线下_费用
				    "gnxx_yonghu": 112,//国内线下_用户
				    "zlsq": 464,//专利申请
				    "zlsq_feiyong": 3172101,//专利申请_费用
				    "zlsq_yonghu": 159,//专利申请_用户
				    "gjxs": 80,//国际线上
				    "czsl": 1012,//存证数量
				    "fwqy": 797,//服务企业
				    "czsr": 797//存证收入
				}
				$scope.statisticData = D;*/
    		// 百度 echarts
				var orderNumChartOption = {
						title: {
								text: '订单数',
								x:'center',
								textStyle: {
								    align: 'center',
								    fontSize: 14,
								}
						},
						color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['线上国内商标注册', '线下国内商标注册', '国际商标注册'],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'订单数',
				            type:'bar',
				            barWidth: '30%',
				            label: {
				            	show: true,
				            	position: 'top',
				            	formatter: '{@订单数}件',
				            },
				            /*itemStyle: {
			            		color: '#f00'
			            	},*/
				            data:[D.gnxs, D.gnxx, D.gjxx]
				        }
				    ]
				};
				var orderNumChart = echarts.init(document.getElementById('orderNumChart'), 'shine');
				orderNumChart.setOption(orderNumChartOption);
				orderNumChart.on('click', function (params) {
					if (params.dataIndex == 0) {
						$scope.jump1(1)
					} else if (params.dataIndex == 1) {
						$scope.jump1(2)
					} else if (params.dataIndex == 2) {
						$scope.jump1(4)
					}
				});
				var usersChartOption = {
						title: {
								text: '用户数',
								x:'center',
								textStyle: {
								    align: 'center',
								    fontSize: 14,
								}
						},
				    color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['线上国内商标注册', '线下国内商标注册', '国际商标注册'],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'用户数',
				            type:'bar',
				            barWidth: '30%',
				            label: {
				            	show: true,
				            	position: 'top',
				            	formatter: '{@用户数}人'
				            },
				            data:[D.gnxs_yonghu, D.gnxx_yonghu, D.gjxx_yonghu]
				        }
				    ]
				};
				var usersChart = echarts.init(document.getElementById('usersChart'), 'shine');
				usersChart.setOption(usersChartOption);
				usersChart.on('click', function (params) {
					if (params.dataIndex == 0) {
						$scope.jump1(1)
					} else if (params.dataIndex == 1) {
						$scope.jump1(2)
					} else if (params.dataIndex == 2) {
						$scope.jump1(4)
					}
				});
				var feeChartOption = {
						title: {
								text: '费用总计',
								x:'center',
								textStyle: {
								    align: 'center',
								    fontSize: 14,
								}
						},
				    color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['线上国内商标注册', '线下国内商标注册', '国际商标注册'],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'费用总计',
				            type:'bar',
				            barWidth: '30%',
				            label: {
				            	show: true,
				            	position: 'top',
				            	formatter: '{@费用总计}元'
				            },
				            data:[D.gnxs_feiyong, D.gnxx_feiyong, D.gjxx_feiyong]
				        }
				    ]
				};
				var feeChart = echarts.init(document.getElementById('feeChart'), 'shine');
				feeChart.setOption(feeChartOption);
				feeChart.on('click', function (params) {
					if (params.dataIndex == 0) {
						$scope.jump1(1)
					} else if (params.dataIndex == 1) {
						$scope.jump1(2)
					} else if (params.dataIndex == 2) {
						$scope.jump1(4)
					}
				});
				var zlOrderNumChartOption = {
						color: ['#5B95FF', '#7AD6AF', '#FFC86C'],
				    title : {
				        text: '专利订单分布饼状图',
				        x:'center',
								textStyle: {
								    align: 'center',
								    fontSize: 14,
								}
				    },
				    tooltip: {
				        trigger: 'item',
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['发明','实用新型','外观']
				    },
				    series : [
				        {
				            name: '订单数',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            /*label: {
				            		show: true,
				            		position: 'outside',
				            		formatter: '{b}:{c}件'+ '\n(国内:'+D.zlsq_invention+',国外:'+D.zlsq_invention+')',
				            },*/
			             	itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            /*radius: ['40%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },*/
				            data:[
				                {
				                	value:D.zlsq_invention || 0,
				                	name:'发明',
				                	label: {
							            		show: true,
							            		position: 'outside',
							            		formatter: '{b}{a}:{c}件'+ '\n国内:'+D.zlsq_invention_gn+'件，国际:'+D.zlsq_invention_gj + '件',
							            },
							            tooltip: {
											        trigger: 'item',
											        formatter: '{b}{a}:{c}件'+ '<br/>国内:'+D.zlsq_invention_gn+'件，国际:'+D.zlsq_invention_gj + '件',
											    },
				                },
				                {
				                	value:D.zlsq_practical || 0,
				                	name:'实用新型',
				                	label: {
							            		show: true,
							            		position: 'outside',
							            		formatter: '{b}{a}:{c}件'+ '\n国内:'+D.zlsq_practical_gn+'件，国际:'+D.zlsq_practical_gj + '件',
							            },
							            tooltip: {
											        trigger: 'item',
											        formatter: '{b}{a}:{c}件'+ '<br/>国内:'+D.zlsq_practical_gn+'件，国际:'+D.zlsq_practical_gj + '件',
											    },
				                },
				                {
				                	value:D.zlsq_appearance || 0,
				                	name:'外观',
				                	label: {
							            		show: true,
							            		position: 'outside',
							            		formatter: '{b}{a}:{c}件'+ '\n国内:'+D.zlsq_appearance_gn+'件，国际:'+D.zlsq_appearance_gj + '件',
							            },
							            tooltip: {
											        trigger: 'item',
											        formatter: '{b}{a}:{c}件'+ '<br/>国内:'+D.zlsq_appearance_gn+'件，国际:'+D.zlsq_appearance_gj + '件',
											    },
				                },
				            ],
				        }
				    ]
				};
				var zlOrderNumChart = echarts.init(document.getElementById('zlOrderNumChart'), 'shine');
				zlOrderNumChart.setOption(zlOrderNumChartOption);
				var zlUsersChartOption = {
						color: ['#5B95FF', '#7AD6AF', '#FFC86C'],
				    title : {
				        text: '专利用户分布饼状图',
				        x:'center',
								textStyle: {
								    align: 'center',
								    fontSize: 14,
								}
				    },
				     tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['发明','实用新型','外观']
				    },
				    series : [
				        {
				            name: '用户数',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            label: {
				            		show: true,
				            		position: 'outside',
				            		formatter: '{b}{a}:{c}人',
				            },
			             	itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            /*radius: ['40%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				            		show: true,
				            		position: 'inside',
				            		formatter: '{c}人',
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },*/
				            data:[
				                {
				                	value:D.zlsq_yonghu_invention || 0,
				                	name:'发明',
				                },
				                {
				                	value:D.zlsq_yonghu_practical || 0,
				                	name:'实用新型',
				                },
				                {
				                	value:D.zlsq_yonghu_appearance || 0,
				                	name:'外观',
				                },
				            ],
				        }
				    ]
				};
				var zlUsersChart = echarts.init(document.getElementById('zlUsersChart'), 'shine');
				zlUsersChart.setOption(zlUsersChartOption);
				var zlFeeChartOption = {
						color: ['#5B95FF', '#7AD6AF', '#FFC86C'],
				    title : {
				        text: '专利费用分布饼状图',
				        x:'center',
								textStyle: {
								    align: 'center',
								    fontSize: 14,
								}
				    },
				     tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['发明','实用新型','外观']
				    },
				    series : [
				        {
				            name: '费用',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            label: {
				            		show: true,
				            		position: 'outside',
				            		formatter: '{b}{a}:{c}元',
				            },
			             	itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            /*
				            radius: ['40%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            */
				            data:[
				                {
				                	value:D.zlsq_feiyong_invention || 0,
				                	name:'发明',
				                	label: {
							            		show: true,
							            		position: 'outside',
							            		formatter: '{b}{a}:{c}元'+ '\n国内:'+D.zlsq_feiyong_invention_gn+'元，国际:'+D.zlsq_feiyong_invention_gj + '元',
							            },
							            tooltip: {
											        trigger: 'item',
											        formatter: '{b}{a}:{c}元'+ '<br/>国内:'+D.zlsq_feiyong_invention_gn+'元，国际:'+D.zlsq_feiyong_invention_gj + '元',
											    },
				                },
				                {
				                	value:D.zlsq_feiyong_practical || 0,
				                	name:'实用新型',
				                	label: {
							            		show: true,
							            		position: 'outside',
							            		formatter: '{b}{a}:{c}元'+ '\n国内:'+D.zlsq_feiyong_practical_gn+'元，国际:'+D.zlsq_feiyong_practical_gj + '元',
							            },
							            tooltip: {
											        trigger: 'item',
											        formatter: '{b}{a}:{c}元'+ '<br/>国内:'+D.zlsq_feiyong_practical_gn+'元，国际:'+D.zlsq_feiyong_practical_gj + '元',
											    },
				                },
				                {
				                	value:D.zlsq_feiyong_appearance || 0,
				                	name:'外观',
				                	label: {
							            		show: true,
							            		position: 'outside',
							            		formatter: '{b}{a}:{c}元'+ '\n国内:'+D.zlsq_feiyong_appearance_gn+'元，国际:'+D.zlsq_feiyong_appearance_gj + '元',
							            },
							            tooltip: {
											        trigger: 'item',
											        formatter: '{b}{a}:{c}元'+ '<br/>国内:'+D.zlsq_feiyong_appearance_gn+'元，国际:'+D.zlsq_feiyong_appearance_gj + '元',
											    },
				                },
				            ],
				        }
				    ]
				};
				var zlFeeChart = echarts.init(document.getElementById('zlFeeChart'), 'shine');
				zlFeeChart.setOption(zlFeeChartOption);
    }

    // 线下价格统计
    var countAmount = function() {
    	cxbOrderService.countAmount({
    		bussinessType: $scope.obj.bussinessType,
    		applyArea: ($scope.isAll ? '全国' : '杭州')
    	},function(data){
	      $scope.countAmountData = data;
	    },function(error){
	      //alert(error.data.msg);
	    });
    }

    $scope.cateIdData = cateIdData;  //所有商标分类

  	// 添加时间控件 初始化
    $('#applyTimeStart,#applyTimeEnd').datetimepicker({
      minView: "month", //选择日期后，不会再跳转去选择时分秒
      language:  'zh-CN',
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      todayBtn:  1,
      autoclose: true
    });
    $('.datetimepicker').css('display','none');


    var MsecFormat = function (input) {
      if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
      }
      var _date = new Date(input-0);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      return year + "-" + month + "-" + day;
    };
    $scope.obj = $location.search() || {};
    $scope.type = $scope.obj.bussinessType;
    $scope.applyTimeStart = $scope.obj.applyTimeStart && MsecFormat($scope.obj.applyTimeStart);
    $scope.applyTimeEnd = $scope.obj.applyTimeEnd && MsecFormat($scope.obj.applyTimeEnd);

    $scope.isAll = ($stateParams.cityId || $scope.obj.cityId) ? 0 : 1;

    //前面赋值后重置，避免时间获取潜在bug
	  $scope.obj.applyTimeStart = null;
	  $scope.obj.applyTimeEnd = null;


    //获取时间 applyTimeStart
    var get_applyTimeStart = function () {
      if (!$scope.applyTimeStart ) {
        return ''
      } else {
        if (!$scope.obj.applyTimeStart) {
          return new Date($scope.applyTimeStart).getTime();
        } else {
          if (typeof $scope.obj.applyTimeStart != 'string') {
            return new Date($scope.obj.applyTimeStart).getTime()
          } else {
            return $scope.obj.applyTimeStart - 0;
          }
        }
      }
    };

    //获取时间 applyTimeEnd
    var get_applyTimeEnd = function () {
      if(!$scope.applyTimeEnd) {
        return ''
      } else {
        if(!$scope.obj.applyTimeEnd) {
          return new Date($scope.applyTimeEnd).getTime() + 86399000
        } else {
          if(typeof $scope.obj.applyTimeEnd != 'string' ) {
            return new Date($scope.obj.applyTimeEnd).getTime() ;
          } else {
            return parseInt($scope.obj.applyTimeEnd,10) ;
          }
        }
      }
    };

    //init_order_list();

    function init_order_list() {
        $scope.to_loading = true;//默认 开始 加载
        $scope.loading_text = "加载中...";//加载页面内容
        if(!!$scope.obj.account_number){
            if($scope.obj.account_number.indexOf('@') === -1){
                $scope.buyer_mobile = $scope.obj.account_number;
            }else{
                $scope.buyer_email = $scope.obj.account_number;
            }
        }else{
            $scope.buyer_mobile = null;
            $scope.buyer_email = null;
        }

	      //接口处理
	      var handler = function (object, cb) {
	        var type = $scope.type;
	        if (type == 1 || type == 2 || type == 3 || type == 4 || type == 5) {
	        	cxbOrderService.hzwmList(object, cb);
	        }else if(type == 6){
	        	ntOrderService.list(object, cb);
	        }else if(type == 7 || type == 8 || type == 9){
	        	cxbOrderService.hzwmCzList(object, cb);
	        }else if(type==10){
				cxbOrderService.gjhlist(object,cb)
			}
	        if (type == 1 || type == 2 || type == 3 || type == 4 || type == 5 ) {
	        	countAmount();
	        }
	      };

        var OweNer = function (pg_index, pg_count, cb) {
            var pageConfig = {
                "pg_index": pg_index,
                "pg_count": pg_count,
                "applyTimeStart": get_applyTimeStart(),
                "applyTimeEnd": get_applyTimeEnd(),
			};
			
            if (!$scope.isAll) {
				pageConfig.cityId = 175;
			}else{
				delete $scope.obj.cityId
			}
			pageConfig.applyArea = $scope.isAll ? '全国' : '杭州'
			if($scope.type ==10){
				pageConfig = {
					"pgIndex": pg_index,
					"pgCount": pg_count,
				};
			}
            var object = $.extend({}, $scope.obj, pageConfig);
            handler(object, cb);
            var o = $.extend({}, object, $scope.typeobj);
            $location.search(object).replace();
            //$location.path('main/trade_home/cxb_order_list').search(o);
		};
		if($scope.type==10){
			$scope.pagination = new PaginationService(OweNer, 15,1);
		}else{
			$scope.pagination = new PaginationService(OweNer, 15);
		}
        

        $scope.$watch('pagination.curPageItems', function (newItems) {
            $scope.OrderList = [];
            if (newItems == undefined)
                return;
            if ($scope.pagination.curPageItems.length === 0) {
                $scope.loading_text = "没有符合条件的记录";//加载页面内容
                return;
            }
            $scope.OrderList = newItems;
            $scope.to_loading = false;//如果不为空 结束加载页面
        });
    }
    $scope.jump = function(type){
    	$scope.obj.bussinessType = type+'';
    }

    $scope.jump1 = function(type){
    	$scope.obj.bussinessType = type+'';
    	if (!type) {return;}
      $scope.search_order(type);
    }

    $scope.jumpUser = function(type){
    	$state.go("main.trade_home.hzwm_user_list", {type: type||1});
    }

    //按条件查询
    $scope.search_order = function(type){
    	if (!type && !$scope.obj.bussinessType) {
    		layer.alert('请选择业务类型')
    		return;
    	}
    	$scope.showTable = 'true';
    	localStorage.setItem('showTable', 'true');
    	$scope.type = $scope.obj.bussinessType
      init_order_list();
    }

    $scope.search_reset = function (){
      $scope.obj = {};
      $scope.applyTimeStart = null;
      $scope.applyTimeEnd = null;
    }

    $scope.$watch('obj.bussinessType', function (newVal) {
    	if (!newVal) {return;}
      $scope.search_order(newVal);
    });

    $scope.$watch('isAll', function (newVal) {
			initStatistics()
    });

    /**
     * 查看订单详情
     * @param index
     */
    $scope.detail_orders = function(index){
        $location.path('main/trade_home/hzwm_order_detail/' + index);
    }

    $scope.search_export = function(index){
    	if (!$scope.obj.bussinessType) {
    		layer.alert('请选择业务类型')
    		return;
    	}
	  	var pageConfig = {
	      "applyTimeStart": get_applyTimeStart (),
	      "applyTimeEnd": get_applyTimeEnd (),
	      //"payment_start_time": get_payment_start_time (),
	      //"payment_end_time": get_payment_end_time (),
	      //"is_filter_test": $scope.obj.is_filter_test ? 1 : 0
	    };
	    if (!$scope.isAll) {
	    	pageConfig.cityId = 175;
	    }else{
	    	delete $scope.obj.cityId
	    }
	    pageConfig.applyArea = $scope.isAll ? '全国' : '杭州'
	    var object = $.extend({}, $scope.obj, pageConfig);
	    object.pg_index = null;
	    object.pg_count = null;
	    object.access_token = session.accessToken;
	    var apiName = 'orderOfflineReport'
	    var bussinessType = $scope.obj.bussinessType;
	    if (bussinessType == 6) {
	  		apiName = 'findEvidenceListByParamsReport'
	  	}
	  	if (bussinessType == 7 || bussinessType == 8 || bussinessType == 9) {
	  		apiName = 'findList4EvidenceReport'
	  	}
	  	location.href = rootConfig.adminUrl + '/iprp_operator/api/' +apiName+ '?' + $.param(object)
	  }
});

