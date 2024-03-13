import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../utils/notify';

const backendUrl = process.env.backendUrl
const url = backendUrl + '/user/signup'

export const Signup = ()=>{

    const [first,setFirst] = useState("")
    const [last,setLast] = useState("")
    const [user,setUser] = useState("")
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")


    const signupFn  = async ()=> {
        setFirst("")
        setLast("")
        setUser("")
        setEmail("")
        setPass("")
        
        

        try {
        const response = await axios.post(url, {
            username : user,
            firstName : first,
            lastName : last,
            password : pass,
            email : email 
          })

          localStorage.setItem('token',"Bearer " + response.data.token )
          notify("User registered successfully",'s');
          navigate('/dashboard')

        }
        catch(e){
            if(e.response){
                const status = e.response.status;
                
                if(status == 411){
                    notify("User/email already exists or incorrect inputs",'d');
                }
                else{
                    notify("Error while signing up!!",'d');
                }
            }
            else{
                notify("Error while signing up!!",'d');
            }
        }

    }


    const navigate = useNavigate();
    return <div className="py-2 flex justify-center bg-gray-400 h-screen w-full">
        <div className="w-fit h-fit px-8 py-8 rounded-xl bg-white">
        <p className="text-center text-4xl font-bold">Sign Up</p>
        <p className="text-center mt-2 text-gray-400">Enter your information to create your account</p>
        <h1 className="font-bold text-left mt-5">First Name</h1>
        <input value = {first} onChange={(e)=>setFirst(e.target.value)} type="text" className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />

        <h1 className="font-bold text-left mt-4">Last Name</h1>
        <input value = {last} onChange={(e)=>setLast(e.target.value)} type="text" className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />

        <h1 className="font-bold text-left mt-4">Username</h1>
        <input value = {user} type="text" onChange={(e)=>setUser(e.target.value)}  className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />

        <h1 className="font-bold text-left mt-4">Email address</h1>
        <input value = {email} type="text" onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />

        <h1 className="font-bold text-left mt-4">Password</h1>
        <input value = {pass} type="password" onChange={(e)=>setPass(e.target.value)} className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />

        <button onClick = {signupFn}  className="w-full mt-6 rounded-xl text-white font-normal h-12 border-2 bg-black">Sign Up</button>
        
        <div className="flex justify-center">
        <h1 className="inline-block mt-3">Already have an account?</h1>
        <h1 className="inline-block ml-1 mt-3 cursor-pointer underline text-blue-500" onClick={()=>navigate('/signin')} > Login </h1>
        </div>
        </div>

    </div>
}