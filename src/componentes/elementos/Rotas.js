import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProfilePage from './EditProfilePage'; // Página de edição de perfil


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/edit-profile" element={<EditProfilePage />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default AppRouter;