import {createRoot}  from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import {Suspense} from "react"
import {AppRouter } from "./router"
import { Loader } from "./components/loader/index.";
import {
   RecoilRoot,
 } from 'recoil';
 
function App (){
   
   return (
      <RecoilRoot >
         <Suspense fallback={<Loader/>}>
            <BrowserRouter><AppRouter /></BrowserRouter>
         </Suspense>
      </RecoilRoot>
   )
}
const root = createRoot(document.getElementById('root')!);
root.render(<App/>);
