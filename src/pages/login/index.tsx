import img from "../../img/login.png"
import { FormLogin } from "../../components/formLogin"
import css from "./index.module.css"
import {Text} from "../../ui/text"
export function Login (){
   return ( 
      <div className={css.contenedor}> 
         <img src={img} alt="" />
         <Text eti="h2">Login</Text>
         <FormLogin/>
      </div>
   )
}