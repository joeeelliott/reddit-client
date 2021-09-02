import './App.css';

import Header from '../components/Header'; 
import Article from '../components/Article';
import Footer from '../components/Footer'; 

function App() {
  return (
    <div data-test="App">
      <Header />
      <div className="article_container">
        <Article />
      </div>
      <Footer />
    </div>
  );
}

export default App;
