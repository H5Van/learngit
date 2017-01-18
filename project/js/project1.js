function main(){
            var _reg={
                "account":/^\w{6,12}$/g,//验证用户账号的长度够不够，并且限制只能字母数字下横线
                "mobile":/^1[345678]\d{9}$/g,//验证手机号
                "secret":/^.{6,20}$/g//验证密码
            }
            /*document.getElementById("userAccount").onblur=function(){
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
            }*/
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