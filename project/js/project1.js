window.onload=function(){
				function main() {
					document.getElementById("sub").onclick = function () {
						var user=document.getElementById("mobile").value;
						var pwd_f = document.getElementById("two").value;
						var _params = {
							"user": user,
							"password": pwd_f
						};
						ajax("post", "api/login.php", true, _params, function (data) {
							if(data==1){
								console.log(data);
								alert("欢迎光顾!!");
								window.location.href="project.html";
							}else{
								alert("忘记密码了吗?");
							}
						});
					}
				}
				main();
}