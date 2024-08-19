import css from '../newReport/index.module.css';
import {initMapbox, geocoder} from '../newReport/mapbox';
import {useState} from 'react';
import {initDropzone} from '../newReport/dropzone';
import {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import {modPet} from '../../hook/hook';
import {useRecoilValue} from 'recoil';
import {modiPet} from '../../lib/api';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '../../ui/button';
import cssUbi from './index.module.css';
import {Loader} from '../../components/loader';
import 'mapbox-gl/dist/mapbox-gl.css';

export function ModReport() {
  const [loading, setLoading] = useState(false);
  const [activeUbi, setActiveUbi] = useState(false);
  const nav = useNavigate();
  const pet = useRecoilValue(modPet);
  const foto: any = useRef();
  const subirFoto: any = useRef();
  const mapbox: any = useRef();
  const searchMapbox: any = useRef();
  const [data, setData] = useState({
    dataAGuardar: {lugar: '', lat: '', lng: ''},
    dataUrl: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newD = {
      name: e?.target?.name?.value,
      lugar: data?.dataAGuardar.lugar,
      img: data.dataUrl,
      lat: data.dataAGuardar.lat,
      lng: data.dataAGuardar.lng,
    };
    lastData(newD);
    modiPet(
      {
        name: e?.target?.name?.value,
        lugar: data?.dataAGuardar.lugar,
        img: newD.img || data.dataUrl,
        lat: data.dataAGuardar.lat,
        lng: data.dataAGuardar.lng,
      },
      Number(pet.id)
    ).then(() => {
      setLoading(false);
      alert('Modificado');
      nav('/myReport', {replace: true});
    });
  };
  function lastData(newData: any) {
    if (!newData) {
      throw 'Error';
    }
    if (!newData.lugar) {
      data.dataAGuardar['lugar'] = pet.lugar;
    }
    if (!newData.dataUrrl) {
      data['dataUrl'] = pet.img;
    }
    if (!newData.lat) {
      data.dataAGuardar['lat'] = pet.lat.toString();
    }
    if (!newData.lng) {
      data.dataAGuardar['lng'] = pet.lng.toString();
    }
  }
  useEffect(() => {
    const ubi = JSON.parse(localStorage.getItem('ubi')!);

    if (!ubi) {
      return setActiveUbi(true);
    }
    dataDropzone(subirFoto.current);
    const map = initMapbox(mapbox.current, [pet.lng, pet.lat]);
    searchMapbox.current.appendChild(geocoder.onAdd(map));
    geocoder.setInput(pet.lugar);
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
  }, [activeUbi]);

  function dataDropzone(btn: any) {
    // const imgPet: any = that.querySelector(".imagen");
    const myDropzone = initDropzone(btn);
    myDropzone.on('thumbnail', function (file) {
      // imgPet.src = file.dataURL;
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
        dataUrl: file.dataURL!,
      }));
    });
  }
  const handleCoor = (position: any) => {
    setActiveUbi(false);
    const ubi = {
      lat: position.latitude,
      lng: position.longitude,
    };
    localStorage.setItem('ubi', JSON.stringify(ubi));
  };
  return (
    <div className={css.container}>
      <div className={css.container2}>
        <h2 className={css.titulo}>Reporta Mascota</h2>
        <form className='formulario' onSubmit={handleSubmit}>
          <div className='report__form'>
            <div className='mb-3'>
              <label htmlFor='name' className='label form-label'>
                Nombre
              </label>
              <input
                type='text'
                className='input form-control name-input'
                id='name'
                defaultValue={pet.name}
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
                  src={pet.img}
                  alt=''
                  width='180px'
                  height='175px'
                  className={`${css.img}`}
                  ref={foto}
                />
              </div>
            </div>
            <div className={css.mapa}>
              <div
                className={css.geocoder}
                ref={mapbox}
                style={{height: '250px'}}></div>
              <div
                ref={searchMapbox}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}></div>
            </div>
            <div className={css.buttonReportar}>
              <button type='submit' className={` button is-success`}>
                Reportar
              </button>
            </div>
          </div>
        </form>
      </div>
      {activeUbi ? (
        <div className={cssUbi.containerUbi}>
          <div className={cssUbi.containerFormUbi}>
            <h2 className={cssUbi.title}>Es necesario la ubicación</h2>
            <div className={cssUbi.buttons}>
              <Button btn='is-success' coordenadas={handleCoor}>
                Dar ubicación
              </Button>
              <Link className='button is-danger' to='/myReport'>
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      {loading && <Loader />}
    </div>
  );
}
