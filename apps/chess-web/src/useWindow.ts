'use client'
import { useEffect, useState } from 'react'

const useWindow = () => {
    const [windowsize,setWindow]=useState(768);
    useEffect(()=>{

        function resizeWindow(){
            setWindow(window.innerWidth);
        }   
        window.addEventListener('resize',resizeWindow)
        return ()=>window.removeEventListener('resize',resizeWindow)
    })

    return windowsize;
}

export default useWindow