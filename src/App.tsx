import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

import CreatorPipeline from './pages/CreatorPipeline';
import UGCCampaigns from './pages/UGCCampaigns';
import HowWeWork from './pages/HowWeWork';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import Services from './pages/Services';
import InfluencerMarketing from './pages/InfluencerMarketing';
import ContentCreative from './pages/ContentCreative';
import TalentManagement from './pages/TalentManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          
          <Route path="creator-pipeline" element={<CreatorPipeline />} />
          <Route path="ugc-campaigns" element={<UGCCampaigns />} />
          <Route path="how-we-work" element={<HowWeWork />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticleView />} />
          
          <Route path="services" element={<Services />} />
          <Route path="services/influencer-marketing" element={<InfluencerMarketing />} />
          <Route path="services/content-creative" element={<ContentCreative />} />
          <Route path="talent-management" element={<TalentManagement />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
