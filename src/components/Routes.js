import React from 'react';
import Header from './Header';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Arcane from '../containers/Arcane';
import AddOp from '../containers/AddOp';
import Mvp from '../containers/Mvp';

export default () => (
    <BrowserRouter basename="/maple-helper">
        <Header/>
        <Route path="/Arcane" component={Arcane}/>
        <Route path="/AddOp" component={AddOp}/>
        <Route path="/Mvp" component={Mvp}/>
    </BrowserRouter>
)