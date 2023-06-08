import css from "./index.module.css"
import { initMapbox, geocoder} from "./mapbox";
import { useState } from "react";
import { initDropzone } from "./dropzone";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import { createPet } from "../../lib/api";
import { user} from "../../hook/hook"
import { useRecoilState } from "recoil";

export function NewReport(){
   const [userDato,] = useRecoilState(user)
   const  foto:any = useRef()
   const  subirFoto:any = useRef()
   const  mapbox:any = useRef()
   const  searchMapbox:any = useRef()
   const comprobar:any = useRef();
   const container:any = useRef();
   const [data,setData]=useState({dataAGuardar:{lugar:"",lat:"",lng:""},dataUrl:""})
   const handleSubmit = (e:any)=>{
      e.preventDefault();
      createPet({
         name: e.target.name.value,
         email:userDato.email,
         lugar: data?.dataAGuardar.lugar,
         img: data.dataUrl,
         lat:data.dataAGuardar.lat,
         lng:data.dataAGuardar.lng,
      },Number(userDato.id)).then(()=>{
         alert("Reportado")
         location.reload()
      })
   }
    
   useEffect(()=>{
      
      const ubi = JSON.parse(localStorage.getItem("ubi")!);
      dataDropzone(subirFoto.current);
      if(ubi){
         const map = initMapbox(mapbox.current,[ubi.lng,ubi.lat]);
         searchMapbox.current.appendChild(geocoder.onAdd(map));
         geocoder.on("result", function (e) {
            const result = e.result;
            const [lng, lat] = result.geometry.coordinates;
            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
            map.setCenter([lng, lat]);
            map.setZoom(14);
            const dataAGuardar={lugar:"",lng:"",lat:""}
            dataAGuardar["lugar"] = result.place_name;
            dataAGuardar["lng"] = lng;
            dataAGuardar["lat"] = lat;
   
            setData((prevState )=>({
               ...prevState,
               dataAGuardar
            }))
            
         });
      }
    

   },[])
 
   useEffect(()=>{
      if(!userDato.email){
         comprobar.current.style.display = "flex"
         container.current.style.display = "none"
      }else{
         comprobar.current.style.display = "none"
         container.current.style.display = "block"
      }
   },[userDato])
    
   function dataDropzone(btn:any) {
      // const imgPet: any = that.querySelector(".imagen");
      const myDropzone = initDropzone(btn);
      myDropzone.on("thumbnail", function (file) {
         // imgPet.src = file.dataURL;
         const component = document
            .querySelector(".dz-preview")!
            .querySelectorAll("div");

         for (let el of component) {
            el.style.display = "none";
         }
         foto.current.src = file.dataURL;
         foto.current.style.display = "block";
         setData((prevState )=>({
            ...prevState,
            dataUrl:file?.dataURL !
         }))
         // console.log(file.dataURL);
         // setData({dataUrl:file.dataURL})
         // dataAGuardar["dataUrl"] = file.dataURL;
      });
   }
   return (
      <>
      <div className={css.container} >
      <div className="com" style={{display:"none"}} ref={comprobar}>
         <h2 className={css.comprobar}>Ingrese a una cuenta o registrese</h2>
      </div>
         <div className={css.container2} ref={container}>
         <h2 className={css.titulo}>Reporta Mascota</h2>
         <form className="formulario" onSubmit={handleSubmit}>
            <div className="report__form">
               <div className="mb-3">
                  <label htmlFor="name" className="label form-label">Nombre</label>
                  <input type="text" className="input form-control name-input" id="name" placeholder="Bobby" required/>
               </div>
               <div className={css.img}>   
                  <div className="button is-link is-light" aria-required  ref={subirFoto}>Subir Foto</div>
                     <div className="text-center">
                        <img src="#" alt="" width="180px" height="175px" style={{display: "none"}} ref={foto}  />
                     </div>
                  </div>
                  <div className={css.mapa}>
                     <div className={css.geocoder} ref={mapbox} style={{height:"250px"}}></div>
                     <div ref={searchMapbox} style={{width:"100%"}}></div>
                  </div>
               <div className={css.buttonReportar}>
                  <button type="submit" className={` button is-success`}>Reportar</button>
               </div>
            </div>
         </form>
         </div>
      </div>
      </>
   )
}
                  // <Map
                  //    style="mapbox://styles/mapbox/streets-v9"
                  //    containerStyle={{
                  //       height: "300px",
                  //       width: "100%",
                  //    }}
                  //    zoom={[15]}
                  //    center={[-0.481747846041145, 51.3233379650232]}
                  //    movingMethod="easeTo"
                  //    >
                  //    <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                  //       <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                  //    </Layer>
                  // </Map>