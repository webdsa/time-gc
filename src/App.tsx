import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BrasiliaClock from './pages/BrasiliaClock';
import StLouisClock from './pages/StLouisClock';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brasilia" element={<BrasiliaClock />} />
          <Route path="/stlouis" element={<StLouisClock />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;