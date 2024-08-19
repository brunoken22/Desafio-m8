import {useState, useEffect} from 'react';
import {Text} from '../../ui/text';
import css from './index.module.css';
import {useRecoilState} from 'recoil';
import {petsCerca} from '../../hook/hook';
import {getPetCerca, sendEmail} from '../../lib/api';
import TemplatePets from '../../components/templatePets';

export function Pets() {
  const [pet, setPetId]: any = useState();
  const [openForm, setOpeForm]: any = useState(false);
  const [pets, setPet] = useRecoilState(petsCerca);

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
          {pets
            ? pets.map((item: any) => {
                return (
                  <TemplatePets
                    key={item.objectID}
                    report={true}
                    handleReport={() => {
                      setOpeForm(true);
                      setPetId(item);
                    }}
                    id={item.objectID}
                    name={item.name}
                    lugar={item.lugar}
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
                  className={`textarea ${css.textarea}`}
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
