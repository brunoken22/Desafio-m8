import css from "./index.module.css"
import { deletePet } from "../../lib/api";
import   { useNavigate } from "react-router-dom";
import { modPet } from "../../hook/hook";
import {useRecoilState} from "recoil"
 "react-router-dom"
export function MyPets(props:any){
   const nav = useNavigate()
   const [,setPet] = useRecoilState(modPet)
   const handleEditar = (e:any)=>{
      e.preventDefault();
      setPet(props)
      nav("/modReport",{replace:true})
   }
   const handleBorrar = (e:any)=>{
      e.preventDefault();
      deletePet(props.id).then(()=>{
         alert("Eliminado")
         location.reload()
      })
   }

   return (
      <div id=""  className={css.cardInfo} style={{width: "18rem"}}>
         <figure className="image is-3by2">
            <img src={props.img} alt="" className="img"/>
         </figure>
         <div className={css.card}>
            <h5 className="title is-4 nombre" >{props.name}</h5>
            <p className="subtitle is-6" >{props.lugar}</p>
            <div className={css.botones} >
               <button onClick={handleEditar} className="editar button is-info">Editar</button>
               <button onClick={handleBorrar} className="borrar button is-danger">Eliminar</button>
            </div>
         </div>
      </div>
   )
}

