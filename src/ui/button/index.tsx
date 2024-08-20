
export function Button(props:any){
   const handleClick =(e:any)=>{
      e.preventDefault()        
      if(props.report){
         props.report(e.target)
      }
      if(props.coordenadas){
         navigator.geolocation.getCurrentPosition((position)=>{
            props.coordenadas(position.coords)
         })
      }
      if(props.enviar){
         props.enviar(e.target)
      }
   }
   return (
      <button onClick={handleClick} type={props.submit} id={props.ids} className={ `button ${props.btn} ${props.size && ""}` }>{props.children}</button>
   )
}