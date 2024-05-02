import {Outlet} from 'react-router-dom';
import {BarraNav} from '../barra-nav';
import css from './index.module.css';
import {init} from '../../lib/api';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {myreport, user} from '../../hook/hook';
function Layout() {
  const [, setUserValor] = useRecoilState(user);
  const [, setMyReports] = useRecoilState(myreport);

  useEffect(() => {
    init().then((respuesta) => {
      if (respuesta.user) {
        setUserValor(respuesta.user);
        setMyReports(respuesta.pet);
      }
    });
  }, [user, myreport]);

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
