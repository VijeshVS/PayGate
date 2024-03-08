import { Balance } from "./Balance"
import { Navbar } from "./Navbar"
import { Userlist } from "./Userlist"

export const Dashboard = ()=>{
    return <div>
        <Navbar/>
        <Balance/>
        <Userlist/>
    </div>
}