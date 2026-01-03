import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';
import SavedProfiles from './pages/SavedProfiles';
import './index.css';

import { KrikInsLogoSimple } from './components/KrikInsLogo';

function App() {
  return (
    <BrowserRouter>
      <KrikInsLogoSimple />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/saved" element={<SavedProfiles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
