import './App.css';

import Header from '../components/Header'; 
import Article from '../components/Article';
import Footer from '../components/Footer'; 

function App() {
  // <script src="jquery-2.1.4.js"></script>

  return (
    <div data-test="App">
      <div className="App_loading-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
      </div>
      
      <Header />
      <div className="article_container">
        <Article />
      </div>
      <Footer />

      {/* <script>
        $(window).on('load', function() {
          $('.loader-wrapper').fadeOut('slow')
        });
      </script> */}  
      
      {/* {need to find a way to load this in on window load - maybe in article slice will pop as no display for now but thats not currently pushed and merged to master yet so will do that later} */}
    </div>
  );
}

export default App;
