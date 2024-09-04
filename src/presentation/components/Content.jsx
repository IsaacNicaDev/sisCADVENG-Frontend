import { Route, Routes } from "react-router-dom";
import GendersList from "../../app/modules/catalogs/gender/GenderList";
import { LocationList } from "../../app/modules/core";

export default function Content() {
  return (
    <div className="content-wrapper">
       <Routes>
            <Route path='/sexo' element={<GendersList/>}/>
            <Route path='/localizacion' element={<LocationList/>}/>
            
         </Routes>
    </div>
  )
}