import css from "./index.module.css"
export function Text (props:any){
   return (
      props.eti == "h2" ? <h2 className={ css.h2}>{props.children}</h2>:<p style={props.long? {textAlign:"center", width:"50%",margin:"0",fontWeight:"600"}:{}}>{props.children}</p>
   )
}