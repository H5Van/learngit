<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
        body{
            margin:0 auto; text-align:center;
            padding-top:50px;
        }
        div{
            width:93%; height:auto; margin:0 auto;
        }
        div ul{ width:100%; list-style:none; padding:0px; margin:0px;}
        div ul li{ width:100%; height:30px; overflow:hidden;}
        div ul li span{ float:left; display:block; width:80px; text-align:right; color:#555;
            height:30px; line-height:30px; font-size:14px;
        }
        div ul li span.comment{ width:200px;}
        div ul li input{ margin:3px auto auto 0px; height:22px; outline:none;
            padding:0px 5px 0px 5px; float:left; border:1px solid #ccc; font-size:14px; color:#555;
        }
        .btn{ padding-top:20px;}
        #register{ display:block; width:100px; height:30px; overflow:hidden; color:#fff;
            background-color:#940032; border-radius:5px; margin-left:90px; line-height:30px;
            font-size:14px; font-family:"微软雅黑"; cursor:pointer;
        }
    </style>
    <script type="text/javascript" src="../javascript/Ajax.js"></script>
    <script type="text/javascript">
		/*
		接口地址：api/checkUser.php
		请求接口时需要一个SQL查询条件：
		"condition": "user='" + this.value + "'"
		
		作用：校验用户输入的用户名|手机号|邮箱账号是否已经存在
		如果存在接口响应的内容：1，反之：0
		*/
        function main(){
            var _reg={
                "account":/^\w{6,12}$/g,//验证用户账号的长度够不够，并且限制只能字母数字下横线
                "mobile":/^1[345678]\d{9}$/g,//验证手机号
                "mail":/^\w+@([a-z0-9-]+\.)+[a-z]+$/gi,//验证邮箱
                "secret":/^.{6,20}$/g//验证密码
            }
            document.getElementById("userAccount").onblur=function(){
                if(_reg.account.test(this.value)){
                    var _self=this;
                    ajaxRequest("post", "api/checkUser.php", true, {"condition": "user='" + this.value + "'"}, function (data) {
                        if (parseInt(data) > 0) {
                            _self.parentNode.children[2].innerHTML = "**用户账号已被占用，请重新输入！！";
                        } else {
                            _self.parentNode.children[2].innerHTML = "";
                        }
                    });
                }else{
                    this.parentNode.children[2].innerHTML = "*用户账号只能由6-12个字母数字或者下横向组成";
                }
                _reg.account.lastIndex=0;
            }
            document.getElementById("mail").onblur=function(){
                if(_reg.mail.test(this.value)) {
                    var _self=this;
                    ajaxRequest("post", "api/checkUser.php", true, {"condition": "mail='" + this.value + "'"}, function (data) {
                        if (parseInt(data) > 0) {
                            _self.parentNode.children[2].innerHTML = "*该邮箱账号已被占用，请重新输入！！";
                        } else {
                            _self.parentNode.children[2].innerHTML = "";
                        }
                    });
                }else{
                    this.parentNode.children[2].innerHTML = "*邮箱格式不正确！！";
                }
                _reg.mail.lastIndex=0;
            }
            document.getElementById("mobile").onblur=function(){
                if(_reg.mobile.test(this.value)) {
                    var _self=this;
                    ajaxRequest("post", "api/checkUser.php", true, {"condition": "mobile='" + this.value + "'"}, function (data) {
                        if (parseInt(data) > 0) {
                            _self.parentNode.children[2].innerHTML = "**手机号码已被占用，请重新输入！！";
                        } else {
                            _self.parentNode.children[2].innerHTML = "";
                        }
                    });
                }else{
                    this.parentNode.children[2].innerHTML = "*手机格式不正确！！";
                }
				_reg.mobile.lastIndex=0;
            }
            document.getElementById("register").onclick=function(){
                var pwd_f=document.getElementById("password").value;
                var pwd_s=document.getElementById("rPassword").value;
                if(pwd_f==pwd_s){
                    var _params={
                        "user":document.getElementById("userAccount").value,
                        "message":"",
                        "mobile":document.getElementById("mobile").value,
                        "mail":document.getElementById("mail").value,
                        "secret":document.getElementById("password").value,
                        "name":document.getElementById("userName").value
                    };
                    if(_reg.account.test(_params.user) && _reg.mobile.test(_params.mobile) && _reg.mail.test(_params.mail) && _reg.secret.test(_params.secret)) {
                        ajaxRequest("post", "api/registerUser.php", true, _params, function (data) {
                            //接口的作用就是保存用户信息
							/*
							使用接口传参要求：
							{
								"user":"",//6-12个字符，表示用户账号
								"message":"",//key要包含，内容可以为空
								"mobile":"",//手机号
								"mail":"",
								"secret":"",
								"name":""
							}
							*/
							console.log(data);
                            if (parseInt(data) > 0) {
                                alert("您已顺利成为会员！！！");
                            } else {
                                alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
                            }
                        });
                    }else{
                        alert("尊敬的用户您好，您的基本信息不完整，为了安全请完善！！");
                    }
                }else{
                    document.getElementById("comment").innerHTML="两次输入的密码不匹配，请重新输入";
                }
            }
        }
        window.onload=main;
    </script>
</head>
<body>
    <div>
        <ul>
            <li><span>账号：</span><input type="text" id="userAccount"/><span class="comment"></span></li>
            <li><span>用户名：</span><input type="text" id="userName"/><span class="comment"></span></li>
            <li><span>手机号：</span><input type="text" id="mobile"/><span class="comment"></span></li>
            <li><span>邮箱账号：</span><input type="text" id="mail"/><span class="comment"></span></li>
            <li><span>用户密码：</span><input type="password" id="password"/><span class="comment"></span></li>
            <li><span>重复密码：</span><input type="password" id="rPassword"/><span class="comment" id="comment"></span></li>
        </ul>
    </div>
    <div class="btn">
        <span id="register">同意并注册</span>
    </div>
</body>
</html>