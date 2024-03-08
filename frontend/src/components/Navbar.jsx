import {useNavigate} from 'react-router-dom'
import {notify} from '../utils/notify'

export const Navbar = ()=>{
    const navigate = useNavigate();
    return <div className="flex flex-row justify-between px-6 py-4 border-b-2 border-gray-200" >
        <h1 className="text-2xl  font-bold">Payments App</h1>
        <h1 onClick={()=>{
            localStorage.setItem('token',"")
            notify("User logged out successfully!!",'s')
            navigate('/signin')
        }} className="text-lg underline cursor-pointer text-blue-700">Logout</h1>
    </div>
}