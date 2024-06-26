import axios from "axios";
import { useEffect, useState } from "react"
import { Send } from "./Send";
import { useDebounce } from "../hooks/useDebounce";

const backendUrl = "http://localhost:3000/api/v1"
const url = backendUrl + '/user/bulk'

export const Userlist = ({setBalance})=>{
    const [users,setUsers] = useState([]);
    const [inputValue,setInputValue] = useState("")
    const filter = useDebounce(inputValue,500);
    const [load,setLoad] = useState(true)

    const getUsers = async ()=>{
        try{
            const response = await axios.get(url+'?filter='+filter,{
                headers: {
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response)
            setLoad(false)
            setUsers(response.data.users)
        }
        catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        getUsers();
    },[filter])
    
    if(load){
        return <div>
            <h1>Loading....</h1>
            </div>
    }

    return <div>
        <h1 className="px-5 text-2xl font-bold">Users</h1>
        <div className="w-full px-4 ">
        <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} type="text" className="my-5 w-full py-2 px-2 border-2 rounded-xl border-gray-300" placeholder="Search Users..." />
        <div>
            {users.map((user)=>{
                return <div className="flex justify-between px-1 py-3">
                    <h1 className="text-lg font-bold">{user.firstName} {user.lastName}</h1>
                    <Send user={user} setBalance = {setBalance} />
                </div>
            })}
        </div>
        </div>
    </div>
}