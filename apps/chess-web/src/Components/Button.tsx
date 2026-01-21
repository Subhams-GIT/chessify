import React from "react"

const Button = (props:{children:React.ReactNode,callback:(data:string|null)=>void,styles:string}) => {
  return (
    <div>
        <button onClick={()=>props.callback(null)} className={props.styles}>{props.children}</button>
    </div>
  )
}

export default Button