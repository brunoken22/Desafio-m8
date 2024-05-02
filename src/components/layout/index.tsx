import {Outlet} from 'react-router-dom';
import {BarraNav} from '../barra-nav';
import css from './index.module.css';
import {init} from '../../lib/api';
import {useRecoilState} from 'recoil';
import {myreport, user} from '../../hook/hook';
import {useEffect} from 'react';

function Layout() {
  const [userValor, setUserValor] = useRecoilState(user);
  const [, setMyReports] = useRecoilState(myreport);

  useEffect(() => {
    const fetchData = async () => {
      const respuesta = await init();
      if (respuesta) {
        if (!userValor?.id) {
          setUserValor({
            id: respuesta.id,
            email: respuesta.email,
            fullName: respuesta.fullName,
          });
        }
        setMyReports(respuesta.Pets);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={` ${css.contenedor} `}>
        <BarraNav></BarraNav>
        <Outlet />
      </div>
    </>
  );
}

export {Layout};
