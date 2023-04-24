import React, {useState, useEffect, useContext} from 'react';
import {LoadIcon} from './loadIcon';
import {FormErorrMessage} from './formErorrMessage';
import '../css/components/login.css';
import UserContext from '../context/UserContext.js';
import InfoIconContext from '../context/InfoIconContext.js';

export function LoginForm({onUserLoad}) {

  const [isSendingLogin, setIsSendingLogin] = useState("pending");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesage, setErrorMesage] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const [infoIcon, setInfoIcon] = useContext(InfoIconContext);

  useEffect(() => {
    if(isSendingLogin == "send"){
      setIsSendingLogin("loading");
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      fetch(
        `api/login`,
        {
          method: "POST",
          body: formData
        }
      )
      .then(res => res.json())
      .then(response => {
          if(response.success == 1){
            setUserData(response.data);
            setInfoIcon(response.listIcons);
            onUserLoad();
          }
          else{
            setErrorMesage(response.errors);
          }
          setIsSendingLogin("pending");
        }
      )
      .catch((error) => {
          console.log(error);
          setIsSendingLogin("pending");
        }
      );
      }
    },[isSendingLogin, errorMesage]
  )

  return <>
      <fieldset className='fielsetLog'>
        <label htmlFor="fname" className='fromLabel' >Name: {errorMesage.email && <FormErorrMessage error={errorMesage.email}/>}</label>
        <input type="text" placeholder="Email or user name" required id="fname" name="fname" onChange={e => {setEmail(e.target.value)}}></input>
        <label htmlFor="fpassword" className='fromLabel' >Password: {errorMesage.password && <FormErorrMessage error={errorMesage.password}/>}</label>
        <input type="password" laceholder="Password" required id="fpassword" name="fpassword" onChange={b => {setPassword(b.target.value)}}></input>
      </fieldset>
      {isSendingLogin == "pending" && <button className='logingButtom' onClick={() => {setIsSendingLogin("send")}}>Submit</button>}
      {isSendingLogin != "pending" && <LoadIcon/>}
    </>;
}