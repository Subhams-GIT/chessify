'use client'
const BACKEND_URL = "http://localhost:4000";
export default function Page() {
  const google = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };
  return (
    <>
      <button onClick={google}>sign in with google</button>
    </>
  );
}
