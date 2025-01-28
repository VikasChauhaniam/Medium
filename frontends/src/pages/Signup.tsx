import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SignupInput } from '@iamviky/medium-common'
import { BACKEND_URL } from '../config'

export const Signup = ()=>{


    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : ""
    })

    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex ">
        <div className="flex mx-auto my-auto">
            <div className="rounded-lg bg-white w-80  text-center p-2 h-max px-4 ">
                <Heading label = {"Sign up"}></Heading>
                <SubHeading label = {"Enter Information to create an Account"}></SubHeading>
                <InputBox onChange={(e)=>{setPostInputs(c => ({...c, name : e.target.value}))}} placeholder={"Viky Chauhan"} label={"Name"}></InputBox>
                <InputBox onChange={(e)=>{setPostInputs(c => ({...c, email : e.target.value}))}}placeholder={"chauhanvikas14348@gmail.com"} label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{setPostInputs(c => ({...c, password : e.target.value}))}} placeholder={"123456"} label={"Password"} type={"password"}></InputBox>
                <div className='pt-4'>
                    <Button onClick={async ()=>{
                        try{
                            // const response = await axios.post('http://localhost:8787/api/v1/user/signup', postInputs);
                            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
                            // console.log(response.data)
                            localStorage.setItem('token', response.data.jwt)
                            // console.log(response.data.jwt)
                            navigate('/blogs')
                        }
                        catch(e){
                            alert("Incorret Input in Signup!")
                        }
                    }} label={"Sign up"} ></Button>
                </div>
                <BottomWarning label={"Already have an Account"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}

