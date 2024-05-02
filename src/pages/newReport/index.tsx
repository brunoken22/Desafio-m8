import css from './index.module.css';
import {initMapbox, geocoder} from './mapbox';
import {useState} from 'react';
import {initDropzone} from './dropzone';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useRef} from 'react';
import * as mapboxgl from 'mapbox-gl';
import {createPet} from '../../lib/api';
import {user} from '../../hook/hook';
import {useRecoilValue} from 'recoil';
import {useNavigate} from 'react-router-dom';
export function NewReport() {
  const router = useNavigate();
  const [connectedOnce, setConnectedOnce] = useState(false);
  const userDato = useRecoilValue(user);
  const foto: any = useRef();
  const subirFoto: any = useRef();
  const mapbox: any = useRef();
  const searchMapbox: any = useRef();
  const [data, setData] = useState({
    dataAGuardar: {lugar: '', lat: '', lng: ''},
    dataUrl: '',
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    createPet({
      name: e.target.name.value,
      email: userDato.email,
      lugar: data?.dataAGuardar.lugar,
      img: data.dataUrl,
      lat: data.dataAGuardar.lat,
      lng: data.dataAGuardar.lng,
      token: JSON.parse(localStorage.getItem('token')!),
    }).then((response) => {
      if (response.message) {
        return alert(response.message);
      }
      router('/myReport');
    });
  };

  useEffect(() => {
    if (
      subirFoto?.current &&
      mapbox?.current &&
      searchMapbox?.current &&
      !connectedOnce
    ) {
      setConnectedOnce(true);
      const ubi = JSON.parse(localStorage.getItem('ubi')!);
      dataDropzone(subirFoto.current);
      if (ubi) {
        const map = initMapbox(mapbox.current, [ubi.lng, ubi.lat]);
        searchMapbox.current.appendChild(geocoder.onAdd(map));
        geocoder.on('result', function (e) {
          const result = e.result;
          const [lng, lat] = result.geometry.coordinates;
          new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
          map.setCenter([lng, lat]);
          map.setZoom(14);
          const dataAGuardar = {lugar: '', lng: '', lat: ''};
          dataAGuardar['lugar'] = result.place_name;
          dataAGuardar['lng'] = lng;
          dataAGuardar['lat'] = lat;

          setData((prevState) => ({
            ...prevState,
            dataAGuardar,
          }));
        });
      }
    }
  }, [userDato]);
  function dataDropzone(btn: any) {
    const myDropzone = initDropzone(btn);
    myDropzone.on('thumbnail', function (file) {
      const component = document
        .querySelector('.dz-preview')!
        .querySelectorAll('div');

      for (let el of component) {
        el.style.display = 'none';
      }
      foto.current.src = file.dataURL;
      foto.current.style.display = 'block';
      setData((prevState) => ({
        ...prevState,
        dataUrl: file?.dataURL!,
      }));
    });
  }

  return (
    <div className={css.container}>
      {userDato && userDato?.id ? (
        <div className={css.container2}>
          <h2 className={css.titulo}>Reporta Mascota</h2>
          <form className={css.formulario} onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className=' form-label'>
                Nombre
              </label>
              <input
                type='text'
                className='input form-control name-input'
                id='name'
                placeholder='Bobby'
                required
              />
            </div>
            <div className={css.img}>
              <div
                className='button is-link is-light'
                aria-required
                ref={subirFoto}>
                Subir Foto
              </div>
              <div className='text-center'>
                <img
                  src='#'
                  alt=''
                  width='180px'
                  height='175px'
                  style={{display: 'none'}}
                  ref={foto}
                />
              </div>
            </div>
            <div className={css.mapa}>
              <div
                className={css.geocoder}
                ref={mapbox}
                style={{height: '250px'}}></div>
              <div ref={searchMapbox} style={{width: '100%'}}></div>
            </div>
            <div className={`${css.buttonReportar} d-grid gap-2`}>
              <button
                type='submit'
                className={`${css.button} button is-success`}>
                Reportar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='com'>
          <h2 className={css.comprobar}>Ingrese a una cuenta o registrese</h2>
        </div>
      )}
    </div>
  );
}
