import React, { useState, useEffect } from 'react';
import '../App.css';

// Datos de prueba para la vista
const datosPrueba = {
  claseInfo: {
    materia: "Fundamentos de Redes",
    laboratorio: "Laboratorio de Computación 1",
    maestro: "Dr. Juan Pérez García",
    grupo: "ISC-8A",
    horario: "14:00 - 16:00 hrs",
    fecha: new Date().toLocaleDateString('es-MX')
  },
  alumnosRegistrados: [
    {
      id: 1,
      nombre: "Carlos Rodríguez Martínez",
      matricula: "2023001",
      foto: "/default-avatar.png",
      horaRegistro: "14:05",
      estado: "presente",
      grupo: "ISC-8A"
    },
    {
      id: 2,
      nombre: "Ana María López García",
      matricula: "2023002",
      foto: "/default-avatar.png",
      horaRegistro: "14:07",
      estado: "presente",
      grupo: "ISC-8A"
    },
    {
      id: 3,
      nombre: "Roberto Sánchez Méndez",
      matricula: "2023003",
      foto: "/default-avatar.png",
      horaRegistro: "14:15",
      estado: "tardanza",
      grupo: "ISC-8A"
    },
    {
      id: 4,
      nombre: "María Fernanda Cruz",
      matricula: "2023004",
      foto: "/default-avatar.png",
      horaRegistro: "14:20",
      estado: "tardanza",
      grupo: "ISC-8A"
    },
    {
      id: 5,
      nombre: "José Luis Hernández",
      matricula: "2023005",
      foto: "/default-avatar.png",
      horaRegistro: "13:55",
      estado: "presente",
      grupo: "ISC-8A"
    },
    {
      id: 6,
      nombre: "Laura Patricia Ramírez",
      matricula: "2023006",
      foto: "/default-avatar.png",
      horaRegistro: "14:03",
      estado: "presente",
      grupo: "ISC-8A"
    },
    {
      id: 7,
      nombre: "Miguel Ángel Torres",
      matricula: "2023007",
      foto: "/default-avatar.png",
      horaRegistro: "14:12",
      estado: "presente",
      grupo: "ISC-8A"
    },
    {
      id: 8,
      nombre: "Gabriela Silva López",
      matricula: "2023008",
      foto: "/default-avatar.png",
      horaRegistro: "14:25",
      estado: "tardanza",
      grupo: "ISC-8A"
    }
  ],
  estadisticas: {
    totalAlumnos: 25,
    registrados: 8,
    porcentaje: 32,
    presentes: 5,
    tardanzas: 3,
    faltas: 17
  }
};

