import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import React from 'react';

import Header from '../components/Header'; 
import PopularArticles from '../components/PopularArticles';
// import TrendingArticles from '../components/TrendingArticles';
import SportArticles from '../components/SportArticles';
import NewsArticles from '../components/NewsArticles';
import Footer from '../components/Footer'; 

function App() {
  // <script src="jquery-2.1.4.js"></script>

  return (
    <Router>
      <div data-test="App">
        {/* <div className="App_loading-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div> */}
        {/* <div className="App_header-container"> */}
          <Header />
        {/* </div> */}
        <div className="article_container">
          <Switch>
            <Route path="/" exact component={PopularArticles} />
            <Route path="/sport" exact component={SportArticles} />
            <Route path="/news" exact component={NewsArticles} />
          </Switch>
        </div>
        <Footer />

        {/* {<script>
          $(window).on('load', function() {
            $('.loader-wrapper').fadeOut('slow')
          });
        </script>} */}
        
        {/* {need to find a way to load this in on window load - maybe in article slice will pop as no display for now but thats not currently pushed and merged to master yet so will do that later} */}
      </div>
    </Router>
  );
}

export default App;
