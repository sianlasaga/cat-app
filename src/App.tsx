import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CatPage from './pages/CatPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ToastProvider from './contexts/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cat/:id" element={<CatPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
