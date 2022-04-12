import axios from 'axios'
import {AUTH_FAILED, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";
import {error} from "bfj/src/events";

export function auth(email, password, isLogin){
    return async dispatch => {

        const authData = {
            email,
            password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvRrASOxzPm1wqCiVmhcUNZrhQyy9ecHY'

        if (isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvRrASOxzPm1wqCiVmhcUNZrhQyy9ecHY'
        }

        await axios.post(url, authData).then((response)=>{
            const data = response.data
            const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000)
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(expirationDate))
        }).catch(error=>{
            if(error.response){
                dispatch(authFailed(error.response.data.error.message))
               console.log(error.response.data.error.message)
            }
        })
    }
}

export function  autoLogout(time){
    return dispatch =>{
        setTimeout(()=>{
            dispatch(autoLogout())
        }, time*1000)
    }

}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return{
        type: AUTH_LOGOUT
    }

}
export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

export function authFailed(errorText){
    return{
        type: AUTH_FAILED,
        errorText
    }
}

export function autoLogin(){
    return async dispatch=> {
        const token = localStorage.getItem('token')
        if (!token){
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()){
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime()- new Date().getTime())/1000))
            }
        }

    }
}