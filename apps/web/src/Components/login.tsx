// import { useNavigate } from "react-router-dom"
const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';
export default function Login(){

  const google=()=>{
  window.open(`${BACKEND_URL}/auth/google`,'_self')
  }
  return <>
    <button onClick={google}>sign in with google</button>
  </>
}
