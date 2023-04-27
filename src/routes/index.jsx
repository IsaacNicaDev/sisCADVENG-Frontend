import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
//import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
// ==============================|| RENDER DE ENRUTAMIENTO ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes]);
}
