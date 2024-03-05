import { useNavigate } from "react-router-dom"

export const Signin = ()=>{
    const navigate = useNavigate();

        return <div className="py-2 flex justify-center bg-gray-400 h-screen w-full">
            <div className="w-fit m-auto h-fit inline-block px-10 py-10 rounded-xl bg-white">
            <p className="text-center text-4xl font-bold">Sign In</p>
            <p className="text-center mt-2 text-gray-400">Enter your information to login</p>
    
            <h1 className="font-bold text-left mt-4">Username or Email address</h1>
            <input type="text" className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />
    
            <h1 className="font-bold text-left mt-4">Password</h1>
            <input type="password" className="w-full rounded-l  h-8 border-2 border-gray-10 mt-3 p-2" />
    
            <button className="w-full mt-6 rounded-xl text-white font-normal h-12 border-2 bg-black">Sign In</button>
            <div className="flex justify-center">
            <h1 className="inline-block mt-3">Don't have an account? </h1>
            <h1 className="inline-block ml-1 mt-3 cursor-pointer underline text-blue-500" onClick={()=>navigate('/signup')}> Register </h1>
            </div>
            </div>
    
        </div>
}