import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SigninInput } from '@iamviky/medium-common'
import { BACKEND_URL } from '../config'

export const Signin = ()=>{
    const [postInputs, setPostInputs] = useState<SigninInput>({
            email : "",
            password : ""
        })
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex ">
       
        <div className="flex mx-auto my-auto">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label = {"Sign in"}></Heading>
                <SubHeading label = {"Enter the Credentials"}></SubHeading>
                <InputBox onChange={(e)=>{setPostInputs(c => ({...c, email : e.target.value}))}} placeholder={"chauhanvikas14348@gmail.com"} label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{setPostInputs(c => ({...c, password : e.target.value}))}} placeholder={"123456"} label={"Password"} type={"password"}></InputBox>
                <div className='pt-4'>
                    <Button onClick={async ()=>{
                        try{
                            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
                            localStorage.setItem('token', response.data.jwt)
                            navigate("/blogs");
                        }
                        catch(e){
                            alert("Incorret Input in Signin!")
                        }

                    }} label={"Sign in"} ></Button>
                </div>
                <BottomWarning label={"Don't have an Account"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    </div>
}

