import {user} from "../../hook/hook"
import { useRecoilState } from "recoil"
import css from "./index.module.css"
import { useEffect, useRef } from "react"
import { modificar } from "../../lib/api"
export function MyData(){
   const [userData,] = useRecoilState(user)
   const modContra:any = useRef()
   const modDatos:any = useRef();
   const fullName:any = useRef();
   const comprobar:any = useRef();
   const container:any = useRef();
   const email:any = useRef();
   const contraseña:any = useRef([]);
   const recontraseña:any = useRef([]);

   const handleModContra = (e:any)=>{
      e.preventDefault()
      modContra.current.style.display= "flex";
      modDatos.current.style.display= "none";
   }
   const handleModDato = (e:any)=>{
      e.preventDefault()
      modContra.current.style.display= "none";
      modDatos.current.style.display= "flex";
   }
   const handleMod = (e:any)=>{
      e.preventDefault();
      const newContraseña = contraseña.current.value === recontraseña.current.value ? recontraseña.current.value:null  
      const newData = {
         fullName:fullName.current.value,
         email:email.current.value,
         password:newContraseña
      }
      modificar(newData,userData.id).then(()=>{
         alert("Actualizado")  
      })
   }  
   useEffect(()=>{
      if(!userData.email){
         comprobar.current.style.display = "flex"
         container.current.style.display = "none"
      }else{
         comprobar.current.style.display = "none"
         container.current.style.display = "flex"
      }
   },[userData])
   return (
      <>
          <div className="com" style={{display:"none"}} ref={comprobar}>
            <h2 className={css.comprobar}>Ingrese a una cuenta o registrese</h2>
         </div>
            <div className={css.container} ref={container}>
            <h1 style={{textAlign:"center",fontSize:"2rem"}}>Mis Datos</h1>
            <div className="datos-personales" style={{display:"none",flexDirection:"column"}} ref={modDatos}>
               <div className="mb-3">
                  <label htmlFor="email" className="label">Email</label>
                  <input type="email" className="input email-value" id="email"  defaultValue ={userData.email} ref={email}/>
               </div>
               <div className="mb-3">
                  <label htmlFor="name" className="label">Nombre</label>
                  <input type="text" className="input name-value" id="name" defaultValue ={userData.fullName} ref={fullName}/>
               </div>
               <button type="submit" className="button is-success actu-dato" onClick={handleMod}>Actualizar</button>
            </div>
            <div className="" style={{display:"none",flexDirection:"column"}} ref={modContra}>
               <div className="mb-3">
                  <label htmlFor="contraseña" className="label" >Contraseña</label>
                  <input type="password" className="input password-value" id="contraseña" ref={contraseña}/>
               </div>
               <div className="mb-3">
                  <label htmlFor="repetir-contraseña" className="label">Repetir contraseña</label>
                  <input type="password" className="input" id="repetir-contraseña" ref={recontraseña} />
               </div>
               <button type="submit" className="button is-success actu-pass" onClick={handleMod}>Actualizar</button>
            </div>
            <div className={css.botones} >
               <button className="button is-info"  onClick={handleModDato} >Modificar datos personales</button>
               <button className="button is-info"  onClick={handleModContra}>Modificar contraseña</button>
            </div>
       
         </div>
      </>
   )
}