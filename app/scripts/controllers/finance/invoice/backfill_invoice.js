angular.module('iprpAdminApp')
    .controller('BackFillInvoiceCtrl', function ($scope,InvoiceService,orderService,$stateParams,PaginationService,ExpressService,AreaService,$location) {
        $('#unopen_list').siblings().removeClass("selected");
        $('#unopen_list').addClass("selected");
        $scope.open = { };
        $scope.invoiceOpenError = false;
        $scope.invoice_open_error = "";
        /**
         * 详情
         */
        InvoiceService.invoice.detail({invoice_id : $stateParams.invoice_id},function(date){
            $scope.invoice_detail = date;
            if($scope.invoice_detail.invoice_amount != null){
                $scope.tax_amount = $scope.invoice_detail.invoice_amount * 0.06;
            }
            if($scope.invoice_detail.order_id != null){
                get_invoice_order($scope.invoice_detail.order_id);
            }
            if($scope.invoice_detail.rec_provinceid != null){
                proviceName($scope.invoice_detail.rec_provinceid);
            }
            if($scope.invoice_detail.rec_cityid != null){
                cityName($scope.invoice_detail.rec_cityid);
            }
            if($scope.invoice_detail.rec_areaid != null){
                areaName($scope.invoice_detail.rec_areaid);
            }
        },function(error){
            alert(error.data.msg);
        });

        function proviceName(pro_id){
            AreaService.area.area_detail({area_id:pro_id},function(data){
                $scope.proviceName = data.name;
            },function(error){
                alert(error.data.msg);
            });
        }
        function cityName(city_id){
            AreaService.area.area_detail({area_id:city_id},function(data){
                $scope.CityName = data.name;
            },function(error){
                alert(error.data.msg);
            });
        }
        function areaName(area_id){
            AreaService.area.area_detail({area_id:area_id},function(data){
                $scope.AreaName = data.name;
            },function(error){
                alert(error.data.msg);
            });
        }
        function get_invoice_order(order_id){
            orderService.orderDetail({order_id:order_id},{},function(date){
                $scope.order_detail = date;
            },function(error){
                alert(error.date.msg)
            });
        };

        //发票代码验证
        $scope.invoiceCode = function(ind,invoice){
            if(null != invoice[ind].code && "" != invoice[ind].code && undefined != invoice[ind].code){
                if(!/^\d{5,18}$/.test(invoice[ind].code)){
                    $scope.invoiceOpenError = true;
                    $scope.invoice_open_error = "发票代码使用5~18位以内的数字";
                }else{
                    $scope.invoiceOpenError = false;
                    $scope.invoice_open_error = "";
                }
            }else{
                $scope.invoiceOpenError = true;
                $scope.invoice_open_error = "发票代码不能为空并且只能是数字";
            }
        };

        //发票号码验证
        $scope.invoiceMember = function(ind,invoice){
            if(null != invoice[ind].number && "" != invoice[ind].number && undefined != invoice[ind].number){
                if(!/^\d{5,18}$/.test(invoice[ind].number)){
                    $scope.invoiceOpenError = true;
                    $scope.invoice_open_error = "发票号码使用5~18位以内的数字";
                }else{
                    $scope.invoiceOpenError = false;
                    $scope.invoice_open_error = "";
                }
            }else{
                $scope.invoiceOpenError = true;
                $scope.invoice_open_error = "发票号码不能为空并且只能是数字";
            }
        };
        /**
         * 提交
         */
        var flag = false;
        var chooseTime;
        var temp1;
        var temp2;
        var myDate = new Date();//时间实例
        var H = myDate.getHours(); //获取小时
        var M = myDate.getMinutes(); //获取分钟
        var S = myDate.getSeconds();//获取秒
        var MS = myDate.getMilliseconds();//获取毫秒
        var milliSeconds = H * 3600 * 1000 + M * 60 * 1000 + S * 1000 + MS;
        $scope.save = function(invoice_id,invoice_sn,invoice_open_list){
            if(confirm("您确定所填的发票信息吗？确定请提交！")){
                angular.forEach($scope.invoice_detail.invoiceOpenDTOList,function(date){
                    if(date.code != null && date.code !=undefined && "" != date.code){
                        if(!/^\d{5,18}$/.test(date.code )){
                            $scope.invoiceOpenError = true;
                            $scope.invoice_open_error = "发票代码使用5~18位以内的数字";
                            flag = true;
                            return;
                        }else{
                            $scope.invoiceOpenError = false;
                            $scope.invoice_open_error = "";
                            flag = false;
                        }
                    }else{
                        $scope.invoiceOpenError = true;
                        $scope.invoice_open_error = "发票代码不能为空并且只能是数字";
                        flag = true;
                        return;
                    }
                    if(date.number != null && date.number !=undefined && "" != date.number){
                        if(!/^\d{5,18}$/.test(date.number )){
                            $scope.invoiceOpenError = true;
                            $scope.invoice_open_error = "发票号码使用5~18位以内的数字";
                            flag = true;
                            return;
                        }else{
                            $scope.invoiceOpenError = false;
                            $scope.invoice_open_error = "";
                            flag = false;
                        }
                    }else{
                        $scope.invoiceOpenError = true;
                        $scope.invoice_open_error = "发票号码不能为空并且只能是数字";
                        flag = true;
                        return;
                    }
                    if(date.code != null && date.number!= null && date.time != null){
                        chooseTime = date.time;
                        if(!/^[0-9]+$/.test(chooseTime)){
                            if(chooseTime.getHours() === 0){
                                date.time = new Date(date.time).getTime();
                                date.time = date.time + milliSeconds;
                            }else if(chooseTime.getHours() > 0){
                                date.time = new Date(date.time).getTime();
                            }
                        }
                        flag = false;
                    }else{
                        $scope.invoiceOpenError = true;
                        $scope.invoice_open_error = "开票时间不能为空";
                        flag = true;
                        return;
                    }
                    if(($scope.invoice_detail.invoiceOpenDTOList[0].code + "" + $scope.invoice_detail.invoiceOpenDTOList[0].number) ===
                        ($scope.invoice_detail.invoiceOpenDTOList[1].code + "" + $scope.invoice_detail.invoiceOpenDTOList[1].number)){
                        $scope.invoiceOpenError = true;
                        $scope.invoice_open_error = "检查发票代码或发票号码，不能重复";
                        flag = true;
                        return;
                    }
                });
                if(flag === false){
                    InvoiceService.invoice.back_fill_invoice({invoice_id:invoice_id},$scope.invoice_detail,function(data){
                        $location.path('/main/finance_home/unopen_list')
                    },function(error){
                        alert(error.data.msg)
                    })
                }
            }
        };
        /**
         * 查询所有快递公司
         */
        ExpressService.express_all.all(function(date){
            $scope.expressAll = date;
        });
    });