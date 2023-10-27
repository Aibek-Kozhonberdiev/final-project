import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.js';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Quizzes from './pages/Quizzes';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/quizzes' element={<Quizzes />} />
          </Routes>

        </Router>
    </div>
  );
}

export default App;
