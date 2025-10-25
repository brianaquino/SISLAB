import React, { useState } from 'react';
import Login from './components/Login';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardDocente from './components/DashboardDocente';
import DashboardAlumno from './components/DashboardAlumno';
import PantallaRegistroClase from './components/PantallaRegistroClase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modoRegistroActivo, setModoRegistroActivo] = useState(false);

  const handleLogin = (loginData) => {
    setLoading(true);
    const { email, password } = loginData;

    // Simular delay de red
    setTimeout(() => {
      if (password !== '1234') {
        alert('❌ Contraseña incorrecta. Usa "1234" para pruebas.');
        setLoading(false);
        return;
      }

      let userData = null;

      switch(email.toLowerCase()) {
        case 'admin@unach.mx':
          userData = {
            type: 'Administrador',
            email: 'admin@unach.mx',
            name: 'Administrador SISLAB',
            username: 'admin',
            foto_perfil: '/default-avatar.png',
            rol: 'admin',
            info: { id_usuario: 1 },
            permisos: ['activar_registro', 'ver_registro', 'gestionar_usuarios']
          };
          break;
        case 'docente@unach.mx':
          userData = {
            type: 'Docente',
            email: 'docente@unach.mx',
            name: 'Dr. Juan Pérez García',
            username: 'docente',
            foto_perfil: '/default-avatar.png',
            rol: 'docente',
            info: { id_docente: 101, no_empleado: 'D001' },
            permisos: ['ver_registro', 'registrar_asistencia']
          };
          break;
        case 'alumno@unach.mx':
          userData = {
            type: 'Alumno',
            email: 'alumno@unach.mx',
            name: 'María López Hernández',
            username: 'alumno',
            foto_perfil: '/default-avatar.png',
            rol: 'alumno',
            info: { id_alumno: 201, matricula: 'A001', grupo: 'ISC-8A' },
            permisos: ['registrar_asistencia']
          };
          break;
        default:
          alert('❌ Usuario no reconocido.');
          setLoading(false);
          return;
      }

      setUser(userData);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setModoRegistroActivo(false);
  };

  const toggleModoRegistro = () => {
    setModoRegistroActivo(!modoRegistroActivo);
  };

  // Renderizar pantalla de registro activa (para pantalla principal del laboratorio)
  if (modoRegistroActivo && !user) {
    return (
      <div className="App">
        <PantallaRegistroClase 
          onToggleModo={() => setModoRegistroActivo(false)}
          esPantallaPrincipal={true}
        />
      </div>
    );
  }

  const renderDashboard = () => {
    if (!user) return null;

    switch(user.rol) {
      case 'admin':
        return (
          <DashboardAdmin 
            userData={user} 
            onLogout={handleLogout}
            modoRegistroActivo={modoRegistroActivo}
            onToggleModoRegistro={toggleModoRegistro}
          />
        );
      case 'docente':
        return (
          <DashboardDocente 
            userData={user} 
            onLogout={handleLogout}
            modoRegistroActivo={modoRegistroActivo}
          />
        );
      case 'alumno':
        return <DashboardAlumno userData={user} onLogout={handleLogout} />;
      default:
        return (
          <div className="error-container">
            <h2>Error: Rol no reconocido</h2>
            <button onClick={handleLogout}>Volver al login</button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {!user ? (
        <div>
          <Login onLogin={handleLogin} loading={loading} />
          {/* Botón para activar pantalla de registro sin login */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={toggleModoRegistro}
              className="btn-modoregistro"
            >
              🖥️ Activar Pantalla de Registro (Laboratorio)
            </button>
          </div>
        </div>
      ) : (
        renderDashboard()
      )}
    </div>
  );
}

export default App;