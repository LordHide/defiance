import React, {useState} from 'react';
import {RegisterForm} from './registerForm';
import {LoginForm} from './loginForm';

export function Login({onUserLoad}) {

  const [typeForm, setTypeForm] = useState("login");

  return <div className='login'>
    <div className='fieldset'>
      <div className='fieldsetHeader'>
        <legend><span className='legendText' onClick={() => {setTypeForm("login")}}>SIGN IN</span></legend>
        <legend><span className='legendText' onClick={() => {setTypeForm("register")}}>REGISTER</span></legend>
      </div>
      {typeForm == "login" && <LoginForm onUserLoad={onUserLoad} />}
      {typeForm == "register" && <RegisterForm onUserLoad={onUserLoad} />}
    </div>
  </div>;
}