import React from 'react';
import ButtonAppBar from './ButtonAppBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import HomeComponent from './components/HomeComponent';
import LoginComponent from './LoginComponent';
import AddProjectComponent from './AddProjectComponent';
import HorizontalLinearStepper from './ViewProjectComponent'
// import RestaurantPage from './restaurantPage';
// import AboutMe from './aboutme';
// import Contact from './contact';
// import Projects from './projects';
// import Resume from './resume';


const Main = () => (
  <BrowserRouter>
    <ButtonAppBar />
    <Switch>
      {/* <Route exact path="/" component={HomeComponent} /> */}
      <Route path="/login" component={LoginComponent} />
      <Route path="/addProject" component={AddProjectComponent} />
      <Route path="/viewProject" component={HorizontalLinearStepper} />
      {/* <Route path="/contact" component={Contact} />
      <Route path="/projects" component={Projects} />
      <Route path="/resume" component={Resume} /> */}
    </Switch>
  </BrowserRouter>
)

export default Main;