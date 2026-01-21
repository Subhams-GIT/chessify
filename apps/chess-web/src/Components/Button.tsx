import React from "react"

const Button = (props:{children:React.ReactNode,callback:(data:string|undefined)=>void,styles:string}) => {
  return (
    <div>
        <button onClick={()=>props.callback} className={props.styles}>{props.children}</button>
    </div>
  )
}

export default Button