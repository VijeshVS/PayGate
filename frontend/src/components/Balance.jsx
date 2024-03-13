import { useEffect, useState } from "react";
import axios from 'axios';
import { notify } from '../utils/notify';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '/'

const url = backendUrl + '/account/balance'

export const Balance = ({balance,setBalance}) => {
    const navigate = useNavigate();
    

    const bal = async () => {
        try {
            const headers = {
                'authorization': localStorage.getItem('token')
            };

            const response = await axios.get(url, { headers });
            setBalance(response.data.balance);
        } 
        catch (error) {
            notify("User not authorized!!", 'd');
            navigate('/signin')
        }
    };

    useEffect(() => {
        bal();
    }, []); 

    return (
        <div className="px-5 py-5">
            <h1 className="font-bold text-lg">Your Balance  ${balance}</h1>
        </div>
    );
};
