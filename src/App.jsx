import { Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

import { useAuth } from './contexts/AuthContext'; // ✅ Import AuthContext

function App() {
  const { isLoggedIn } = useAuth(); // ✅ Get login status

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Route */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/signup" />
          }
        />
      </Routes>
    </>
  );
}

export default App;