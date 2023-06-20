// project imports
//import MainLayout from '../layout/MainLayout/index';

import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';


//import Login from '../views/pages/authentication/authentication/Login';
import Home from '../../Home';
import Dashboard from '../../../../dashboard/Dashboard';
import { ShiftList } from '../../../../../app/modules/catalogs';
// ======|| MAIN ROUTING ||====== //

const MainRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <ShiftList />,
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
