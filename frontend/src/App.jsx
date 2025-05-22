import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SponsorListPage from './pages/sponsors/SponsorListPage';
import SponsorDetailPage from './pages/sponsors/SponsorDetailPage';
import ContractDetailPage from './pages/sponsors/ContractDetailPage';
import SeasonListPage from './pages/awards/SeasonListPage';
import SeasonDetailPage from './pages/awards/SeasonDetailPage';
import RaceAwardListPage from './pages/awards/RaceAwardListPage';
import RacerAwardDetailPage from './pages/awards/RacerAwardDetailPage';
import TeamAwardDetailPage from './pages/awards/TeamAwardDetailPage';
import Layout from './components/common/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        
        {/* Sponsor routes */}
        <Route path="/sponsors" element={<Layout><SponsorListPage /></Layout>} />
        <Route path="/sponsors/:id" element={<Layout><SponsorDetailPage /></Layout>} />
        <Route path="/contracts/:id" element={<Layout><ContractDetailPage /></Layout>} />
        
        {/* Award management routes */}
        <Route path="/seasons" element={<Layout><SeasonListPage /></Layout>} />
        <Route path="/seasons/:id" element={<Layout><SeasonDetailPage /></Layout>} />
        <Route path="/races/:raceId/awards" element={<Layout><RaceAwardListPage /></Layout>} />
        <Route path="/race-awards/racer/:id" element={<Layout><RacerAwardDetailPage /></Layout>} />
        <Route path="/race-awards/team/:id" element={<Layout><TeamAwardDetailPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;