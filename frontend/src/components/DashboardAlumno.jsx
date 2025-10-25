import React, { useState, useEffect } from 'react';
import '../App.css';

// Datos de prueba
const datosPrueba = {
  alumno: {
    nombre: "Carlos Rodríguez Martínez",
    matricula: "2023001",
    email: "carlos.rodriguez@unach.edu.mx",
    grupo: "SIS-8A",
    carrera: "Ingeniería en Sistemas Computacionales",
    foto_perfil: ""
  },
  horarios: [
    {
      id_clase: 1,
      materia: "Programación Web",
      docente: "Dr. Juan Pérez García",
      laboratorio: "Lab. de Computación 1",
      fecha: new Date().toISOString().split('T')[0],
      hora_inicio: "14:00",
      hora_fin: "16:00",
      dia: "Lunes"
    },
    {
      id_clase: 2,
      materia: "Base de Datos Avanzada",
      docente: "Dra. María García López",
      laboratorio: "Lab. de Computación 2",
      fecha: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hora_inicio: "16:00",
      hora_fin: "18:00",
      dia: "Martes"
    },
    {
      id_clase: 3,
      materia: "Inteligencia Artificial",
      docente: "Dr. Roberto Sánchez Méndez",
      laboratorio: "Lab. de Computación 3",
      fecha: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      hora_inicio: "10:00",
      hora_fin: "12:00",
      dia: "Miércoles"
    },
    {
      id_clase: 4,
      materia: "Redes de Computadoras",
      docente: "Mtro. Luis Hernández Cruz",
      laboratorio: "Lab. de Redes 1",
      fecha: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      hora_inicio: "08:00",
      hora_fin: "10:00",
      dia: "Jueves"
    },
    {
      id_clase: 5,
      materia: "Programación Web",
      docente: "Dr. Juan Pérez García",
      laboratorio: "Lab. de Computación 1",
      fecha: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      hora_inicio: "14:00",
      hora_fin: "16:00",
      dia: "Viernes"
    }
  ],
  asistencias: [
    {
      id_asistencia: 1,
      id_clase: 1,
      fecha: new Date().toISOString().split('T')[0],
      estado: "presente",
      hora_ingreso: "14:05"
    }
  ]
};

const esEstaSemana = (fecha) => {
  if (!fecha) return false;
  
  const hoy = new Date();
  const fechaClase = new Date(fecha);
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - hoy.getDay());
  inicioSemana.setHours(0, 0, 0, 0);
  
  const finSemana = new Date(inicioSemana);
  finSemana.setDate(inicioSemana.getDate() + 6);
  finSemana.setHours(23, 59, 59, 999);
  
  return fechaClase >= inicioSemana && fechaClase <= finSemana;
};

