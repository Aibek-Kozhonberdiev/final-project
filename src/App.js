import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.js';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Quizzes from './pages/Quizzes';
import Login from './pages/auth/Login';
import Signin from './pages/auth/Signin';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/quizzes' element={<Quizzes />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
          </Routes>

        </Router>
    </div>
  );
}

export default App;
