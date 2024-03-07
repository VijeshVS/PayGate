import {toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify(txt,type){

    if(type == 's'){
        toast.success(txt, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    } else if(type == 'd'){
        toast.error(txt, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    }
}
