import {useRef} from 'react';
import {Link} from 'react-router-dom';
import css from './index.module.css';
import {singin} from '../../lib/api';
import {user, token} from '../../hook/hook';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';

export function FormLogin() {
  const nav = useNavigate();
  const email: any = useRef();
  const password: any = useRef();
  const [, setDataUser] = useRecoilState(user);
  const [, setTokenInit] = useRecoilState(token);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    singin(data.email, data.password).then((respuesta) => {
      if (respuesta.message == 'Incorreto') {
        alert('Contraseña o usuario incorrecto');
        return;
      }
      setDataUser(respuesta.auth);
      setTokenInit(respuesta.token);

      localStorage.setItem('token', JSON.stringify(respuesta.token));
      nav('/myData', {replace: true});
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className='field'>
        <label className='email' htmlFor='email'>
          Email
        </label>
        <div className='control'>
          <input
            className='input'
            type='email'
            name='email'
            id='email'
            placeholder='bruno_am_22@...'
            ref={email}
          />
        </div>
      </div>
      <div className='field'>
        <label className='password' htmlFor='pass'>
          Contraseña
        </label>
        <div className='control'>
          <input
            className='input'
            type='password'
            name='pass'
            id='pass'
            placeholder='****'
            ref={password}
          />
        </div>
        <a href='#' style={{color: '#000'}}>
          Olvidasates contraseña?
        </a>
      </div>
      <div className='control d-grid gap-2'>
        <button type='submit' className='button is-success  is-fullwidth'>
          Ingresar
        </button>
      </div>
      <p style={{textAlign: 'center', marginTop: '1rem'}}>
        Aún no tienes cuenta?{' '}
        <Link to='/singup' style={{color: '#000'}}>
          Registrate
        </Link>
      </p>
    </form>
  );
}
