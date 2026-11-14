import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const ServicesHub = lazy(() => import('./pages/Services').then((m) => ({ default: m.ServicesHub })));
const ServicePage = lazy(() => import('./pages/Services'));
const Studio = lazy(() => import('./pages/Studio'));
const AiTalentList = lazy(() => import('./pages/AiTalent').then((m) => ({ default: m.AiTalentList })));
const AiTalentProfile = lazy(() => import('./pages/AiTalent').then((m) => ({ default: m.AiTalentProfile })));
const Work = lazy(() => import('./pages/Company').then((m) => ({ default: m.Work })));
const About = lazy(() => import('./pages/Company').then((m) => ({ default: m.About })));
const Team = lazy(() => import('./pages/Company').then((m) => ({ default: m.Team })));
const HowWeWork = lazy(() => import('./pages/Company').then((m) => ({ default: m.HowWeWork })));
const Pricing = lazy(() => import('./pages/Company').then((m) => ({ default: m.Pricing })));
const Careers = lazy(() => import('./pages/Company').then((m) => ({ default: m.Careers })));
const FaqPage = lazy(() => import('./pages/Company').then((m) => ({ default: m.FaqPage })));
const TalentManagement = lazy(() => import('./pages/Talent').then((m) => ({ default: m.TalentManagement })));
const CreatorPipeline = lazy(() => import('./pages/Talent').then((m) => ({ default: m.CreatorPipeline })));
const Articles = lazy(() => import('./pages/Articles').then((m) => ({ default: m.Articles })));
const ArticleView = lazy(() => import('./pages/Articles').then((m) => ({ default: m.ArticleView })));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '70vh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesHub />} />
            <Route path="services/:slug" element={<ServicePage />} />
            <Route path="ugc-campaigns" element={<ServicePage slug="ugc-campaigns" />} />
            <Route path="studio" element={<Studio />} />
            <Route path="ai-talent" element={<AiTalentList />} />
            <Route path="ai-talent/:slug" element={<AiTalentProfile />} />
            <Route path="work" element={<Work />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="how-we-work" element={<HowWeWork />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="talent-management" element={<TalentManagement />} />
            <Route path="creator-pipeline" element={<CreatorPipeline />} />
            <Route path="careers" element={<Careers />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:slug" element={<ArticleView />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
