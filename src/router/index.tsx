import {Route, Routes} from 'react-router-dom';
import {Home} from '../pages/home/home';
import {Layout} from '../components/layout';
import {Pets} from '../pages/pets';
import {Login} from '../pages/login';
import {SingUp} from '../pages/singup';
import {MyData} from '../pages/myData';
import {MyReport} from '../pages/myReport';
import {NewReport} from '../pages/newReport';
import {ModReport} from '../pages/modReport';
import {
  ComponentProtect,
  ComponentProtectUser,
} from '../components/componentProtect';
import {useRecoilValue} from 'recoil';
import {user} from '../hook/hook';
function AppRouter() {
  const userData = useRecoilValue(user);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path='/pets'
          element={
            <ComponentProtect>
              <Pets />
            </ComponentProtect>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<SingUp />} />
        <Route element={<ComponentProtectUser userData={userData} />}>
          <Route path='/myData' element={<MyData />} />
          <Route path='/myReport' element={<MyReport />} />
          <Route path='/newReport' element={<NewReport />} />
          <Route path='/modReport' element={<ModReport />} />
        </Route>
      </Route>
    </Routes>
  );
}

export {AppRouter};
