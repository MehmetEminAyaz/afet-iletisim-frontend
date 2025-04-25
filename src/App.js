import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessageListPage from './pages/MessageListPage';
import CreateMessagePage from './pages/CreateMessagePage';
import MapPage from './pages/MapPage';
import StatisticsPage from './pages/StatisticsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Korumalı sayfalar */}
        <Route path="/messages" element={<PrivateRoute><MessageListPage /></PrivateRoute>} />
        <Route path="/messages/new" element={<PrivateRoute><CreateMessagePage /></PrivateRoute>} />
        <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
        <Route path="/stats" element={<PrivateRoute><StatisticsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
