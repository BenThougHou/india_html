/**
 * deposit 存款
 */
$.extend({
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    init() {
        //获取用户信息
        //headers.token = $.getQueryString('token');
        //headers.uid = $.getQueryString('uid');
        const info = uiObject.getInfo();
        if (!info || info == '')  alert(errorMsg.loginError);
        const parse = JSON.parse(info);
        headers.token = parse.token;
        headers.uid = parse.uid;
        if (!headers.token || !headers.uid || headers.token == '' || headers.uid == '') {
            alert(errorMsg.loginError);
            return;
        }
        //获取用户余额
        $.getWithHeaders(url.balanceUrl,{},headers,(res)=>{
            if (res.code == 0){
                $("#balance").text(res.data?res.data.amount:0.00);
            }
        });
        //定义存款提交按钮点击事件
        $("#button").click(()=>{
            let options = {
                paymentId:$("#paymentId").val(),
                amount:$("#amount").val(),
                payerAccount:$("#payerAccount").val(),
                payerMobile:$("#payerMobile").val(),
                payerName:$("#payerName").val(),
                //IFSC编码为印度银行的编码,IFSC代付代付是使用
                payerIfsc:$("#payerIfsc").val(),
            };
            $.postWithHeaders(url.withdraw,options,headers,(res)=>{
                console.log(res);
                //存款验证成功，调整到第三方存款页面
                if (res.code == 0) {
                    alert("suc");
                }else {
                    alert(res.msg);
                }
            })
        });
    }

});
