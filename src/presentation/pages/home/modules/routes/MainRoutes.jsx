// project imports
//import MainLayout from '../layout/MainLayout/index';

//import GenderForm from '../../../../../models/catalogs/GenderForm';
//import GenderList from '../../../../../models/catalogs/GenderList';
//import GendersList from '../models/catalogs/GendersList';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';


//import Login from '../views/pages/authentication/authentication/Login';
import Home from '../../Home';
import Dashboard from '../../../../dashboard/Dashboard';
import GenderList from '../../../../../app/modules/catalogs/gender/GenderList';
import { GradeList } from '../../../../../app/modules/catalogs';
// ======|| MAIN ROUTING ||====== //

const MainRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <GradeList />,
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
