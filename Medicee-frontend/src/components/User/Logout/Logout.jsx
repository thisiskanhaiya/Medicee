import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';
import { useContext } from "react";
import { contextAPi } from "../../../App";
const Logout = () => {

  const {state, dispatch } = useContext(contextAPi)

  const History = useNavigate();

  useEffect(()=>{
    fetch('/user/logout',{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res) =>{
        dispatch({type:"home", payload:"home"})
        History('/');
    }).catch((err) =>{
      console.log(err);
    })
  },[])

  return (
    <div>Logout</div>
  )
}

export default Logout;