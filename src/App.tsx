import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Collections from './pages/Collections';
import Review from './pages/Review';
import Custom from './pages/Custom';

function App() {
  return (
    <BrowserRouter basename="/Mindful-News">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/review" element={<Review />} />
          <Route path="/custom" element={<Custom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
