import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route path="/" exact component={Landing} />
          <div>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
