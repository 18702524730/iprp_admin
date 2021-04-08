angular.module('iprpAdminApp').controller('MerchantEditCtrl',function($scope,MerchantManageService, $modal,$stateParams,$state, $location,Upload,session,bsOrderService,ChannelService,ServicerService,BusinessService,PaginationService,BusinessClassService, LabelServicerService){
	$('#merchant_list').addClass("selected").parent().siblings().children().removeClass("selected");
	$scope.imgObj = {};
	$scope.flowType = 1;
	$scope.shopUrl = 'https://www.ipsebe.com'
	if (location.host.indexOf('test') == 0) {
		$scope.shopUrl = 'https://testwww.ipsebe.com'
	}
	$scope.allselect = {}
	// 详情，除了业务资料和服务类目
	var getDetail = function(){
		MerchantManageService.detail({spId: $stateParams.spId}, function(data){
			console.log(data)
			$scope.detail = data;
		});
	}
	getDetail();
	
	
	// 店铺资料
	var getStoreData = function(){
		MerchantManageService.getStore({spId: $stateParams.spId}, function(data){
			console.log(data)
			$scope.storeData = data[0];
		});
	}
	$scope.businessData = {};
	// 业务资料
	var getBusinessData = function(){
		MerchantManageService.getBusiness({sp_id: $stateParams.spId}, function(data){
			$scope.businessData = data;
			$scope.businessData.isCxb = data.thirdRelateAccount ? 1 : 0;
			$scope.businessData.enableChannelOrder = data.enableChannelOrder ? 1 : 0;
			$scope.businessData.enableNice = data.enableNice ? 1 : 0;

			$scope.businessData.enableDomesticTrademark = data.enableDomesticTrademark ? 1 : 0;
			$scope.businessData.enableInternationalTrademark = data.enableInternationalTrademark ? 1 : 0;
			$scope.businessData.enableOtherTrademark = data.enableOtherTrademark ? 1 : 0;
			$scope.businessData.enableCopyright = data.enableCopyright ? 1 : 0;
			$scope.businessData.enableTechProject = data.enableTechProject ? 1 : 0;
			$scope.businessData.enablePatentJudgement = data.enablePatentJudgement ? 1 : 0;
			$scope.businessData.enablePatentPermit = data.enablePatentPermit ? 1 : 0;
			$scope.businessData.enableExport = data.enableExport ? 1 : 0;
			$scope.businessData.enableDeletePrivilege = data.enableDeletePrivilege ? 1 : 0;

			

			$scope.businessData.permission = data.permission ? 1 : 0;
			$scope.businessData.enablePatentOther = data.enablePatentOther ? 1 : 0;
			$scope.businessData.enablePatentPct = data.enablePatentPct ? 1 : 0;
			$scope.businessData.enableRemainCase = data.enableRemainCase ? 1 : 0;
			$scope.businessData.enableTaobaoMarket = data.enableTaobaoMarket ? 1 : 0;
			$scope.businessData.enableACxbSp = data.enableACxbSp ? 1 : 0;
			$scope.businessData.enableACxbSebe = data.enableACxbSebe ? 1 : 0;
			$scope.businessData.enableACxbWuzhou = data.enableACxbWuzhou ? 1 : 0;
			$scope.businessData.enableACxb2017 = data.enableACxb2017 ? 1 : 0;
			$scope.businessData.enableACxb201808 = data.enableACxb201808 ? 1 : 0;
			$scope.businessData.enableBSebe2017 = data.enableBSebe2017 ? 1 : 0;
			$scope.businessData.enableBSebe201808 = data.enableBSebe201808 ? 1 : 0;
			$scope.businessData.enableD1Other2016 = data.enableD1Other2016 ? 1 : 0;
			$scope.businessData.enableD1Other2017 = data.enableD1Other2017 ? 1 : 0;
			$scope.businessData.enableD2Offline2016 = data.enableD2Offline2016 ? 1 : 0;
			$scope.businessData.enableD2Offline2017 = data.enableD2Offline2017 ? 1 : 0;
			$scope.businessData.enableGChannel201808 = data.enableGChannel201808 ? 1 : 0;
			$scope.businessData.enableHenanSebe = data.enableHenanSebe ? 1 : 0;
			$scope.businessData.enableH1XiamenTrademark = data.enableH1XiamenTrademark ? 1 : 0;
			$scope.businessData.enableH2XiamenOther = data.enableH2XiamenOther ? 1 : 0;
			$scope.businessData.enableSebePatentStatistic = data.enableSebePatentStatistic ? 1 : 0;
			$scope.businessData.enableBeijingDeclareHangzhouCase = data.enableBeijingDeclareHangzhouCase ? 1 : 0;

			$scope.allId = data.label.filter(function(item){return !!item.tag_id}).map(function(item){return item.tag_id});
		});
		LabelServicerService.shop_label_list(function(data){
			$scope.labelData = data.elements;
		});
	}
	$scope.allId = [];
	$scope.sChoose = function(id, ev){
		if($scope.allId.indexOf(id) !== -1){
			$scope.allId.splice($scope.allId.indexOf(id),1);
		}else{
			if ($scope.allId.length == 5) {
				$(ev.target).prop('checked', false);
				layer.alert('商家标签最多勾选5个')
				return;
			}
			$scope.allId.push(id);
		}
	};
	// 服务类目
	$scope.selectall = function(){
		$scope.allselect.isall = !$scope.allselect.isall
		
		if($scope.allselect.isall){
			$scope.allselect.alldata = 0
			$scope.businessData.enableDomesticTrademark = 0;
			$scope.businessData.enableInternationalTrademark = 0;
			$scope.businessData.enableOtherTrademark = 0;
			$scope.businessData.enableCopyright = 0;
			$scope.businessData.enableTechProject = 0;
			$scope.businessData.enablePatentJudgement = 0;
			$scope.businessData.enablePatentPermit = 0;
			$scope.businessData.enablePatentOther = 0;
			$scope.businessData.enablePatentPct = 0;
			$scope.businessData.enableRemainCase = 0;
			$scope.businessData.enableTaobaoMarket = 0;
			$scope.businessData.enableACxbSp = 0;
			$scope.businessData.enableACxbSebe = 0;
			$scope.businessData.enableACxbWuzhou = 0;
			$scope.businessData.enableACxb2017 = 0;
			$scope.businessData.enableACxb201808 = 0;
			$scope.businessData.enableBSebe2017 = 0;
			$scope.businessData.enableBSebe201808 = 0;
			$scope.businessData.enableD1Other2016 = 0;
			$scope.businessData.enableD1Other2017 = 0;
			$scope.businessData.enableD2Offline2016 = 0;
			$scope.businessData.enableD2Offline2017 = 0
			$scope.businessData.enableGChannel201808 = 0;
			$scope.businessData.enableHenanSebe = 0;
			$scope.businessData.enableH1XiamenTrademark = 0;
			$scope.businessData.enableH2XiamenOther = 0;
			$scope.businessData.enableSebePatentStatistic = 0;
			$scope.businessData.enableBeijingDeclareHangzhouCase = 0;
		}else{
			$scope.allselect.alldata = 1
			$scope.businessData.enableDomesticTrademark = 1;
			$scope.businessData.enableInternationalTrademark = 1;
			$scope.businessData.enableOtherTrademark = 1;
			$scope.businessData.enableCopyright = 1;
			$scope.businessData.enableTechProject = 1;
			$scope.businessData.enablePatentJudgement = 1;
			$scope.businessData.enablePatentPermit = 1;
			$scope.businessData.enablePatentOther = 1;
			$scope.businessData.enablePatentPct = 1;
			$scope.businessData.enableRemainCase = 1;
			$scope.businessData.enableTaobaoMarket = 1;
			$scope.businessData.enableACxbSp = 1;
			$scope.businessData.enableACxbSebe = 1;
			$scope.businessData.enableACxbWuzhou = 1;
			$scope.businessData.enableACxb2017 = 1;
			$scope.businessData.enableACxb201808 = 1;
			$scope.businessData.enableBSebe2017 = 1;
			$scope.businessData.enableBSebe201808 = 1;
			$scope.businessData.enableD1Other2016 = 1;
			$scope.businessData.enableD1Other2017 = 1;
			$scope.businessData.enableD2Offline2016 = 1;
			$scope.businessData.enableD2Offline2017 = 1
			$scope.businessData.enableGChannel201808 = 1;
			$scope.businessData.enableHenanSebe = 1;
			$scope.businessData.enableH1XiamenTrademark = 1;
			$scope.businessData.enableH2XiamenOther = 1;
			$scope.businessData.enableSebePatentStatistic = 1;
			$scope.businessData.enableBeijingDeclareHangzhouCase = 1;
		}
	}
	var initServiceClass = function(){
		var getChannels = function(cb){
			ChannelService.channel.channel_all({
				"pg_index":0,
				"pg_count":999
			},function(data){
					$scope.channel_list = data.elements;
					if ($scope.channel_list.length) {
							$scope.channel_id = $scope.channel_id || $scope.channel_list[0].channel_id;
							$scope.channel_name = $scope.channel_name || $scope.channel_list[0].name;
					}
					addChanelToBusinessList();
					cb && cb();
			});
		};

		//切换渠道
		$scope.channelChange = function(channel_id){
				var channel_name = '';
				$.each($scope.channel_list, function(i, item){
						if (item.channel_id == channel_id) {
								channel_name = item.name;
								return false;
						}
				});
				$scope.channel_id = channel_id;
				$scope.channel_name = channel_name;
				addChanelToBusinessList();
				addBilityToBusinessList();
				init_service_list($scope.bs_class_id);
		};

		//能力值列表 get /api/serviceSpBs/212
		var initBilityList = function(){
				BusinessService.serviceSpBsList({
						sp_id: $stateParams.spId
				},{
						"pg_index":0,
						"pg_count":999,
				},function(data){
						$scope.bility_list = data.elements || [];
						addBilityToBusinessList();
				});
		}

		/**
		 * 初始化入口
		 * 获取服务商详情get /api/services/212
		 */
		$scope.tempServiceBusiness = [];
		$scope.businessList = [];
		ServicerService.serviceDetail({sp_id:$stateParams.spId},function(data){
				$scope.service_detail  = data;
				$scope.sp_id = $stateParams.spId;
				$scope.sp_code = $stateParams.spCode;
				init_service_list();
		},function(error){
				alert(error.data.msg)
		});

		function addChanelToBusinessList(){
				var items = $scope.businessList;
				//渠道数据组合到这儿
				$.each(items, function(i, item){
						item.channel_name = $scope.channel_name;
						item.channel_id = $scope.channel_id;
						item.sp_id = $scope.sp_id;
						item.sp_code = $scope.sp_code;
				});
		}

		// 注意：依赖businessList，bility_list，channel_id，
		function addBilityToBusinessList(){
				var items = $scope.businessList;
				var bility_list = $scope.bility_list
				var len = 0;
				//能力值数据组合到这儿
				$.each(items, function(i, item){
						item.sp_now_ability = null;
						item.sp_ability = null;
						item.check = false;
						item.sp_bs_id = '';
						$.each(bility_list, function(idx, it){
								if (it.bs_id == item.bs_id && it.channel_id == $scope.channel_id) {
										item.sp_now_ability = it.sp_now_ability;
										item.sp_ability = it.sp_ability;
										item.check = it.check;
										item.sp_bs_id = it.sp_bs_id;
										len ++;
								}
						});
				});
				$scope.bilityLength = len;
		}
		$scope.pagination = {
				curPage:0,
				totalCount: 0,
				countPerPage: 15
		}

		var temp = false;
		var once = false;
		function init_service_list(bs_class_id, pageIndex){
				$scope.pagination = null;
				$scope.tempServiceBusiness = [];
				$scope.to_loading = true;//默认 开始 加载
				$scope.loading_text = "加载中...";//加载页面内容
				var OweNer = function(pg_index,pg_count,cb){
						// 总的服务列表 api/common/businesses
						BusinessService.common_list({
								"pg_index":temp && pageIndex || pg_index,
								"pg_count":pg_count,
								bs_class_id : bs_class_id || ''
						},cb);
						temp = false;
				};
				$scope.pagination = new PaginationService(OweNer,15);

				if (pageIndex) {
						$scope.pagination.curPage = pageIndex;
				}

				if (once) {return}
				once = true;
				$scope.$watch('pagination.curPageItems',function(newItems){
						$scope.businessList = [];
						if(newItems == undefined)
								return;
						if ($scope.pagination.curPageItems.length === 0){
								$scope.loading_text = "没有符合条件的记录";//加载页面内容
								return;
						}
						$scope.businessList = newItems;
						getChannels(initBilityList);
						$scope.tempServiceBusiness = $scope.businessList;
						$scope.to_loading = false;//如果不为空 结束加载页面
				});
		}

		/**
		 * 获取一级服务分类
		 */
		BusinessClassService.common_findChildByParentId({
				pg_count : 999,
				pg_index : 0,
				parent_id :0
		},function(data){
				$scope.BusinessFirst = data;
		});
		//二级分类
		$scope.searchSecond = function(params){
				$scope.bs_class_id = params || '';
				init_service_list(params || $scope.bs_class_id);
				BusinessClassService.common_findChildByParentId({
						"pg_index" : 0,
						"pg_count": 999,
						"parent_id":params
				},function(data){
						$scope.BusinessSrcondclass=data;
						initBilityList();
				});
				$scope.s_bs_class_id = '';
				$scope.t_bs_class_id = '';
		};
		//获取三级
		$scope.searchThird = function(params){
				init_service_list(params || $scope.bs_class_id);
				BusinessClassService.common_findChildByParentId({
						"pg_index" : 0,
						"pg_count": 999,
						"parent_id":params
				},function(data){
						$scope.BusinessThreeclass=data;
				});
				$scope.t_bs_class_id = '';
		};
		$scope.showBusiness = function(params){
			init_service_list(params || $scope.s_bs_class_id);
		};


		//关闭
		$scope.close = function(item){
				//POST  /api/serviceSpBs/212
				BusinessService.serviceSpBs({
						sp_id: $stateParams.spId
				},{
						sp_id: $stateParams.spId,
						sp_bs_id: item.sp_bs_id,
						sp_code: item.sp_code,
						bs_id: item.bs_id,
						check: false,
						channel_id: item.channel_id,
						sp_ability: item.sp_ability
				},function(data){
						temp = true;
						//不刷新列表只刷新能力值
						//init_service_list($scope.t_bs_class_id || $scope.s_bs_class_id || $scope.bs_class_id, $scope.pagination.curPage);
						initBilityList();
				},function(error){
						alert(error.data.msg);
				});
		};

		//查看所有服务
		$scope.all_service = function(){
				$scope.bs_class_id = '';
				// 上面置空后不能选中，jq补上
				$('#first').val('');
				$scope.BusinessSrcondclass = {};
				$scope.BusinessThreeclass = {};
				init_service_list();
		};

		//开通、修改
		$scope.servAction = function(item, isEdit, sp_code){
				$modal.open({
						resolve:{
								itemD : function(){
										return {
												item: item,
												isEdit: isEdit,
												sp_code: sp_code
										};
								}
						},
						backdrop:false,
						keyboard:true,
						templateUrl: 'package\\modal\\service\\edit_servicer_manage.html',
						controller: 'EditServicerManage'
				}).result.then(function (result) {
						//$state.reload();
						temp = true;
						//不刷新列表只刷新能力值
						//init_service_list($scope.t_bs_class_id || $scope.s_bs_class_id || $scope.bs_class_id, $scope.pagination.curPage);
						initBilityList();
				});
		};
	}

	$scope.uploadFile = function (file,name) {
			//console.log(file.size);
			var MAX_POST_SIZE = 5 * 1024 * 1024;
			console.log(file)
			if (!/\.(jpg|jpeg|png|bmp)$/i.test(file.name)){
				alert("上传图片仅支持jpg、png、bmp格式");
			}
			else if(file.size > MAX_POST_SIZE){
				alert("上传图片请小于5M");
			}
			else{
					Upload.upload({
							url: options.api.base_url + '/file/upload',
							data: {Filedata: file}
					}).then(function (resp) {
							resp = resp.data;
							if(resp.url != undefined){
								$scope.detail[name] = resp.url;
							}
					}, function (resp) {
							resp = resp.data;
					});
			}
	};

	$scope.next = function(index){
			$scope.flowType = index;
	}

	$scope.$watch('flowType', function (flowType) {
			console.log(flowType)
			getDetail();
			if (flowType == 1) {}
			if (flowType == 2) {
				getStoreData();
			}
			if (flowType == 3) {}
			if (flowType == 4) {
				getStoreData();
				getBusinessData();
			}
			if (flowType == 5) {
				initServiceClass();
			}
			if (flowType == 6) {}
	});

	$scope.$watch('businessData.manageType', function (flowType) {
			$scope.businessData.distributeOrder = $scope.businessData.manageType;
	});

	$scope.obj = {
			name:'',
			phone:'',
			provinceName:'',
			cityName:'',
			areaName:'',
			address:''
	};

	$scope.errName = '';
	$scope.errContact = '';
	$scope.errPhone = '';
	$scope.errAddress = '';
	$scope.errEmail = '';
	$scope.errIntro = '';

	$scope.updateDetail = function(){//信息校验
		$scope.errName = '';//初始化
		$scope.errContact = '';
		$scope.errPhone = '';
		$scope.errWeight = '';
		$scope.errCxbAccount = '';
		if ($scope.flowType == 1) {
			if(!$scope.detail.name){
					$scope.errName = '机构名称不能为空';
					return;
			}else if(!$scope.detail.sp_contacts){
					$scope.errContact = '联系人姓名不能为空';
					return;
			}else if(!$scope.detail.phone){
					$scope.errPhone = '联系电话不能为空';
					return;
			}else if(!(/(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/.test($scope.detail.phone))){
					$scope.errPhone = '联系电话格式错误，固话若加区号请用-分隔';
					return;
			}
		}
		if ($scope.flowType == 4) {
			if($scope.storeData && $scope.storeData.store_id && !($scope.businessData.weight+'')){
					$scope.errWeight = '店铺搜索权重不能为空';
					return;
			}else if($scope.storeData && $scope.storeData.store_id && !(/^[1-9][0-9]?$/.test($scope.businessData.weight))){
					$scope.errWeight = '店铺搜索权重只能为1-99数字';
					return;
			}else if($scope.businessData.isCxb == 1 && !$scope.businessData.thirdRelateAccount){
					$scope.errCxbAccount = '创新保账号不能为空';
					return;
			}
			if ($scope.businessData.isCxb == 0) {
				$scope.businessData.thirdRelateAccount = '';
			}
			if (!($scope.businessData.creater)) {
				layer.msg('请填写创建人');
				return
			}
			if (!($scope.businessData.employee)) {
				layer.msg('请填写员工姓名');
				return
			}
		}

		layer.confirm('是否保存商家信息？', {
			btn: ['是','否'] //按钮
		}, function(){
			if ($scope.flowType == 4) {
				var sobj = Object.assign({},$scope.businessData);
				var creaters = $scope.businessData.creater
				sobj.creater = creaters?creaters.replace(/^\s+|\s$/g,''):null
				var salesman = $scope.businessData.salesman
				sobj.salesman = salesman?salesman.replace(/^\s+|\s$/g,''):null
				var agentName = $scope.businessData.agentName
				sobj.agentName = agentName?agentName.replace(/^\s+|\s$/g,''):null
				var selectDocument = $scope.businessData.selectDocument
				sobj.selectDocument = selectDocument?selectDocument.replace(/^\s+|\s$/g,''):null
				var employee = $scope.businessData.employee
				sobj.employee = employee?employee.replace(/^\s+|\s$/g,''):null
				MerchantManageService.updateBusiness({spId: $stateParams.spId}, Object.assign({}, sobj, {
					label: $scope.allId
				}), function(data){
					layer.msg('保存成功');
				}, function(err){
					if (err.data) {
						layer.alert(err.data.msg);
					}
				});
				return;
			}
			MerchantManageService.edit({spId: $stateParams.spId}, $scope.detail, function(data){
				layer.msg('保存成功');
			}, function(err){
				if (err.data) {
					layer.alert(err.data.msg);
				}
			});
		}, function(){

		});
	}

});
