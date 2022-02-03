import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Navigation />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
