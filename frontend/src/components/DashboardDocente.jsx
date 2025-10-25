import React, { useState, useEffect } from 'react';
import '../App.css';

const DashboardDocente = ({ userData, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('horarios');
  const [horarios, setHorarios] = useState([]);
  const [clasesHoy, setClasesHoy] = useState([]);
  const [asistenciasHoy, setAsistenciasHoy] = useState({ count: 0 });
  const [loading, setLoading] = useState(false);
  const [docenteInfo, setDocenteInfo] = useState(null);
  const [mostrarEditarPerfil, setMostrarEditarPerfil] = useState(false);
  const [cambiarPassword, setCambiarPassword] = useState(false);
  const [asistenciasRegistradas, setAsistenciasRegistradas] = useState([]);
  const [mensajeAsistencia, setMensajeAsistencia] = useState('');

  // Estados para editar perfil
  const [fotoPerfil, setFotoPerfil] = useState(userData?.foto_perfil || '/default-avatar.png');
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Datos mock para la interfaz
  const mockData = {
    horarios: [
      {
        id_clase: 1,
        materia: 'Programación Avanzada',
        fecha: new Date().toISOString().split('T')[0],
        hora_inicio: '08:00',
        hora_fin: '10:00',
        laboratorio: 'Laboratorio 1',
        grupo: 'ISC-8A'
      },
      {
        id_clase: 2,
        materia: 'Bases de Datos',
        fecha: new Date().toISOString().split('T')[0],
        hora_inicio: '10:00',
        hora_fin: '12:00',
        laboratorio: 'Laboratorio 2',
        grupo: 'ISC-8B'
      },
      {
        id_clase: 3,
        materia: 'Inteligencia Artificial',
        fecha: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        hora_inicio: '14:00',
        hora_fin: '16:00',
        laboratorio: 'Laboratorio 1',
        grupo: 'ISC-9A'
      }
    ],
    asistencias: [
      {
        id_asistencia: 1,
        nombre_alumno: 'María López García',
        matricula: 'A001',
        email: 'maria.lopez@unach.mx',
        grupo: 'ISC-8A',
        hora_ingreso: new Date().toISOString(),
        foto_perfil: '/default-avatar.png'
      },
      {
        id_asistencia: 2,
        nombre_alumno: 'Carlos Ruiz Méndez',
        matricula: 'A002',
        email: 'carlos.ruiz@unach.mx',
        grupo: 'ISC-8A',
        hora_ingreso: new Date(Date.now() - 1800000).toISOString(),
        foto_perfil: '/default-avatar.png'
      }
    ],
    docente: {
      nombre: 'Dr. Juan Pérez García',
      no_empleado: 'D001',
      email: 'juan.perez@unach.mx',
      departamento: 'Sistemas Computacionales'
    }
  };

  useEffect(() => {
    cargarDatosMock();
  }, [activeMenu]);

  const cargarDatosMock = () => {
    setLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      setHorarios(mockData.horarios);
      
      const hoy = new Date().toISOString().split('T')[0];
      const clasesDeHoy = mockData.horarios.filter(clase => clase.fecha === hoy);
      setClasesHoy(clasesDeHoy);
      
      if (clasesDeHoy.length > 0) {
        setAsistenciasRegistradas(mockData.asistencias);
      }
      
      setAsistenciasHoy({ count: mockData.asistencias.length });
      setDocenteInfo(mockData.docente);
      setLoading(false);
    }, 1000);
  };

  // Función mock para registrar asistencia
  const registrarAsistenciaDocente = () => {
    setMensajeAsistencia('✅ Asistencia registrada correctamente (Simulación)');
    setTimeout(() => setMensajeAsistencia(''), 3000);
  };

  const metricsData = [
    { 
      title: 'Clases Hoy', 
      value: clasesHoy.length.toString(), 
      icon: '📚' 
    },
    { 
      title: 'Total Clases', 
      value: horarios.length.toString(), 
      icon: '📅' 
    },
    { 
      title: 'Asistencias Hoy', 
      value: asistenciasHoy.count.toString(), 
      icon: '✅' 
    },
    { 
      title: 'Materias', 
      value: [...new Set(horarios.map(h => h.materia))].length.toString(), 
      icon: '🎓' 
    }
  ];

  // Generar QR mock
  const generarQR = () => {
    const noEmpleado = docenteInfo?.no_empleado || 'D001';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(noEmpleado)}`;
  };

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

  // Funciones mock para guardar perfil y cambiar contraseña
  const guardarPerfil = () => {
    setMensaje('✅ Foto de perfil actualizada correctamente (Simulación)');
    setTimeout(() => setMensaje(''), 3000);
  };

  const cambiarContraseña = () => {
    if (nuevaPassword !== confirmarPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    if (nuevaPassword.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setMensaje('✅ Contraseña cambiada correctamente (Simulación)');
    setCambiarPassword(false);
    setPasswordActual('');
    setNuevaPassword('');
    setConfirmarPassword('');
    setTimeout(() => setMensaje(''), 3000);
  };

  const renderQRDocente = () => (
    <div className="qr-section">
      <h2>Mi QR de Identificación</h2>
      <div className="docente-info-card">
        <div className="docente-header">
          <h3>{docenteInfo?.nombre || 'Dr. Juan Pérez García'}</h3>
          <p className="no-empleado">No. Empleado: {docenteInfo?.no_empleado || 'D001'}</p>
          <p className="departamento">Departamento: {docenteInfo?.departamento || 'Sistemas Computacionales'}</p>
        </div>
        
        <div className="qr-content">
          <div className="qr-container">
            <h4>Mi Código QR de Identificación</h4>
            <div className="qr-code">
              <img src={generarQR()} alt="Código QR del docente" />
            </div>
            <p className="qr-instructions">
              Este QR identifica tu cuenta de docente. Puede ser usado para acceso a laboratorios y verificación de identidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHorarios = () => (
    <div className="horarios-docente-section">
      <div className="section-header">
        <h2>Mis Horarios</h2>
        <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
          {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando horarios...</div>
      ) : horarios.length === 0 ? (
        <div className="no-data">No tienes horarios asignados</div>
      ) : (
        <div className="clases-grid">
          {horarios.map(clase => (
            <div key={clase.id_clase} className="clase-card-docente">
              <div className="clase-header">
                <h3>{clase.materia}</h3>
                <span className="clase-fecha">{new Date(clase.fecha).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="clase-info">
                <p><strong>Horario:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                <p><strong>Laboratorio:</strong> {clase.laboratorio}</p>
                <p><strong>Grupo:</strong> {clase.grupo}</p>
              </div>
              <div className="clase-actions">
                <button className="btn-ver-detalles">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAsistencias = () => (
    <div className="asistencias-section">
      <div className="section-header">
        <h2>Asistencias de Hoy</h2>
        <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
          {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </button>
      </div>

      {clasesHoy.length === 0 ? (
        <div className="no-data">No tienes clases programadas para hoy</div>
      ) : (
        <>
          <div className="info-card">
            <h3>Clase Actual: {clasesHoy[0]?.materia}</h3>
            <p><strong>Grupo:</strong> {clasesHoy[0]?.grupo}</p>
            <p><strong>Laboratorio:</strong> {clasesHoy[0]?.laboratorio}</p>
            <p><strong>Horario:</strong> {clasesHoy[0]?.hora_inicio} - {clasesHoy[0]?.hora_fin}</p>
          </div>

          <div className="asistencias-list">
            <h3>Alumnos Registrados ({asistenciasRegistradas.length})</h3>
            {asistenciasRegistradas.length === 0 ? (
              <div className="no-data">No hay asistencias registradas aún</div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Foto</th>
                      <th>Nombre</th>
                      <th>Matrícula</th>
                      <th>Email</th>
                      <th>Grupo</th>
                      <th>Hora de Ingreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asistenciasRegistradas.map(asistencia => (
                      <tr key={asistencia.id_asistencia}>
                        <td>
                          <img 
                            src={asistencia.foto_perfil} 
                            alt="Foto" 
                            className="foto-tabla"
                          />
                        </td>
                        <td>{asistencia.nombre_alumno}</td>
                        <td>{asistencia.matricula}</td>
                        <td>{asistencia.email}</td>
                        <td>{asistencia.grupo}</td>
                        <td>{new Date(asistencia.hora_ingreso).toLocaleTimeString('es-MX')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  const renderReportes = () => (
    <div className="reportes-docente-section">
      <h2>Reportes de Mis Clases</h2>
      
      <div className="reportes-grid">
        <div className="reporte-card">
          <h3>📊 Reporte de Asistencias</h3>
          <p>Genera reportes de asistencias de tus clases</p>
          <div className="reporte-options">
            <select className="periodo-select">
              <option>Esta semana</option>
              <option>Este mes</option>
              <option>Este semestre</option>
            </select>
            <button className="btn-generar-reporte">Generar Reporte</button>
          </div>
        </div>

        <div className="reporte-card">
          <h3>📈 Estadísticas</h3>
          <div className="estadisticas-list">
            <div className="estadistica-item">
              <span>Total de clases:</span>
              <span className="estadistica-valor">{horarios.length}</span>
            </div>
            <div className="estadistica-item">
              <span>Materias impartidas:</span>
              <span className="estadistica-valor">{[...new Set(horarios.map(h => h.materia))].length}</span>
            </div>
            <div className="estadistica-item">
              <span>Grupos asignados:</span>
              <span className="estadistica-valor">{[...new Set(horarios.map(h => h.grupo))].length}</span>
            </div>
          </div>
        </div>

        <div className="reporte-card">
          <h3>📋 Exportar Datos</h3>
          <p>Exporta información de tus clases</p>
          <div className="export-options">
            <button className="btn-export">📄 Lista de Clases</button>
            <button className="btn-export">📅 Horarios</button>
            <button className="btn-export">✅ Asistencias</button>
          </div>
        </div>
      </div>
    </div>
  );

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
                src={fotoPerfil} 
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
                src={fotoPerfil} 
                alt="Foto de perfil" 
                className="foto-perfil-grande"
              />
            </div>
            <div className="perfil-info">
              <h3>{docenteInfo?.nombre || 'Dr. Juan Pérez García'}</h3>
              <p className="matricula">No. Empleado: {docenteInfo?.no_empleado || 'D001'}</p>
              <p className="email">Email: {docenteInfo?.email || 'juan.perez@unach.mx'}</p>
              <p className="carrera">Docente - Universidad Autónoma de Chiapas</p>
              <p className="grupo">Departamento: {docenteInfo?.departamento || 'Sistemas Computacionales'}</p>
            </div>
          </div>
          
          <div className="perfil-details">
            <div className="detail-group">
              <h4>Información Profesional</h4>
              <p><strong>Usuario:</strong> {docenteInfo?.email || 'juan.perez@unach.mx'}</p>
              <p><strong>Materias Impartidas:</strong> {[...new Set(horarios.map(h => h.materia))].length}</p>
              <p><strong>Clases Esta Semana:</strong> {horarios.filter(h => {
                const hoy = new Date();
                const fechaClase = new Date(h.fecha);
                const inicioSemana = new Date(hoy);
                inicioSemana.setDate(hoy.getDate() - hoy.getDay());
                inicioSemana.setHours(0, 0, 0, 0);
                const finSemana = new Date(inicioSemana);
                finSemana.setDate(inicioSemana.getDate() + 6);
                finSemana.setHours(23, 59, 59, 999);
                return fechaClase >= inicioSemana && fechaClase <= finSemana;
              }).length}</p>
              <p><strong>Grupos Asignados:</strong> {[...new Set(horarios.map(h => h.grupo))].join(', ') || 'Ninguno'}</p>
            </div>
            
            <div className="detail-group">
              <h4>Información de Contacto</h4>
              <p><strong>No. Empleado:</strong> {docenteInfo?.no_empleado || 'D001'}</p>
              <p><strong>Email Institucional:</strong> {docenteInfo?.email || 'juan.perez@unach.mx'}</p>
              <p><strong>Departamento:</strong> {docenteInfo?.departamento || 'Sistemas Computacionales'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'qr':
        return renderQRDocente();
      case 'horarios':
        return renderHorarios();
      case 'asistencias':
        return renderAsistencias();
      case 'reportes':
        return renderReportes();
      case 'perfil':
        return renderPerfil();
      default:
        return renderHorarios();
    }
  };

  return (
    <div className="dashboard-docente">
      <header className="docente-header">
        <div className="header-left">
          <div className="logo">
            <span>UNACH</span>
          </div>
          <h1>Panel del Docente - SISLAB</h1>
        </div>
        <div className="header-right">
          <span className="user-info">Docente: {docenteInfo?.nombre || 'Dr. Juan Pérez García'}</span>
          <button onClick={onLogout} className="logout-btn">🚪 Cerrar sesión</button>
        </div>
      </header>

      <div className="docente-container">
        <aside className="docente-sidebar">
          <nav className="sidebar-nav">
            <div 
              className={`nav-item ${activeMenu === 'qr' ? 'active' : ''}`}
              onClick={() => setActiveMenu('qr')}
            >
              📱 Mi QR
            </div>
            <div 
              className={`nav-item ${activeMenu === 'horarios' ? 'active' : ''}`}
              onClick={() => setActiveMenu('horarios')}
            >
              🕒 Mis Horarios
            </div>
            <div 
              className={`nav-item ${activeMenu === 'asistencias' ? 'active' : ''}`}
              onClick={() => setActiveMenu('asistencias')}
            >
              ✅ Asistencias
            </div>
            <div 
              className={`nav-item ${activeMenu === 'reportes' ? 'active' : ''}`}
              onClick={() => setActiveMenu('reportes')}
            >
              📊 Reportes
            </div>
            <div 
              className={`nav-item ${activeMenu === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveMenu('perfil')}
            >
              👤 Mi Perfil
            </div>
          </nav>
        </aside>

        <main className="docente-main">
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

export default DashboardDocente;