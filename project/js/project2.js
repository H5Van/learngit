        function main(){
            var _reg={
                "account":/^\w{6,12}$/g,//验证用户账号的长度够不够，并且限制只能字母数字下横线
                "mobile":/^1[345678]\d{9}$/g,//验证手机号
                "secret":/^.{6,20}$/g,//验证密码
                "math":/^\d{n}$/g,//验证数字验证码
            }
            document.getElementById("userAccount").onblur=function(){
                if(_reg.mobile.test(this.value)){
                    var _self=this;
                    ajax("post", "api/checkUser.php", true, {"condition": "user='" + this.value + "'"}, function (data) {
                        if (parseInt(data) > 0) {
                            _self.parentNode.children[1].innerHTML = "**手机号已占用";
                        } else {
                            _self.parentNode.children[1].innerHTML = "";
                        }
                    });
                }else{
                	this.parentNode.children[1].innerHTML = "*手机格式不正确";
                }
                _reg.account.lastIndex=0;
            }
            document.getElementById("password").onblur=function(){
			if(_reg.secret.test(this.value)) {
				this.parentNode.children[1].innerHTML = "";
			}else{
				this.parentNode.children[1].innerHTML = "*密码格式不正确";
			}
			_reg.secret.lastIndex=0;
			}
            document.getElementById("put").onblur=function(){
			if(_reg.math.test(this.value)) {
				this.parentNode.parentNode.children[1].innerHTML = "";
			}else{
				this.parentNode.parentNode.children[1].innerHTML = "*验证码不正确";
			}
			_reg.secret.lastIndex=0;
		}
            document.getElementById("denglu").onclick=function(){
			var aa=document.getElementById("down").value;
			var bb=document.getElementById("put").value;
			var _params={
				"user":document.getElementById("userAccount").value,
                "mobile":document.getElementById("userAccount").value,
                "secret":document.getElementById("password").value
			}
			if(aa==bb){
				if(_reg.account.test(_params.user) && _reg.mobile.test(_params.mobile) && _reg.secret.test(_params.secret)){
					ajax("post","api/registerUser.php",true,_params,function(data){
						if(parseInt(data)>0){
							console.log(data);
							alert("您已顺利成为会员！！！");
							window.location.href="denglu.html";
						}else{
							console.log(data);
							alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
						}
					})
				}else{
					_reg.account.lastIndex=0;
					_reg.mobile.lastIndex=0;
					_reg.secret.lastIndex=0;
					alert("尊敬的用户您好，您的基本信息不完整，为了安全请完善！！");
				}
			}else{
				alert("验证码输入错误");
			}
		}
    }
window.onload=main;
