import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BrasiliaClock from './pages/BrasiliaClock';
import StLouisClock from './pages/StLouisClock';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brasilia" element={<BrasiliaClock />} />
        <Route path="/stlouis" element={<StLouisClock />} />
      </Routes>
    </Router>
  );
}

export default App;