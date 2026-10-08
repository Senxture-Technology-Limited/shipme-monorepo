import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import SCSConcept from './pages/SCSConcept';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/concept/scs" element={<SCSConcept />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-white">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quote" element={<Quote />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
