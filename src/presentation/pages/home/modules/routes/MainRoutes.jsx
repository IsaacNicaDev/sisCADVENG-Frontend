// project imports
//import MainLayout from '../layout/MainLayout/index';

import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';


//import Login from '../views/pages/authentication/authentication/Login';
import Home from '../../Home';
import Dashboard from '../../../../dashboard/Dashboard';
import { DistrictList, MaritalStatusList, ZoneList } from '../../../../../app/modules/catalogs';
import {LocationList} from '../../../../../app/modules/core';
// ======|| MAIN ROUTING ||====== //

const MainRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <LocationList />,
        },
        {
            path: 'sign-in/',
            element: <SignIn />,
        },
        {
            path: 'sign-up/',
            element: <SignUp />,
        },
        {
            path: '*',
            element: <>NO FOUND</>,

        },
    ]
};

export default MainRoutes;
