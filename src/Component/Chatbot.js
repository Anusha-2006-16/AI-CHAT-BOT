import axios from 'axios';
import React, { useState } from 'react'
import { HashLoader } from 'react-spinners';

const Chatbot = () => { 
    const[qns,setQns]=useState("Hi");
    const[ans,setAns]=useState("Hello, How can I help you !!");
    const[inputData,setInputData]=useState("");
    const[loader,setLoader]=useState(false);
    const sendingData={
        "contents":[{
            "parts":[{"text":""}]
        }]
    }
    const handleInput=(e)=>{
        // setInputData(e.target.value);
        const inputValue=e.target.value;
         
        sendingData.contents[0].parts[0].text=inputValue;
        
    }
    const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
    const API_KEY="AIzaSyBIw9mVg6EKAXyIVabRGuarQLtN-4dgvFw";
    const getData=()=>{
        setLoader(true);
        const data=axios.post(`${url}${API_KEY}`, sendingData)
        .then((res)=>{
            setQns(  sendingData.contents[0].parts[0].text);
            setAns(res.data.candidates[0].content.parts[0].text);
            setLoader(false);
            console.log(res);            
        }).catch((err)=>{
            setLoader(false);
            console.log(err);
        })
        setInputData("");
    }
  return (
    <div className='container'>
       <div className='data-container'>
        {
            !loader?<p className='qns'>{qns}</p>:<></>
        }
        {
            !loader?<p className='ans'>{ans}</p>:<></>
        }
       
        <HashLoader className='loader' loading={loader}/>
       </div>
       <div className='input-container'>
         <input type='text' placeholder='Ask with your AI Friend !' onChange={handleInput}/>
         <button onClick={getData}>Submit</button>
       </div>
    </div>
  )
}

export default Chatbot
// 