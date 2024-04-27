import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cat from './pages/Cat';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import CatProvider from './contexts/CatContext';
import ToastProvider from './contexts/ToastProvider';


function App() {

  return (
    <ToastProvider>
      <CatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cat" element={<Cat />} />
          </Routes>
        </BrowserRouter>
      </CatProvider>
    </ToastProvider>
  )
}

export default App
