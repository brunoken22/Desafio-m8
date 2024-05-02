import {useState, useEffect} from 'react';
import {Text} from '../../ui/text';
import {PetsCerca} from '../../components/petsCerca';
import css from './index.module.css';
import {useRecoilState, useRecoilValue} from 'recoil';
import {petsCerca} from '../../hook/hook';
import {getPetCerca, sendEmail} from '../../lib/api';

export function Pets() {
  const [pet, setPetId]: any = useState();
  const [openForm, setOpeForm]: any = useState(false);
  const data: any = useRecoilValue(petsCerca);
  const [, setPet] = useRecoilState(petsCerca);
  const handleInfo = ({id}: {id: string}) => {
    setOpeForm(true);
    const newData = data.find((item: any) => item.objectID == id);
    setPetId(newData);
  };

  const handleForm = (e: any) => {
    e.preventDefault();

    const newData = {
      namePet: pet.name,
      info: e.target.donde.value,
      tel: e.target.telefono.value,
      nombreRecib: e.target.nombre.value,
      email: pet.email,
      nombre: 'ejemplo',
    };
    sendEmail(newData).then((res) => {
      console.log(res);
      if (res.message == 'ok') {
        alert('Mensaje Enviado');
        location.reload();
      }
    });
  };

  useEffect(() => {
    const ubicacion: any = localStorage.getItem('ubi');
    const ubi = JSON.parse(ubicacion);
    if (ubi.lat) {
      getPetCerca(ubi.lat, ubi.lng).then((res) => {
        setPet(res[0].hits);
      });
    }
  }, []);
  return (
    <>
      <div style={{textAlign: 'center'}} className={css.contenedor}>
        <Text eti='h1'>Mascotas perdidas cerca</Text>
        <div className={css.pets}>
          {data
            ? data.map((item: any) => {
                return (
                  <PetsCerca
                    key={item.objectID}
                    report={handleInfo}
                    userId={item.objectID}
                    title={item.name}
                    lugar={item.lugar}
                    email={item.email}
                    img={item.img}
                  />
                );
              })
            : null}
        </div>
        {openForm ? (
          <div className={css.petss}>
            <form className={css.form} onSubmit={handleForm}>
              <div className={css.closes}>
                <button
                  type='button'
                  className='btn delete is-medium btn-xl'
                  onClick={() => setOpeForm(false)}></button>
              </div>
              <h2 className={css.h2}>
                Reportar info de {pet ? pet.name : 'undefined'}
              </h2>
              <div className='field'>
                <label htmlFor='nombre' className=''>
                  Nombre
                </label>
                <input
                  type='text'
                  className='input'
                  id='nombre'
                  placeholder=''
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='telefono' className=''>
                  Teléfono
                </label>
                <input
                  type='tel'
                  className='input'
                  id='telefono'
                  placeholder=''
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='donde' className=''>
                  Dónde lo viste?
                </label>
                <textarea
                  className='textarea'
                  id='donde'
                  rows={3}
                  required></textarea>
              </div>
              <div className='enviar' style={{textAlign: 'center'}}>
                {/* <Button btn="is-success" submit="submit" >Enviar Información</Button> */}
                <button className={`button is-success `} type='submit'>
                  Enviar Información
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}
