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
function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/pets' element={<Pets />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<SingUp />} />
        <Route path='/myData' element={<MyData />} />
        <Route path='/myReport' element={<MyReport />} />
        <Route path='/newReport' element={<NewReport />} />
        <Route path='/modReport' element={<ModReport />} />
      </Route>
    </Routes>
  );
}

export {AppRouter};
