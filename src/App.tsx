import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoginPage, RegisterPage } from '@pages/auth';
import { DashboardPage } from '@pages/dashboard';
import { MedicamentosPage } from '@pages/medicamentos';
import { SolicitudesPage } from '@pages/solicitudes';
import { PrivateRoute } from '@components/common';
import '@styles/globals.css';
import '@styles/layout.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/medicamentos" element={<MedicamentosPage />} />
          <Route path="/solicitudes" element={<SolicitudesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
