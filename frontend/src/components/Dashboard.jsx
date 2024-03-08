import { Balance } from "./Balance"
import { Navbar } from "./Navbar"
import { Userlist } from "./Userlist"
import { useState } from 'react';

export const Dashboard = ()=>{
    const [balance, setBalance] = useState(0);

    return <div>
        <Navbar/>
        <Balance balance={balance} setBalance = {setBalance}/>
        <Userlist setBalance = {setBalance}/>
    </div>
}