const PantallaRegistroClase = () => {
  const [claseInfo, setClaseInfo] = useState(null);
  const [alumnosRegistrados, setAlumnosRegistrados] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setClaseInfo(datosPrueba.claseInfo);
      setAlumnosRegistrados(datosPrueba.alumnosRegistrados);
      setEstadisticas(datosPrueba.estadisticas);
      setLoading(false);
    }, 1000);
  }, []);

  // Obtener color según el estado
  const getColorEstado = (estado) => {
    switch(estado) {
      case 'presente':
        return '#10b981'; // Verde
      case 'tardanza':
        return '#f59e0b'; // Amarillo/naranja
      case 'falta':
        return '#ef4444'; // Rojo
      default:
        return '#6b7280'; // Gris
    }
  };

  // Obtener texto del estado
  const getTextoEstado = (estado) => {
    switch(estado) {
      case 'presente':
        return 'Presente';
      case 'tardanza':
        return 'Tardanza';
      case 'falta':
        return 'Falta';
      default:
        return 'Sin registro';
    }
  };

  // Obtener icono según el estado
  const getIconoEstado = (estado) => {
    switch(estado) {
      case 'presente':
        return '✅';
      case 'tardanza':
        return '⚠️';
      case 'falta':
        return '❌';
      default:
        return '❓';
    }
  };

  if (loading) {
    return (
      <div className="pantalla-carga">
        <div className="loading">Cargando información de la clase...</div>
      </div>
    );
  }

  return (
    <div className="pantalla-registro-clase">
      {/* Header con información de la clase */}
      <header className="clase-header">
        <div className="clase-info-principal">
          <h1 className="clase-titulo">{claseInfo.materia}</h1>
          <div className="clase-detalles">
            <div className="detalle-item">
              <span className="detalle-icono">🏢</span>
              <span className="detalle-texto">{claseInfo.laboratorio}</span>
            </div>
            <div className="detalle-item">
              <span className="detalle-icono">👨‍🏫</span>
              <span className="detalle-texto">{claseInfo.maestro}</span>
            </div>
            <div className="detalle-item">
              <span className="detalle-icono">👥</span>
              <span className="detalle-texto">{claseInfo.grupo}</span>
            </div>
            <div className="detalle-item">
              <span className="detalle-icono">🕒</span>
              <span className="detalle-texto">{claseInfo.horario}</span>
            </div>
            <div className="detalle-item">
              <span className="detalle-icono">📅</span>
              <span className="detalle-texto">{claseInfo.fecha}</span>
            </div>
          </div>
        </div>
        
        {/* Estadísticas */}
        <div className="clase-estadisticas">
          <div className="estadistica-card">
            <div className="estadistica-valor">{estadisticas.registrados}</div>
            <div className="estadistica-label">Registrados</div>
            <div className="estadistica-total">de {estadisticas.totalAlumnos}</div>
          </div>
          <div className="estadistica-card">
            <div className="estadistica-valor" style={{color: '#10b981'}}>
              {estadisticas.presentes}
            </div>
            <div className="estadistica-label">Presentes</div>
          </div>
          <div className="estadistica-card">
            <div className="estadistica-valor" style={{color: '#f59e0b'}}>
              {estadisticas.tardanzas}
            </div>
            <div className="estadistica-label">Tardanzas</div>
          </div>
          <div className="estadistica-card">
            <div className="estadistica-valor" style={{color: '#ef4444'}}>
              {estadisticas.faltas}
            </div>
            <div className="estadistica-label">Faltas</div>
          </div>
        </div>
      </header>

      {/* Panel de información */}
      <div className="info-panel">
        <div className="contador-tiempo-real">
          <span className="contador-texto">
            {alumnosRegistrados.length} alumnos registrados en tiempo real
          </span>
          <span className="tiempo-actualizacion">
            Última actualización: {new Date().toLocaleTimeString('es-MX')}
          </span>
        </div>
      </div>

      {/* Grid de fichas de alumnos */}
      <div className="alumnos-grid">
        {alumnosRegistrados.length === 0 ? (
          <div className="no-alumnos">
            <div className="no-alumnos-icono">👥</div>
            <h3>No hay alumnos registrados</h3>
            <p>Los alumnos aparecerán aquí cuando se registren con su QR</p>
          </div>
        ) : (
          alumnosRegistrados.map(alumno => (
            <div key={alumno.id} className="ficha-alumno">
              <div className="ficha-header">
                <div className="ficha-avatar">
                  <div className="avatar-container">
                    <img 
                      src={alumno.foto} 
                      alt={`Foto de ${alumno.nombre}`}
                      className="avatar-alumno"
                    />
                    <div 
                      className="estado-badge"
                      style={{ backgroundColor: getColorEstado(alumno.estado) }}
                    >
                      {getIconoEstado(alumno.estado)}
                    </div>
                  </div>
                </div>
                
                <div className="ficha-info-principal">
                  <h3 className="alumno-nombre">{alumno.nombre}</h3>
                  <div className="alumno-datos">
                    <span className="alumno-matricula">{alumno.matricula}</span>
                    <span className="alumno-grupo">{alumno.grupo}</span>
                  </div>
                </div>
              </div>
              
              <div className="ficha-detalles">
                <div className="detalle-hora">
                  <span className="hora-icono">🕒</span>
                  <span className="hora-texto">{alumno.horaRegistro}</span>
                </div>
                <div 
                  className="detalle-estado"
                  style={{ color: getColorEstado(alumno.estado) }}
                >
                  <span className="estado-icono">{getIconoEstado(alumno.estado)}</span>
                  <span className="estado-texto">{getTextoEstado(alumno.estado)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer con información adicional */}
      <footer className="clase-footer">
        <div className="footer-info">
          <p><strong>Sistema de Asistencia SISLAB</strong> - UNACH</p>
          <p>Registro automático por código QR</p>
        </div>
        <div className="footer-estadisticas">
          <div className="progreso-asistencia">
            <div className="progreso-info">
              <span className="progreso-porcentaje">{estadisticas.porcentaje}%</span>
              <span className="progreso-texto">de asistencia</span>
            </div>
            <div className="progreso-bar">
              <div 
                className="progreso-fill"
                style={{ width: `${estadisticas.porcentaje}%` }}
              ></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PantallaRegistroClase;