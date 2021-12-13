import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import React from 'react';

import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Posts from '../components/Posts'; 

function App() {  
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
          <div className="post_container">
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/sport" exact component={Posts} />
              <Route path="/news" exact component={Posts} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router> 
  );
}

export default App;