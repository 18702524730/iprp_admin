angular.module('iprpAdminApp').factory('session', ['$rootScope','$cookies','$cookieStore','$resource','$timeout','AuthenticationService',
    function ($rootScope,$cookies, $cookieStore, $resource, $timeout, AuthenticationService) {
        var self = this;
        self = $rootScope.$new();
        var modelPermission = {
            //权限对象：包含所有权限（true/false)
        };
        /*
         * 检查当前登录的用户是否包含某模块权限。
         * @param  promise(string) 模块字符串。
         * @return (bool)   返回是否包含这个模块的权限
         */
        self.containModel = function (promise) {
            return !!modelPermission[promise];
        };
        self.name=$cookies.get('name');
        self.admin_id = $cookies.get('admin_id');
        /*
         * 初始化session
         *
         * */
        var sessionResource = $resource(options.api.base_url+'/privilege',{},{
            "query":{
                method:'GET',
                isArray:false
            }
        });
        self.verifyLogin = function(name) {
            if(!$cookies.get('token')){
                AuthenticationService.needAuthentication();
                return self;
            }
        };
        self.initSession = function () {
            if (self.accessToken == null)
                self.accessToken = $cookies.get('token');
            self.admin_id = $cookies.get('admin_id');
            self.name = $cookies.get("name");
            if (self.accessToken != null) {
                var session = sessionResource.get({access_token: self.accessToken},function (user) {
                    //根据token 成功获取当前登录用户
                    //把返回的数据扩展到自身属性。
                    angular.extend(self, user);
                    //根据用户权限设置modelPermission。
                    var privilege = [];
                    if(user.purviews != undefined){
                        if(user.purviews.length > 0){
                            for (var i in user.purviews) {
                                privilege.push(user.purviews[i]);
                            }
                        }
                    }
                    //用于main.js控制各主菜单下的默认路由
                    var initSelfPermission = function(){
                        $.each(privilege, function(i, name){
                            if(name.indexOf('iprp_') !== -1){
                                var ret = name.replace('iprp_','') + '_show';
                                self[ret] = false;
                            }
                        });
                    }
                    /*
                    老的方式手动添加，如下：
                    modelPermission.IPRPExpressManageModel = privilege.indexOf('iprp_express_manage') != -1;//物流
                    modelPermission.IPRPEmailManageModel = privilege.indexOf('iprp_email_manage') != -1;//邮件通知
                    */
                    //后台权限字段转换成前台字段 改为自动匹配设置，去除原来的手动设置方式 2017.6.23
                    var initModelPermission = function(){
                        $.each(privilege, function(i, name){
                            var isShow = privilege.indexOf(name) !== -1;
                            var arr = (name + '_model').split('_');
                            arr = arr.map(function(item, idx, arr){
                                var ret = ''
                                if (idx === 0) {
                                    ret = item.toUpperCase();
                                }else{
                                    ret = item[0].toUpperCase() + item.slice(1);
                                }
                                return ret;
                            });
                            modelPermission[arr.join('')] = isShow;
                        });
                    };
                    initSelfPermission();
                    initModelPermission();
                    self.modelPermission = modelPermission;
                    self.$emit('sessionChangePage', self);
                    return self;
                }, function (err) {
                    AuthenticationService.needAuthentication();
                    return self;
                });
                angular.extend(self, session);
                return self;
            } else if (self.accessToken == null) {
                AuthenticationService.needAuthentication();
                return self;
            }
        };
        return self;
    }]);


    /*modelPermission.IPRPSystemModel = privilege.indexOf('iprp_system') !== -1;//设置
    modelPermission.IPRPMemberModel = privilege.indexOf('iprp_member') != -1;//会员
    modelPermission.IPRPBusinessModel = privilege.indexOf('iprp_business') != -1;//服务
    modelPermission.IPRPServiceModel = privilege.indexOf('iprp_servicer') != -1;//服务商
    modelPermission.IPRPChannelModel = privilege.indexOf('iprp_channel') != -1;//渠道商
    modelPermission.IPRPTradeModel = privilege.indexOf('iprp_trade') != -1;//交易
    modelPermission.IPRPBillModel = privilege.indexOf('iprp_bill') != -1;//结算*/

