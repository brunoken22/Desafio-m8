// import  bootstrap from "bootstrap/dist/css/bootstrap.min.css"

export function Input(props:any){
   return (
      <input className="input" type={props.type} name={props.input} id={props.input} required/>
   )
}