const DashboardAlumno = ({ userData, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('qr');
  const [horarios, setHorarios] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarEditarPerfil, setMostrarEditarPerfil] = useState(false);
  const [cambiarPassword, setCambiarPassword] = useState(false);
  const [mensajeAsistencia, setMensajeAsistencia] = useState('');

  // Estados para editar perfil
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar datos de prueba
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHorarios(datosPrueba.horarios);
      setAsistencias(datosPrueba.asistencias);
      setLoading(false);
    }, 1000);
  }, []);

  // Función para registrar asistencia (simulación)
  const registrarAsistencia = async () => {
    setMensajeAsistencia('⏳ Registrando asistencia...');
    
    setTimeout(() => {
      const clasesHoy = horarios.filter(clase => {
        const hoy = new Date().toISOString().split('T')[0];
        const fechaClase = new Date(clase.fecha).toISOString().split('T')[0];
        return fechaClase === hoy;
      });

      if (clasesHoy.length === 0) {
        setMensajeAsistencia('❌ No tienes clases programadas para hoy');
        return;
      }

      const claseParaRegistro = clasesHoy[0];
      const ahora = new Date();
      const horaActual = ahora.toTimeString().split(' ')[0].substring(0, 5);

      // Simular registro exitoso
      const nuevaAsistencia = {
        id_asistencia: asistencias.length + 1,
        id_clase: claseParaRegistro.id_clase,
        fecha: new Date().toISOString().split('T')[0],
        estado: "presente",
        hora_ingreso: horaActual
      };

      setAsistencias([...asistencias, nuevaAsistencia]);
      setMensajeAsistencia(`✅ Asistencia registrada para ${claseParaRegistro.materia} a las ${horaActual}`);
    }, 1500);
  };

  // Obtener clases de hoy
  const clasesHoy = horarios.filter(clase => {
    const hoy = new Date().toISOString().split('T')[0];
    const fechaClase = new Date(clase.fecha).toISOString().split('T')[0];
    return fechaClase === hoy;
  });

  // Calcular métricas
  const calcularMetricas = () => {
    const clasesEstaSemana = horarios.filter(h => esEstaSemana(h.fecha)).length;
    const materiasUnicas = [...new Set(horarios.map(h => h.materia))].length;
    const asistenciasTotales = asistencias.length;
    const porcentajeAsistencia = horarios.length > 0 ? Math.round((asistenciasTotales / clasesEstaSemana) * 100) : 0;

    return [
      { title: 'Clases Esta Semana', value: clasesEstaSemana.toString(), icon: '📚' },
      { title: 'Asistencias Totales', value: asistenciasTotales.toString(), icon: '✅' },
      { title: 'Porcentaje Asist.', value: `${porcentajeAsistencia}%`, icon: '📊' },
      { title: 'Materias Inscritas', value: materiasUnicas.toString(), icon: '🎓' }
    ];
  };

  const metricsData = calcularMetricas();

  // Generar QR
  const generarQR = () => {
    const matricula = datosPrueba.alumno.matricula;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(matricula)}`;
  };

  // Manejar cambio de foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPerfil(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar perfil (simulación)
  const guardarPerfil = async () => {
    setMensaje('⏳ Guardando cambios...');
    setTimeout(() => {
      setMensaje('✅ Foto de perfil actualizada correctamente');
      setTimeout(() => setMensaje(''), 3000);
    }, 1000);
  };

  // Cambiar contraseña (simulación)
  const cambiarContraseña = async () => {
    if (nuevaPassword !== confirmarPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    if (nuevaPassword.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setMensaje('⏳ Cambiando contraseña...');
    setTimeout(() => {
      setMensaje('✅ Contraseña cambiada correctamente');
      setCambiarPassword(false);
      setPasswordActual('');
      setNuevaPassword('');
      setConfirmarPassword('');
      setTimeout(() => setMensaje(''), 3000);
    }, 1500);
  };

  // Render QR Section
  const renderQR = () => (
    <div className="qr-section">
      <h2>Mi QR de Asistencia</h2>
      <div className="alumno-info-card">
        <div className="alumno-header">
          <h3>{datosPrueba.alumno.nombre}</h3>
          <p className="matricula">Matrícula: {datosPrueba.alumno.matricula}</p>
          <p className="grupo">Grupo: {datosPrueba.alumno.grupo}</p>
        </div>
        
        <div className="qr-content">
          <div className="qr-container">
            <h4>Mi Código QR</h4>
            <div className="qr-code">
              <img src={generarQR()} alt={`Código QR para ${datosPrueba.alumno.matricula}`} />
            </div>
            <p className="qr-instructions">
              Muestra este QR al ingresar al laboratorio para registrar tu asistencia
            </p>
            
            {/* Información de clases de hoy */}
            {clasesHoy.length > 0 ? (
              <div className="clases-hoy-info">
                <h4>📅 Clases de Hoy:</h4>
                {clasesHoy.map((clase, index) => (
                  <div key={index} className="clase-info">
                    <strong>{clase.materia}</strong>
                    <p>🕒 {clase.hora_inicio} - {clase.hora_fin}</p>
                    <p>🏢 {clase.laboratorio}</p>
                    <p>👨‍🏫 {clase.docente}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-clases-info">
                <p>📭 No tienes clases programadas para hoy</p>
              </div>
            )}
            
            {/* Botón de simulación de asistencia */}
            <div className="simulacion-asistencia">
              <button 
                className="btn-asistencia"
                onClick={registrarAsistencia}
                disabled={clasesHoy.length === 0}
              >
                {clasesHoy.length === 0 ? '📱 No hay clases hoy' : '📱 Registrar Asistencia (Demo)'}
              </button>
              
              {mensajeAsistencia && (
                <div className={`mensaje ${mensajeAsistencia.includes('✅') ? 'mensaje-exito' : 'mensaje-error'}`}>
                  {mensajeAsistencia}
                </div>
              )}
              
              {clasesHoy.length > 0 && (
                <div className="info-adicional">
                  <p><small>💡 Demo: Registra asistencia en cualquier clase de hoy</small></p>
                  <p><small>🕒 Hora actual: {new Date().toLocaleTimeString('es-MX')}</small></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Horarios Section
  const renderHorarios = () => (
    <div className="horarios-section">
      <div className="section-header">
        <h2>Mis Horarios</h2>
        <button className="btn-refresh" onClick={() => window.location.reload()} disabled={loading}>
          {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando horarios...</div>
      ) : (
        <div className="horarios-grid">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => {
            const clasesDelDia = horarios.filter(clase => clase.dia === dia);

            return (
              <div key={dia} className="horario-card">
                <h3>{dia}</h3>
                {clasesDelDia.length === 0 ? (
                  <p className="no-clases">No hay clases este día</p>
                ) : (
                  clasesDelDia.map((clase, index) => (
                    <div key={index} className="clase-item">
                      <strong>{clase.materia}</strong>
                      <span>🕒 {clase.hora_inicio} - {clase.hora_fin}</span>
                      <span>🏢 {clase.laboratorio}</span>
                      <span>👨‍🏫 {clase.docente}</span>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Render Editar Perfil
  const renderEditarPerfil = () => (
    <div className="editar-perfil-section">
      <div className="section-header">
        <h2>Editar Perfil</h2>
        <button 
          className="btn-volver"
          onClick={() => setMostrarEditarPerfil(false)}
        >
          ← Volver al Perfil
        </button>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.includes('✅') ? 'mensaje-exito' : 'mensaje-error'}`}>
          {mensaje}
        </div>
      )}

      <div className="perfil-form">
        <div className="foto-perfil-section">
          <h3>Foto de Perfil</h3>
          <div className="foto-container">
            <div className="foto-preview">
              <img 
                src={fotoPerfil || '/default-avatar.png'} 
                alt="Foto de perfil" 
                className="foto-perfil"
              />
            </div>
            <div className="foto-actions">
              <input
                type="file"
                id="foto-input"
                accept="image/*"
                onChange={handleFotoChange}
                className="file-input"
              />
              <label htmlFor="foto-input" className="btn-subir-foto">
                📷 Cambiar Foto
              </label>
              <button 
                onClick={guardarPerfil}
                className="btn-guardar"
                disabled={!fotoPerfil}
              >
                💾 Guardar Foto
              </button>
            </div>
          </div>
        </div>

        <div className="password-section">
          <h3>Seguridad</h3>
          {!cambiarPassword ? (
            <button 
              className="btn-cambiar-password"
              onClick={() => setCambiarPassword(true)}
            >
              🔒 Cambiar Contraseña
            </button>
          ) : (
            <div className="cambiar-password-form">
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                />
              </div>
              <div className="password-actions">
                <button 
                  onClick={cambiarContraseña}
                  className="btn-confirmar"
                  disabled={!passwordActual || !nuevaPassword || !confirmarPassword}
                >
                  ✅ Confirmar Cambio
                </button>
                <button 
                  onClick={() => {
                    setCambiarPassword(false);
                    setPasswordActual('');
                    setNuevaPassword('');
                    setConfirmarPassword('');
                  }}
                  className="btn-cancelar"
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Perfil
  const renderPerfil = () => {
    if (mostrarEditarPerfil) {
      return renderEditarPerfil();
    }

    return (
      <div className="perfil-section">
        <div className="section-header">
          <h2>Mi Perfil</h2>
          <button 
            className="btn-editar-perfil"
            onClick={() => setMostrarEditarPerfil(true)}
          >
            ✏️ Editar Perfil
          </button>
        </div>

        <div className="perfil-card">
          <div className="perfil-header">
            <div className="perfil-avatar">
              <img 
                src={fotoPerfil || '/default-avatar.png'} 
                alt="Foto de perfil" 
                className="foto-perfil-grande"
              />
            </div>
            <div className="perfil-info">
              <h3>{datosPrueba.alumno.nombre}</h3>
              <p className="matricula">Matrícula: {datosPrueba.alumno.matricula}</p>
              <p className="email">Email: {datosPrueba.alumno.email}</p>
              <p className="carrera">{datosPrueba.alumno.carrera}</p>
              <p className="grupo">Grupo: {datosPrueba.alumno.grupo}</p>
            </div>
          </div>
          
          <div className="perfil-details">
            <div className="detail-group">
              <h4>Información Académica</h4>
              <p><strong>Usuario:</strong> {datosPrueba.alumno.email}</p>
              <p><strong>Materias Inscritas:</strong> {[...new Set(horarios.map(h => h.materia))].length}</p>
              <p><strong>Clases Esta Semana:</strong> {horarios.filter(h => esEstaSemana(h.fecha)).length}</p>
              <p><strong>Asistencias Registradas:</strong> {asistencias.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'qr':
        return renderQR();
      case 'horarios':
        return renderHorarios();
      case 'perfil':
        return renderPerfil();
      default:
        return renderQR();
    }
  };

  return (
    <div className="dashboard-alumno">
      <header className="alumno-header">
        <div className="header-left">
          <div className="logo">
            <span>UNACH</span>
          </div>
          <h1>Alumno SISLAB</h1>
        </div>
        <div className="header-right">
          <span className="user-info">usuario: {datosPrueba.alumno.email}</span>
          <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
        </div>
      </header>

      <div className="alumno-container">
        <aside className="alumno-sidebar">
          <nav className="sidebar-nav">
            <div className={`nav-item ${activeMenu === 'qr' ? 'active' : ''}`}
              onClick={() => setActiveMenu('qr')}>
              📱 Mi QR
            </div>
            <div className={`nav-item ${activeMenu === 'horarios' ? 'active' : ''}`}
              onClick={() => setActiveMenu('horarios')}>
              🕒 Mis Horarios
            </div>
            <div className={`nav-item ${activeMenu === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveMenu('perfil')}>
              👤 Mi Perfil
            </div>
          </nav>
        </aside>

        <main className="alumno-main">
          <div className="metrics-grid">
            {metricsData.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-icon">{metric.icon}</div>
                <div className="metric-content">
                  <h3>{metric.title}</h3>
                  <div className="metric-value">{metric.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="content-area">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAlumno;