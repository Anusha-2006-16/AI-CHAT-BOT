import axios from 'axios';
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';

const AIChatBot = () => {
    const [inputData,setInputData]=useState("");
    const[qns,setQns]=useState("Hi");
    const[ans,setAns]=useState("Hi,How can I help you!!!");
    const[loader,setLoader]=useState(false);
    const API_KEY="AIzaSyBIw9mVg6EKAXyIVabRGuarQLtN-4dgvFw";
    const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

     const sendingData={
        "contents":[{
            "parts":[{"text":inputData}]
        }]
    }

    const handleInput=(e)=>{
        const inputValue=e.target.value;
        setInputData(inputValue);
      
        
    }
    const handleClear=()=>{
        setInputData("");
        setQns("Hi");
        setAns("Hi,How can I help you!!!");
    }
    const handleSubmit=(()=>{
        setLoader(true);
        const data=axios.post(`${url}`+`${API_KEY}`,sendingData)
        .then((res)=>{
            setLoader(false);
          setQns(sendingData.contents[0].parts[0].text);
        setAns(res.data.candidates[0].content.parts[0].text)   
        console.log(res);
        }).catch((err)=>{
            setLoader(false);
            setQns(sendingData.contents[0].parts[0].text);
            setAns("Something error occured , ",err);
            // console.log("Something error occured , ",err);
        })
        setInputData("");
    })
  return (

    <div className='container'>
        <div className='data-container'>
            {
                !loader ? <p className='qns'><strong>AI: </strong> {qns} </p> : <></>
            }
            {
                !loader ? <p className='ans'><strong>YOU: </strong>{ans}</p> : <></>
            }
              {loader && <ClipLoader className='loader' loading={loader} />}
        </div>
     <div className='input-container'>
        <input placeholder='Ask anything...' value={inputData}  onChange={handleInput}/>
        <div className='btns'>
            <button onClick={handleSubmit} >Submit</button>
        <button onClick={handleClear}>Clear Chat</button>
        </div>
     </div>

    </div>
  )
}

export default AIChatBot
