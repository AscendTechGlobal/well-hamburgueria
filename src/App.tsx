import { Route, Routes } from 'react-router-dom';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { ScrollToHash } from './components/ScrollToHash';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';

export default function App() {
  return (
    <>
      <AnalyticsTracker />
      <ScrollToTop />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historia" element={<StoryPage />} />
      </Routes>
    </>
  );
}
