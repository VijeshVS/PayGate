import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { notify } from "../utils/notify";

const backendUrl = "https://ff42b547-2686-43b2-ba3b-7266ab8ba015-00-1jn5mzkhyvey.worf.replit.dev"
const url = backendUrl + '/user/signin'

export const Signin = ()=>{
    const navigate = useNavigate();

    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")

    const signin = async ()=>{
        setUser("")
        setPass("")
        try{
            const response = await axios.post(url,{
                username : user,
                password: pass
            })
            localStorage.setItem('token',"Bearer "+response.data.token)
            notify("User logged in successfully!!",'s')
            navigate('/dashboard')
        }
        catch(e){
            notify("Error while logging in !!",'d')
        }
    }

        return <div className="py-2 flex justify-center bg-gray-400 h-screen w-full">
            <div className="w-fit m-auto h-fit inline-block px-10 py-10 rounded-xl bg-white">
            <p className="text-center text-4xl font-bold">Sign In</p>
            <p className="text-center mt-2 text-gray-400">Enter your information to login</p>
    
            <h1 className="font-bold text-left mt-4">Username or Email address</h1>
            <input  onChange={(e)=>setUser(e.target.value)} value={user}  type="text" className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />
    
            <h1 className="font-bold text-left mt-4">Password</h1>
            <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />
    
            <button onClick={signin} className="w-full mt-6 rounded-xl text-white font-normal h-12 border-2 bg-black">Sign In</button>
            <div className="flex justify-center">
            <h1 className="inline-block mt-3">Don't have an account? </h1>
            <h1 className="inline-block ml-1 mt-3 cursor-pointer underline text-blue-500" onClick={()=>navigate('/signup')}> Register </h1>
            </div>
            </div>
    
        </div>
}