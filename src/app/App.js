import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import React from 'react';

import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Posts from '../components/Posts'; 

// const Header = lazy(() => import('../components/Header'));
// const Footer = lazy(() => import('../components/Footer'));
// const Posts = lazy(() => import('../components/Posts'));

// const renderLoader = () => <div className="App_loading-wrapper">
//           <span className="loader"><span className="loader-inner"></span></span>
//           </div>


function App() {  
  return (
    <Router>
      {/* <Suspense fallback={renderLoader()}> */}
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
      {/* </Suspense> */}
    </Router> 
  );
}

export default App;