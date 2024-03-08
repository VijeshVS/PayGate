import axios from "axios";
import { useEffect, useState } from "react"
import { Send } from "./Send";

const url = 'http://localhost:3000/api/v1/user/bulk'

export const Userlist = ({setBalance})=>{
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("")

    const getUsers = async ()=>{
        try{
            const response = await axios.get(url+'?filter='+filter,{
                headers: {
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response)
            setUsers(response.data.users)
        }
        catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        getUsers();
    },[filter])
    

    return <div>
        <h1 className="px-5 text-2xl font-bold">Users</h1>
        <div className="w-full px-4 ">
        <input value={filter} onChange={(e)=>setFilter(e.target.value)} type="text" className="my-5 w-full py-2 px-2 border-2 rounded-xl border-gray-300" placeholder="Search Users..." />
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