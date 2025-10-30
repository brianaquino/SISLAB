import React, { useState } from 'react';
import axios from 'axios'; // <--- 1. IMPORTADO
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

  // --- 2. ESTA ES LA FUNCIÓN MODIFICADA ---
  const handleLogin = async (loginData) => {
    setLoading(true);
    const { email, password } = loginData;

    try {
      // 1. Llamada REAL al backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // 2. Extraer datos del backend
      const { token, usuario: backendUser } = response.data;
      
      // 3. Guardar el token para futuras peticiones
      localStorage.setItem('token', token);

      // 4. ¡IMPORTANTE!
      // Transformamos la respuesta del backend (backendUser) 
      // al formato 'userData' que tus dashboards esperan.
      const userData = {
        type: backendUser.rol.charAt(0).toUpperCase() + backendUser.rol.slice(1), // ej: 'admin' -> 'Admin'
        email: backendUser.email,
        name: backendUser.nombre, // Mapeamos 'nombre' a 'name'
        username: backendUser.email.split('@')[0], // Creamos un username
        foto_perfil: backendUser.foto, // Mapeamos 'foto' a 'foto_perfil'
        rol: backendUser.rol,
        info: { id_usuario: backendUser.id }, // Pasamos la info del ID
        permisos: [] // Tus dashboards deben poder manejar esto vacío por ahora
      };

      // 5. Guardamos el usuario en el estado
      setUser(userData);
      setLoading(false);

    } catch (err) {
      // 6. Manejo de errores REALES del backend
      console.error('Error en el login:', err);
      if (err.response && err.response.data && err.response.data.msg) {
        // Usamos alert() para mantener el estilo de tu simulación
        alert(`❌ Error: ${err.response.data.msg}`); 
      } else {
        alert('❌ Error al conectar con el servidor.');
      }
      setLoading(false);
    }
  };
  
  // --- TODO EL RESTO DE TU CÓDIGO PERMANECE EXACTAMENTE IGUAL ---

  const handleLogout = () => {
    setUser(null);
    setModoRegistroActivo(false);
    localStorage.removeItem('token'); // <--- (Añadido) Buena práctica
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