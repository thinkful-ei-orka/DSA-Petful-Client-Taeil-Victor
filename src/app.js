import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/home';
import AdoptAPet from './pages/adoptAPet';
import SuccessStories from './pages/successStories';
import ManagePets from './pages/managePets';
import AddPet from './pages/addPet';

function App() {
  return <>
    <BrowserRouter>
      <Route path="/" component={Home}></Route>
      <Route path="/adopt-a-pet" component={AdoptAPet}></Route>
      <Route path="/success-stories" component={SuccessStories}></Route>
      <Route path="/manage-pets" component={ManagePets}></Route>
      <Route path="/add-pet" component={AddPet}></Route>
    </BrowserRouter>
  </>;
}

export default App;
