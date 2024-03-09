import { useEffect, useState } from "react"

export const useDebounce = (value,timeout)=>{
    const [val,setVal] = useState(value);

    useEffect(()=>{
        const p = setTimeout(()=>{
            setVal(value)
        },timeout)

        return () =>{
            clearTimeout(p)
        }
    },[value])


    return val
}   