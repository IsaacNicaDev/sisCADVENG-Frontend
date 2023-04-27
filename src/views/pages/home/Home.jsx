import React, { Fragment } from "react";
import withRoot from "./modules/withRoot";

// components
import NavbarView from "./modules/views/NavbarView";

import ProductHero from "./modules/views/ProductHero";
//import ProductValues from "./modules/views/ProductValues";
//import ProductCategories from "./modules/views/ProductCategories";
//import ProductHowItWorks from "./modules/views/ProductHowItWorks";
//import ProductCTA from "./modules/views/ProductCTA";
//import ProductSmokingHero from "./modules/views/ProductSmokingHero";
//import AppFooter from "./modules/views/AppFooter";

const Home = () => (
  <Fragment>
    <NavbarView />
    <ProductHero />
  </Fragment>
);
export default withRoot(Home);