/*
    modelPermission.IPRPFastModel = privilege.indexOf('iprp_fast') !== -1;//快服
    modelPermission.IPRPTradeModel = privilege.indexOf('iprp_trade') != -1;//订单
    modelPermission.IPRPMasterModel = privilege.indexOf('iprp_master') !== -1;//管家
    modelPermission.IPRPAfterSaleModel = privilege.indexOf('iprp_after_sale') !== -1;//售后
    modelPermission.IPRPMemberModel = privilege.indexOf('iprp_member') !== -1;//会员
    modelPermission.IPRPProductModel = privilege.indexOf('iprp_product') !== -1;//商品
    modelPermission.IPRPMarketModel = privilege.indexOf('iprp_market') !== -1;//营销
    modelPermission.IPRPCmsModel = privilege.indexOf('iprp_cms') !== -1;//内容
    modelPermission.IPRPFinanceModel = privilege.indexOf('iprp_finance') !== -1;//财务
    modelPermission.IPRPServiceModel = privilege.indexOf('iprp_service') !== -1;//服务商
    modelPermission.IPRPChannelModel = privilege.indexOf('iprp_channel') !== -1;//渠道
    modelPermission.IPRPStatisticsModel = privilege.indexOf('iprp_statistics') !== -1;//统计
    modelPermission.IPRPSystemModel = privilege.indexOf('iprp_system') !== -1;//设置

    modelPermission.IPRPPrivilegeManageModel = privilege.indexOf('iprp_privilege_manage') != -1;//权限管理
    modelPermission.IPRPNewsManageModel =  privilege.indexOf('iprp_news_manage') != -1;//消息通知
    modelPermission.IPRPSettingManageModel = privilege.indexOf('iprp_order_set_manage') != -1;//订单分流
    modelPermission.IPRPPaymentManageModel = privilege.indexOf('iprp_payment_manage') != -1;//支付方式
    modelPermission.IPRPExpressManageModel = privilege.indexOf('iprp_express_manage') != -1;//物流
    modelPermission.IPRPEmailManageModel = privilege.indexOf('iprp_email_manage') != -1;//邮件通知
    modelPermission.IPRPLogsManageModel = privilege.indexOf('iprp_log_manage') != -1;//日志
    modelPermission.IPRPAdminListModel = privilege.indexOf('iprp_admin_list') != -1;//管理员列表
    modelPermission.IPRPAddAdminModel = privilege.indexOf('iprp_add_admin') != -1;//添加管理员
    modelPermission.IPRPUpdateAdminModel = privilege.indexOf('iprp_update_admin') != -1;//编辑管理员
    modelPermission.IPRPDeleteAdminModel = privilege.indexOf('iprp_delete_admin') != -1;//删除管理员
    modelPermission.IPRPGAdminListModel = privilege.indexOf('iprp_gadmin_list') != -1;//功能组列表
    modelPermission.IPRPAddGAdminModel = privilege.indexOf('iprp_add_gadmin') != -1;
    modelPermission.IPRPUpdateGAdminModel = privilege.indexOf('iprp_update_gadmin') != -1;
    modelPermission.IPRPDeleteGAdminModel = privilege.indexOf('iprp_delete_gadmin') != -1;
    modelPermission.IPRPDateListModel = privilege.indexOf('iprp_data_list') != -1;//业务组列表
    modelPermission.IPRPAddDataModel = privilege.indexOf('iprp_add_data') != -1;
    modelPermission.IPRPUpdateDateModel = privilege.indexOf('iprp_update_data') != -1;
    modelPermission.IPRPDeleteDateModel = privilege.indexOf('iprp_delete_data') != -1;
    modelPermission.IPRPNewsListModel = privilege.indexOf('iprp_news_list') != -1;//消息列表
    modelPermission.IPRPNewsDealModel = privilege.indexOf('iprp_news_deal') != -1;//消息处理
    modelPermission.IPRPDeleteNewsModel = privilege.indexOf('iprp_delete_news') != -1;//删除消息
    modelPermission.IPRPOrderSettingModel = privilege.indexOf('iprp_order_setting') != -1;//订单分流设置
    //modelPermission.IPRPSaveOrderSetModel  = privilege.indexOf('iprp_save_order_set') !=-1;//订单分流保存
    modelPermission.IPRPPaymentListModel = privilege.indexOf('iprp_payment_list') != -1;//支付方式列表
    modelPermission.IPRPAddPaymentModel = privilege.indexOf('iprp_add_payment') != -1;//添加支付方式
    modelPermission.IPRPUpdatePaymentModel = privilege.indexOf('iprp_update_payment') != -1;//修改支付方式
    modelPermission.IPRPExpressListModel = privilege.indexOf('iprp_express_list') != -1;//物流列表
    modelPermission.IPRPUpdateExpressModel = privilege.indexOf('iprp_update_express') != -1;//修改物流
    modelPermission.IPRPEmailTplListModel = privilege.indexOf('iprp_email_tpl_list') != -1;//邮件模板列表
    modelPermission.IPRPAddEmailTplModel = privilege.indexOf('iprp_add_email_tpl') != -1;//添加邮件模板
    modelPermission.IPRPUpdateEmailTplModel = privilege.indexOf('iprp_update_email_tpl') != -1;//编辑邮件模板
    modelPermission.IPRPEmailSetModel = privilege.indexOf('iprp_email_set') != -1;//邮件设置
    modelPermission.IPRPLogListModel = privilege.indexOf('iprp_log_list') != -1;//日志列表
    modelPermission.IPRPMemberManageModel = privilege.indexOf('iprp_member_manage') != -1;//会员管理
    modelPermission.IPRPBlocMemberManageModel = privilege.indexOf('iprp_bloc_member_manage') != -1;//集团认证申请管理
    //modelPermission.IPRPBlocMemberManageTestModel = privilege.indexOf('iprp_bloc_member_manage_test') != -1;//集团认证申请管理


    modelPermission.IPRPMemberManageBlackModel = privilege.indexOf('iprp_black_member_manage') != -1;//用户黑名单管理


    modelPermission.IPRPAssignServicerManageModel = privilege.indexOf('iprp_assign_servicer_manage') != -1;//指定服务商
    modelPermission.IPRPMemberBlackModel = privilege.indexOf('iprp_member_black') != -1;//用户黑名单
    modelPermission.IPRPMemberListModel = privilege.indexOf('iprp_member_list') != -1;//会员列表
    modelPermission.IPRPMemberDetailModel = privilege.indexOf('iprp_member_detail') != -1;//会员查看
    //modelPermission.IPRPMemberAccountRelateModel = privilege.indexOf('iprp_member_account_relate') != -1;//账号关联
    //modelPermission.IPRPUpdateMemberModel = privilege.indexOf('iprp_update_member') != -1;//冻结/解冻
    modelPermission.IPRPMemberServiceModel = privilege.indexOf('iprp_member_service') != -1;//会员服务记录
    modelPermission.IPRPBlocMemberListModel = privilege.indexOf('iprp_bloc_member_list') !=-1;//集团会员申请列表
    //modelPermission.IPRPBlocMemberListTestModel = privilege.indexOf('iprp_bloc_member_list_test') !=-1;//集团会员申请列表

    modelPermission.IPRPMemberListBlackModel = privilege.indexOf('iprp_black_member_list') !=-1;//用户黑名单列表

    modelPermission.IPRPBlocMemberDetailModel = privilege.indexOf('iprp_bloc_member_detail') !=-1;//集团会员查看
    modelPermission.IPRPCheckBlocMemberModel = privilege.indexOf('iprp_check_bloc_member') !=-1;//集团会员审核
    modelPermission.IPRPAssignServicerListModel = privilege.indexOf('iprp_assign_servicer_list') !=-1;//指定服务商
    modelPermission.IPRPAddAssignServicerModel = privilege.indexOf('iprp_add_assign_servicer') !=-1;//添加服务商
    modelPermission.IPRPUpdateAssignServicerModel = privilege.indexOf('iprp_update_assign_servicer') !=-1;//编辑服务商
    modelPermission.IPRPAssignServicerModel = privilege.indexOf('iprp_assign_servicer') !=-1;//会员指定服务商
    modelPermission.IPRPBusinessManageModel = privilege.indexOf('iprp_business_manage') !=-1;//服务管理
    modelPermission.IPRPBusinessClassManageModel = privilege.indexOf('iprp_business_class_manage') !=-1;//服务分类管理
    modelPermission.IPRPBusinessListModel = privilege.indexOf('iprp_business_list') !=-1;//服务管理列表
    modelPermission.IPRPAddBusinessModel = privilege.indexOf('iprp_add_business') !=-1;//添加服务管理
    modelPermission.IPRPUpdateBusinessModel = privilege.indexOf('iprp_update_business') !=-1;//更新服务管理
    modelPermission.IPRPBusinessClassListModel = privilege.indexOf('iprp_business_class_list') !=-1;//服务分类管理
    modelPermission.IPRPAddBusinessClassModel = privilege.indexOf('iprp_add_business_class') !=-1;//添加服务分类管理
    modelPermission.IPRPUpdateBusinessClassModel = privilege.indexOf('iprp_update_business_class') !=-1;//编辑服务分类管理
    modelPermission.IPRPDeleteBusinessClassModel = privilege.indexOf('iprp_delete_business_class') !=-1;//删除服务分类管理
    modelPermission.IPRPLogsManageModel = privilege.indexOf('iprp_log_manage') != -1;
    modelPermission.IPRPUserModel = privilege.indexOf('iprp_member') != -1;//会员
    modelPermission.IPRPMemberManageModel = privilege.indexOf('iprp_member_manage') != -1;//会员管理
    modelPermission.IPRPGomApplyManageModel = privilege.indexOf('iprp_bloc_member_manage') != -1;//集团认证申请管理
    modelPermission.IPRPAssignServiceModel = privilege.indexOf('iprp_assign_servicer_manage') != -1;//会员指定服务商
    modelPermission.IPRPbusinessModel = privilege.indexOf('iprp_business') != -1;//服务
    modelPermission.IPRPBusinessClassManageModel = privilege.indexOf('iprp_business_class_manage') != -1;//服务分类
    modelPermission.IPRPServicerManageModel = privilege.indexOf('iprp_servicer_manage') != -1;//服务商管理
    modelPermission.IPRPBadServiceManageModel = privilege.indexOf('iprp_bad_servicer_manage') != -1;//失信服务商
    //三级
    modelPermission.IPRPServicerListModel = privilege.indexOf('iprp_servicer_list') != -1;//服务商管理list(meiyou)
    modelPermission.IPRPAddServicerModel = privilege.indexOf('iprp_add_servicer') != -1;//添加服务商管理
    modelPermission.IPRPServicerDetailModel = privilege.indexOf('iprp_servicer_detail') != -1;//查看服务商
    modelPermission.IPRPUpdateServicerModel = privilege.indexOf('iprp_update_servicer') != -1;//修改服务商管理
    modelPermission.IPRPUpdateServicerPwd = privilege.indexOf('iprp_update_servicer_pwd') != -1;//服务商重置密码
    modelPermission.IPRPServiceManageModel = privilege.indexOf('iprp_servce_manage') != -1;//服务管理
    modelPermission.IPRPBadServicerListModel = privilege.indexOf('iprp_bad_servicer_list') != -1;//失信服务商管理list
    modelPermission.IPRPAddBadServicerModel = privilege.indexOf('iprp_add_bad_servicer') != -1;
    modelPermission.IPRPUpdateBadServicerModel = privilege.indexOf('iprp_update_bad_servicer') != -1;
    modelPermission.IPRPChannelManageModel = privilege.indexOf('iprp_channel_manage') != -1;//渠道商管理
    modelPermission.IPRPChannelListModel = privilege.indexOf('iprp_channel_list') != -1;//渠道商列表
    modelPermission.IPRPAddChannelModel = privilege.indexOf('iprp_add_channel') != -1;//添加渠道商列表
    modelPermission.IPRPUpdateChannelModel = privilege.indexOf('iprp_update_channel') != -1;//修改渠道商列表
    modelPermission.IPRPChannelAssignServicer = privilege.indexOf('iprp_channel_assign_servicer') != -1;//渠道商指定服务商
    //modelPermission.IPRPDeleteChannelAssignServicer = privilege.indexOf('iprp_cancel_channel_assign_servicer') !=-1;//渠道商取消指定服务商
    modelPermission.IPRPInvoiceManageModel = privilege.indexOf('iprp_invoice_manage') != -1;//发票管理
    modelPermission.IPRPRedInvoiceManageModel = privilege.indexOf('iprp_red_invoice_manage') !=-1;//红冲发票管理
    modelPermission.IPRPRedInvoiceCheckListModel = privilege.indexOf('iprp_red_invoice_check_list') !=-1;//红冲发票审核列表
    modelPermission.IPRPRedInvoiceCheckModel = privilege.indexOf('iprp_red_invoice_check') !=-1;//红冲发票审核
    modelPermission.IPRPRedUnOpenInvoiceListModel = privilege.indexOf('iprp_red_unopen_invoice_list') !=-1;//红冲未开列表
    modelPermission.IPRPRedDealInvoiceModel = privilege.indexOf('iprp_red_deal_invoice') !=-1;//红冲处理
    modelPermission.IPRPRedOpenInvoiceListModel = privilege.indexOf('iprp_red_open_invoice_list') !=-1;//红冲已开列表
    modelPermission.IPRPOrderManageModel = privilege.indexOf('iprp_order_manage') != -1;//订单管理
    modelPermission.IPRPBsOrderManageModel = privilege.indexOf('iprp_bs_order_manage') != -1;//服务单管理
    modelPermission.IPRPNtOrderManageModel = privilege.indexOf('iprp_nt_order_manage') != -1;//存证单管理
    modelPermission.IPRPRefundManageModel = privilege.indexOf('iprp_refund_manage') != -1;//退款管理
    //三级
    modelPermission.IPRPOrderListModel = privilege.indexOf('iprp_order_list')!= -1;//订单列表
    modelPermission.IPRPOrderDetailModel = privilege.indexOf('iprp_order_detail') != -1;
    modelPermission.IPRPBsOrderListModel = privilege.indexOf('iprp_bs_order_list')!= -1;//订单列表
    modelPermission.IPRPBsOrderDetailModel = privilege.indexOf('iprp_bs_order_detail') != -1;
    modelPermission.IPRPNtOrderListModel = privilege.indexOf('iprp_nt_order_list')!= -1;//订单列表
    modelPermission.IPRPNtOrderDetailModel = privilege.indexOf('iprp_nt_order_detail') != -1;
    //modelPermission.IPRPRecycleOrderModel = privilege.indexOf('iprp_recycle_order') != -1;//订单回收/分配服务商
    modelPermission.IPRPUnopenInvoiceListModel = privilege.indexOf('iprp_unopen_invoice_list')!= -1;//未开列表
    modelPermission.IPRPDealInvoiceModel = privilege.indexOf('iprp_deal_invoice') != -1;//发票处理
    modelPermission.IPRPOpenInvoiceModel = privilege.indexOf('iprp_open_invoice') != -1;//开发票
    modelPermission.IPRPRedOpenInvoiceModel = privilege.indexOf('iprp_red_open_invoice') !=-1;//红冲开发票
    modelPermission.IPRPOpenInvoiceListModel = privilege.indexOf('iprp_open_invoice_list') != -1;//已开列表
    modelPermission.IPRPInvoiceExpressModel = privilege.indexOf('iprp_invoice_express') != -1;//发票回填物流
    modelPermission.IPRPRedInvoiceListModel = privilege.indexOf('iprp_red_invoice_list') != -1;//红冲发票
    modelPermission.IPRPInvoiceDetailModel = privilege.indexOf('iprp_invoice_detail') != -1;//发票详情
    modelPermission.IPRPRedInvoiceDetailModel = privilege.indexOf('iprp_red_invoice_detail') != -1;//红冲发票详情
    modelPermission.IPRPRedInvoiceCheckModel = privilege.indexOf('iprp_red_invoice_check') != -1;//红冲发票审核
    modelPermission.IPRPRefundListModel = privilege.indexOf('iprp_refund_list')!= -1;//退款列表
    modelPermission.IPRPRefundDetailModel = privilege.indexOf('iprp_refund_detail') !=-1;//退款详情
    modelPermission.IPRPAddRefundModel = privilege.indexOf('iprp_add_refund') != -1;
    modelPermission.IPRPCheckRefundModel = privilege.indexOf('iprp_check_refund') != -1;
    modelPermission.IPRPFinanceManageModel = privilege.indexOf('finance_manage') != -1;
    //二级
    modelPermission.IPRPCapitAlacountManageModel = privilege.indexOf('iprp_capit_alaccount_manage') != -1;//资金账户
    modelPermission.IPRPSpBillManageModel = privilege.indexOf('iprp_sp_bill_manage') != -1;//服务商结算
    modelPermission.IPRPBillTplManageModel = privilege.indexOf('iprp_bill_tpl_manage') != -1;//结算模板管理
    //三级
    modelPermission.IPRPCapitAlacountListModel = privilege.indexOf('iprp_capit_alaccount_list')!= -1;//资金账户列表
    modelPermission.IPRPAccountDetailListModel = privilege.indexOf('iprp_account_detail_list') != -1;//账户明细列表
    modelPermission.IPRPSpBillListModel = privilege.indexOf('iprp_sp_bill_list') != -1;//服务商结算列表
    modelPermission.IPRPSpBillDetailModel = privilege.indexOf('iprp_sp_bill_detail') != -1;//服务商结算查看
    //modelPermission.IPRPStatementListModel = privilege.indexOf('iprp_statement_list')!= -1;//结算单列表
    modelPermission.IPRPBillFinancialAuditModel = privilege.indexOf('iprp_bill_financial_audit')!= -1;//财务审核结算单
    modelPermission.IPRPBillSalesmanAuditModel = privilege.indexOf('iprp_bill_salesman_audit') != -1;//业务员审核
    modelPermission.IPRPBillTplListModel = privilege.indexOf('iprp_bill_tpl_list') != -1;//结算模板列表
    modelPermission.IPRPAddBillTplModel = privilege.indexOf('iprp_add_bill_tpl')!= -1;//添加结算模板
    modelPermission.IPRPEditBillTplModel = privilege.indexOf('iprp_edit_bill_tpl') != -1;//编辑结算模板
    modelPermission.IPRPDeleteBillTplModel = privilege.indexOf('iprp_delete_bill_tpl') != -1;//删除结算模板
*/
