
export function Label (props:any){
   
   return (
      <label htmlFor={props.name} className="label" >{props.children} </label>
   )
}