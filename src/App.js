import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Routes>
            {/* <Route path='/' element={} />
            <Route path='/quizzes' element={} />
            <Route path='/rooms' element={} /> */}
          </Routes>

        </Router>
    </div>
  );
}

export default App;
