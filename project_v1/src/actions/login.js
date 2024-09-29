import _ from 'lodash';
import Ajax from '../utils/ajax';
import {message} from 'antd';

{/* 触发action */}
export function clearErrors(){
	return (dispatch, getState)=>{
		dispatch({
			type: 'CLEAR_ERRORS',
			error: null
		});
	}
}

{/* 用户登录 */}
export function userLogin(postData){
	return (dispatch, getState)=>{
		Ajax.post({
			url: 'http://127.0.0.1:3000/user/login',
			data: postData,
			error(){
				window.location.href="#/home";
			},
			success(res){
				const result = res.body;
				console.log(result);
				if(result.code === "200"){
					dispatch({
						type: 'USER_LOGIN',
						username: result.userName,
						userId: result.userId,
						userState: result.userState,
						message: result.msg
					});
					message.success("登录成功，欢迎您！");
					window.location.href="#/home";
				}else{
					dispatch({
						type: 'GET_ERRORS',
						error: result.msg
					});
					message.error("登录失败，请重试！");
				}
			}
		})
	}
 }



 {/* 用户zhuce */}
 export function userRegister(postData){
 	return (dispatch, getState)=>{
 		Ajax.post({
 			url: 'http://127.0.0.1:3000/user/register',
 			data: postData,
 			success(res){
 				const result = res.body;
 				if(result.code === "200"){
 					dispatch({
 						type: 'UESR_REGISTER',
 						userName: result.userName,
						message: result.msg
 					});
 					window.location.href="../#/login";
 				} else {
 					dispatch({
 						type: 'GET_ERRORS',
 						error: result.msg
 					});
 					message.error("注册失败，请重试！");
 				}
 			}
 		})
 	}
  }
