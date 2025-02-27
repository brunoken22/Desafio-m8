import TemplatePets from '../../components/templatePets';
import { modPet, myreport, user } from '../../hook/hook';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import css from './index.module.css';

export function MyReport() {
  const nav = useNavigate();
  const myReports = useRecoilValue(myreport);
  const setPet = useSetRecoilState(modPet);
  const data = useRecoilValue(user);
  return data?.id ? (
    <div className={css.container}>
      <h1 className={css.titulo}>Mascotas Reportadas</h1>
      <div className={css.pets}>
        {myReports.length ? (
          myReports.map((item: any) => {
            return (
              <TemplatePets
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.img}
                lugar={item.lugar}
                handleEditar={() => {
                  setPet(item);
                  nav('/modReport', { replace: true });
                }}
                handleBorrar={async () => {
                  const deletePet = await import('../../lib/api');
                  deletePet.deletePet(item.id).then(() => {
                    alert('Eliminado');
                  });
                }}
                report={false}></TemplatePets>
            );
          })
        ) : (
          <div className={css.newReport}>
            <p>No tenes mascotas reportadas</p>
            <Link to={'/newReport'} className='button is-info'>
              Reportar mascota
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className='container'>
      <h2 className={css.comprobar}>Ingrese a una cuenta o registrese</h2>
    </div>
  );
}
