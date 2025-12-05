import { useEffect, useState } from "react"
const BACKEND_URL=import.meta.env.VITE_APP_BACKEND_URL||'http://localhost:3000'
export default function Dashboard(){
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    async function getsession(){
    const response=await fetch(`${BACKEND_URL}/auth/refresh`)
    if(response.ok){
      console.log(response);
    }
      setloading(false);
    }
    getsession();
  },[])
  if (loading) return <>loading...</>;
  return <>
    dash
  </>
}
