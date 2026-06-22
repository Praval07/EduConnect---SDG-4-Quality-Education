import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudyMaterials from './pages/StudyMaterials';
import Videos from './pages/Videos';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import AboutSDG from './pages/AboutSDG';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-gray-900 dark:text-white font-inter">
            <Navbar />
            <main>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-sdg" element={<AboutSDG />} />

                {/* Guest-accessible routes (no login required, but login enhances them) */}
                <Route path="/study-materials" element={
                  <ProtectedRoute allowGuest={true}><StudyMaterials /></ProtectedRoute>
                } />
                <Route path="/materials" element={
                  <ProtectedRoute allowGuest={true}><StudyMaterials /></ProtectedRoute>
                } />
                <Route path="/videos" element={
                  <ProtectedRoute allowGuest={true}><Videos /></ProtectedRoute>
                } />
                <Route path="/ai-assistant" element={
                  <ProtectedRoute allowGuest={true}><AIAssistant /></ProtectedRoute>
                } />

                {/* Strictly protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute><Profile /></ProtectedRoute>
                } />
                <Route path="/admin-panel-rrh-2026" element={
                  <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                } />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
