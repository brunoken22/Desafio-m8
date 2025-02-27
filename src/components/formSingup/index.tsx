import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../lib/api';
import { user } from '../../hook/hook';
import { useRecoilState } from 'recoil';
import css from './index.module.css';
import { useState } from 'react';
import { Loader } from '../loader';
export function FormSingUp() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [, setDataUser] = useRecoilState(user);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      fullName: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    auth(newUser).then((res) => {
      setDataUser(res);
      setLoading(false);

      if (res) {
        alert('Cuenta creada');
        nav('/login', { replace: true });
      }
    });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className='mb-3'>
        <Label name='name'>Nombre</Label>
        <Input type='text' input='name' />
      </div>
      <div className='mb-3'>
        <Label name='email'>Email</Label>
        <Input type='email' input='email' />
      </div>
      <div className='mb-3'>
        <Label name='password'>Contraseña</Label>
        <Input type='password' input='password' />
      </div>
      <div className='mb-3'>
        <Label name='rePassword'>Repetir contraseña</Label>
        <Input type='password' input='rePassword' />
      </div>
      <button type='submit' className='button is-success'>
        Siguente
      </button>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Ya tenes una cuenta?{' '}
        <Link to='/login' style={{ color: 'green' }}>
          Inicar sesión
        </Link>
      </p>
    </form>
  );
}
