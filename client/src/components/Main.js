import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import HomePage from './homePage';
// import RestaurantPage from './restaurantPage';
// import AboutMe from './aboutme';
// import Contact from './contact';
// import Projects from './projects';
// import Resume from './resume';


const Main = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={HomePage} />
      <Route path="/restaurant/:id" component={RestaurantPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/projects" component={Projects} />
      <Route path="/resume" component={Resume} /> */}
    </Switch>
  </BrowserRouter>
)

export default Main;