import img from '../../img/refer.png';
import {Button} from '../../ui/button';
import {Text} from '../../ui/text';
import css from './index.module.css';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
type Ubi = {
  lat: '';
  lng: '';
};
export function Home() {
  const nav = useNavigate();
  const handleCoor = (position: any) => {
    const ubi = {
      lat: position.latitude,
      lng: position.longitude,
    };
    localStorage.setItem('ubi', JSON.stringify(ubi));

    nav('/pets', {replace: true});
  };
  useEffect(() => {
    const ubicacion: any = localStorage.getItem('ubi');
    if (ubicacion) {
      const ubi: Ubi = JSON.parse(ubicacion);
      if (ubi.lat) {
        nav('/pets', {replace: true});
      }
    }
  }, []);
  return (
    <div className={`container text-center ${css.contenedor}`}>
      <img
        src={img}
        alt='Pet Finder'
        style={{minWidth: '150px', maxWidth: 'auto', height: 'auto'}}
      />
      <Text long={true} eti='h1'>
        Pet Finder
      </Text>
      <Text long={true}>
        Encontrá y reportá mascotas perdidas cerca de tu ubicación
      </Text>
      <div className={css.botones}>
        <Button btn='is-success' coordenadas={handleCoor}>
          Dar mi ubicación actual
        </Button>
        <Button btn='is-info'>¿Comó funciona Pet Finder?</Button>
      </div>
    </div>
  );
}
