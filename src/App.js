import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.js';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Routes>
            <Route path='/Home' element={<Home />} />
          </Routes>

        </Router>
    </div>
  );
}

export default App;
