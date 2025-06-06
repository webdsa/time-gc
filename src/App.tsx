import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BrasiliaClock from './pages/BrasiliaClock';
import StLouisClock from './pages/StLouisClock';
import TimezoneClock from './pages/TimezoneClock';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brasilia" element={<BrasiliaClock />} />
            <Route path="/stlouis" element={<StLouisClock />} />
            <Route path="/timezone/:id" element={<TimezoneClock />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;