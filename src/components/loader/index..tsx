import css from "./loader.module.css"
export function Loader (){
   console.log(css);
   
   return (
      // <span className={css.loader}></span>
      <div className={css.prueba}>Cargando</div>
   )
}