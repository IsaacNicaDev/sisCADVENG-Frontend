import { Route, Routes } from "react-router-dom";
import GendersList from "../../app/modules/catalogs/gender/GenderList";
import { MaritalStatusList } from "../../app/modules/catalogs/maritalStatus";
import { ProfessorList } from "../../app/modules/core";
import { LocationList } from "../../app/modules/core";

export default function Content() {
  return (
    <div className="content-wrapper">
       <Routes>
            <Route path='/sexo' element={<GendersList/>}/>
            <Route path='/professor' element={<ProfessorList/>}/>
            <Route path='/location' element={<LocationList/>}/>
            <Route path='/maritalStatus' element={<MaritalStatusList/>}/>
            
         </Routes>
    </div>
  )
}