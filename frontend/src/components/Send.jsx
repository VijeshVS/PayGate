import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { notify } from '../utils/notify';
import axios from 'axios';


const backendUrl = "https://ff42b547-2686-43b2-ba3b-7266ab8ba015-00-1jn5mzkhyvey.worf.replit.dev/api/v1"
const url = backendUrl + "/account/transfer"

export const Send = ({user,setBalance})=>{
  const [openModal, setOpenModal] = useState(false);
  const [amt,setAmt] = useState();

    const transfer = async ()=>{
        try{
            await axios.post(url,{
                to: user._id,
                amount:amt
            },{
                headers:{
                    Authorization : localStorage.getItem('token')
                }
            })
            
            notify(`Transfered Rs.${amt} to ${user.firstName} successfully!!`,'s')
            setBalance(c => c-amt)
    }
    catch(e){
        notify("Insufficient balance!!",'d')
    }
    }
    
  return (
    <>
    <button onClick={() => setOpenModal(true)} className="font-medium text-md bg-black text-white p-2 rounded-xl">Send Money</button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Send Money</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1 className='text-2xl font-bold'>{user.firstName} {user.lastName}</h1>
            <h1 className='text-lg font-bold'>Amount (in Rs.)</h1>
            <input value={amt} onChange={(e)=>setAmt(e.target.value)} type="text" placeholder='Enter the amount' className='w-full h-10 rounded-xl border-2 border-gray-400' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            if(amt){
                transfer();
            }
            setOpenModal(false)
            setAmt(0);
        }}>Initiate transfer</Button>
          <Button color="gray" onClick={() =>  {
            setOpenModal(false)
            setAmt(0);
            }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}