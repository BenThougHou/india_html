//项目域名
const server = "http://pay.hishow.xyz";
//存取款地址
const url={
    balanceUrl: server +"/api/orderCashout/getAccountBalanceByUId",
    deposit: server + "/api/orderCashin/order",
    withdraw: server + "/api/orderCashout/order",
};
//公用请求头
const headers = {
    token:"",
    uid:"",
};
//公用错误提示信息
const errorMsg = {
    loginError:"登录已过期,请重新登录",
};
$.extend({

    ajaxData: function(url , type, options, headers,callbackSuc, callbackErr) {
        $.ajax({
            type: type,
            url: url,
            async: true,
            data: options,
            headers: headers,
            success: function(data) {
                if ($.isFunction(callbackSuc)) callbackSuc(data);
            },
            error: function(data) {
                if ($.isFunction(callbackErr)) callbackErr(data);
            }
        });
    },
    postWithHeaders: function(url,options,headers,callbackSuc,callbackErr) {
        $.ajaxData(url,'POST',options,headers,callbackSuc,callbackErr);
    },
    postData: function(url,options,callbackSuc,callbackErr) {
        $.ajaxData(url,'POST',options,{},callbackSuc,callbackErr);
    },
    getWithHeaders: function(url,options,headers,callbackSuc,callbackErr) {
        $.ajaxData(url,'GET',options,headers,callbackSuc,callbackErr);
    },
    getData: function(url,options,callbackSuc,callbackErr) {
        $.ajaxData(url,'GET',options,{},callbackSuc,callbackErr);
    },
})
