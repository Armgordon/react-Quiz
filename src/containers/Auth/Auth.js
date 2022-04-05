import React, {useEffect, useState} from 'react';
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "axios";


function validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const Auth = () => {

    const[formValid, setFormValid] = new useState({
    isFormValid:false,
    formControls:{
        email:{
            value:'',
            type:'email',
            label:'Email',
            errorMessage:'Введите корректный email',
            valid:false,
            touched:false,
            validation:{
                required: true,
                email:true,
            }
        },
        password:{
            value:'',
            type:'password',
            label:'Пароль',
            errorMessage:'Введите корректный пароль',
            valid:false,
            touched:false,
            validation:{
                required: true,
                minLength:6,
            }

        }
    }
    })



    async function loginHandler(){

        const authData = {
            email: formValid.formControls.email.value,
            password: formValid.formControls.password.value,
            returnSecureToken:true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvRrASOxzPm1wqCiVmhcUNZrhQyy9ecHY', authData)

            console.log(response.data)
        }catch (error){
            console.log(error)
        }

        console.log('Press login')
    }
    async function registerHandler(){
        const authData = {
            email: formValid.formControls.email.value,
            password: formValid.formControls.password.value,
            returnSecureToken:true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvRrASOxzPm1wqCiVmhcUNZrhQyy9ecHY', authData)

            console.log(response.data)
        }catch (error){
            console.log(error)
        }


    }
    function submitHandler(event){
        event.preventDefault()
    }

    function onChangeHandler(event, controlName){
        const formValidFromHandler = {...formValid.formControls}
        const control = {...formValidFromHandler[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)


        formValidFromHandler[controlName] = control

        let isFormValid = true



        console.log('isFormValid ', isFormValid)


        Object.keys(formValidFromHandler).forEach(name => {
            isFormValid = formValidFromHandler[name].valid && isFormValid
        })


        setFormValid({
            formControls:formValidFromHandler,
            isFormValid:isFormValid
        })


    }
    useEffect(()=>{
        console.log(formValid)
    },[formValid])

    function validateControl(value, validation){
        if (!validation){
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }


        return isValid

    }

    function renderInputs(){
        return  Object.keys(formValid.formControls).map((controlName,index)=> {
            const control = formValid.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event)=> onChangeHandler(event, controlName)}
                />
            )

        })
    }


    return (
        <div className={classes.Auth}>
            <div>
                <h1>Авторизация</h1>

                <form onSubmit={submitHandler} className={classes.AuthForm}>

                    {renderInputs()}

                    <Button
                        type={"success"}
                        onClick={loginHandler}
                        disabled={!formValid.isFormValid}
                    >Войти</Button>
                    <Button
                        type={"primary"}
                        onClick={registerHandler}
                        disabled={!formValid.isFormValid}
                    >Зарегистрироваться</Button>
                </form>
            </div>
        </div>
    );

};

export default Auth;