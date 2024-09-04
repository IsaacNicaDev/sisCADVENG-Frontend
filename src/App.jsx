import React from 'react';
// routing
//import Routes from '../src/routes';
//import Home from './views/pages/home/Home'
//import Routes from './presentation/pages/home/modules/routes'

import Header from './presentation/components/Header';
import Aside from './presentation/components/Aside';
import Content from './presentation/components/Content';
import Footer from './presentation/components/Footer';


const App = () => {
    return (
        <>
         <Header/>
         <Aside/>
         <Content/>
         <Footer/>
        </>
    );
};

export default App;
