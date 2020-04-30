import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Arcane from '../containers/Arcane';
import AddOp from '../containers/AddOp';
import Mvp from '../containers/Mvp';

export default () => (
    <Router>
        <Header/>
        <Route path="/Arcane" component={Arcane}/>
        <Route path="/AddOp" component={AddOp}/>
        <Route path="/Mvp" component={Mvp}/>
    </Router>
)