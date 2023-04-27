// project imports
//import MainLayout from '../layout/MainLayout/index';

import GenderForm from '../models/catalogs/GenderForm';
import GenderList from '../models/catalogs/GenderList';
import GendersList from '../models/catalogs/GendersList';


//import Login from '../views/pages/authentication/authentication/Login';
import Home from '../views/pages/home/Home';

// ==============================|| MAIN ROUTING ||============================== //
// ==============================|| RUTA PRINCIPAL ||============================== //

const MainRoutes = {
    path: '/',
    element: <Home />,
    children: [

        {
            path: 'gender-list',
            element: <GenderList />
        },
        {
            path: 'create-gender',
            element: <GenderForm />
        },
        {
            path: '/edit-gender/:id',
            element: <GenderForm />
        },
        {
            path:'*',
            element: <>NO FOUND</>

        }
    ]
};

export default MainRoutes;
