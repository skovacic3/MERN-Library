import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Admin from './components/Admin';
import Books from './components/Books';
import { Navbar } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import React, { useEffect } from 'react';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/books" component={Books} />
      </Switch>
    </div>
  );
}

export default App;
