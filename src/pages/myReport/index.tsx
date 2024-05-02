import {MyPets} from '../../components/myReport';
import {myreport, user} from '../../hook/hook';
import {useRecoilValue} from 'recoil';
import css from './index.module.css';
export function MyReport() {
  const myReports = useRecoilValue(myreport);
  const data = useRecoilValue(user);

  return data?.id ? (
    <div className={css.container}>
      <h1 className={css.titulo}>Mascotas Reportadas</h1>
      <div className={css.pets}>
        {myReports
          ? myReports.map((item: any) => {
              return (
                <MyPets
                  ubi={[item.lat, item.lng]}
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  img={item.img}
                  lugar={item.lugar}></MyPets>
              );
            })
          : null}
      </div>
    </div>
  ) : (
    <div className='com'>
      <h2 className={css.comprobar}>Ingrese a una cuenta o registrese</h2>
    </div>
  );
}
