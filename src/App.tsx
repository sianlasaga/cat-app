import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cat from './pages/Cat';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cat" element={<Cat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
