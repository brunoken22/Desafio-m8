import { MyPets } from "../../components/myReport"
import {myreport,user} from "../../hook/hook"
import { useRecoilValue } from "recoil"
import css from "./index.module.css"
import { useEffect, useRef } from "react"
export function MyReport(){
   const comprobar:any = useRef();
   const container:any = useRef();
   const myReports= useRecoilValue(myreport)
   const data= useRecoilValue(user)

   
   useEffect(()=>{
      if(!data.email){
         comprobar.current.style.display = "flex"
         container.current.style.display = "none"
      }else{
         comprobar.current.style.display = "none"
         container.current.style.display = "block"
      }

   },[data])
   return (
      <>
         <div className="com" style={{display:"none"}} ref={comprobar}>
            <h2 className={css.comprobar}>Ingrese a una cuenta o registrese</h2>
         </div>
         <div className={css.container} ref={container}>
            <h1 className={css.titulo}>Mascotas Reportadas</h1>
            <div className={css.pets}> 
               {myReports?myReports.map((item:any)=>{
                  return <MyPets ubi={[item.lat,item.lng]} key={item.id} id={item.id} name={item.name} img={item.img} lugar={item.lugar}></MyPets>
               }):null}
            </div>
         </div>
      </>
   )
} 