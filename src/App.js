import './App.css';
import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Game from './components/Game/Game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: 'Invite', paire: 3 });

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/game"
            element={<Game formData={formData} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
