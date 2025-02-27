import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../../img/logo.png';
import css from './index.module.css';
import { user } from '../../hook/hook';
import { useRecoilValue } from 'recoil';
import { cerrarSesion } from '../../lib/api';
export function BarraNav() {
  const data = useRecoilValue(user);
  const cerrarLogin = React.useRef<any>(null);
  const login = React.useRef<any>(null);
  const menu = React.useRef<any>(null);
  const burger = React.useRef<any>(null);
  const handleToogle = (e: any) => {
    e.preventDefault();
    const bugerv = burger.current as HTMLElement;
    const menuToggle = menu.current as HTMLElement;
    bugerv.classList.toggle('is-active');
    menuToggle.classList.toggle('is-active');
  };
  const handleCerrarSesion = (e: any) => {
    e.preventDefault();
    cerrarSesion();
    location.reload();
  };
  useEffect(() => {
    if (data?.id) {
      login.current.style.display = 'none';
      cerrarLogin.current.style.display = 'flex';
    }
  }, [data]);
  return (
    <>
      <nav className='navbar is-dark' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='inicio navbar-item' to='/'>
            <img src={img} height='28' alt='logo' />
          </Link>

          <a
            href='#'
            onClick={handleToogle}
            ref={burger}
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div id='navbarBasicExample' className='navbar-menu' ref={menu}>
          <div className={`navbar-start ${css.start}`}>
            <Link to={'/myData'} className='navbar-item datos'>
              Mis datos
            </Link>

            <Link to={'/myReport'} className='navbar-item reportes'>
              Masctotas reportadas
            </Link>

            <Link to={'/newReport'} className='navbar-item reportar'>
              Reportar masctotas
            </Link>
          </div>

          <div className='navbar-end' ref={login}>
            <div className='navbar-item'>
              <div className={css.buttons}>
                <Link to='/singup' className='button is-primary singup'>
                  <strong>Crear cuenta</strong>
                </Link>
                <Link to='/login' className='button is-light login '>
                  Inicar sesión
                </Link>
              </div>
            </div>
          </div>
          <div
            className={css.cerrar}
            style={{
              display: 'none',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            ref={cerrarLogin}>
            <a className='btn-cerrar button is-danger is-rounded' onClick={handleCerrarSesion}>
              Cerrar Sesión{' '}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
