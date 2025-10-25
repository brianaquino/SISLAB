import React, { useState, useEffect } from 'react';
import '../App.css';

// Datos mock actualizados
const mockData = {
  laboratorios: [
    { 
      id_laboratorio: 1, 
      nombre: 'Laboratorio 1', 
      estado: 'disponible', 
      ubicacion: 'Edificio A, Planta Baja',
      docentes_asignados: ['Dr. Juan Pérez', 'Dra. Ana Martínez'],
      capacidad: 30,
      equipos: 25
    },
    { 
      id_laboratorio: 2, 
      nombre: 'Laboratorio 2', 
      estado: 'ocupado', 
      ubicacion: 'Edificio B, Primer Piso',
      docentes_asignados: ['Mtro. Roberto Sánchez'],
      capacidad: 25,
      equipos: 20
    },
    { 
      id_laboratorio: 3, 
      nombre: 'Laboratorio 3', 
      estado: 'mantenimiento', 
      ubicacion: 'Edificio C, Segundo Piso',
      docentes_asignados: [],
      capacidad: 35,
      equipos: 30
    },
    { 
      id_laboratorio: 4, 
      nombre: 'Laboratorio 4', 
      estado: 'ocupado', 
      ubicacion: 'Edificio C, Segundo Piso',
      docentes_asignados: [],
      capacidad: 35,
      equipos: 30
    }
  ],
  usuarios: [
    { id_usuario: 1, nombre: 'Admin Principal', email: 'admin@unach.mx', rol: 'admin', foto_perfil: '/default-avatar.png', no_empleado: 'A001', grupo: null },
    { id_usuario: 3, nombre: 'María López', email: 'alumno@unach.mx', rol: 'alumno', foto_perfil: '/default-avatar.png', matricula: 'A001', grupo: 'ISC-8A' },
    { id_usuario: 4, nombre: 'Carlos Ruiz', email: 'carlos@unach.mx', rol: 'alumno', foto_perfil: '/default-avatar.png', matricula: 'A002', grupo: 'ISC-8A' }
  ],
  docentes: [
    { 
      id_docente: 1, 
      nombre: 'Dr. Juan Pérez García', 
      no_empleado: 'D001', 
      email: 'docente@unach.mx',
      foto_perfil: '/default-avatar.png',
      materias: ['Programación Avanzada', 'Estructuras de Datos'],
      grupos: ['ISC-8A', 'ISC-8B']
    },
    { 
      id_docente: 2, 
      nombre: 'Dra. Ana Martínez López', 
      no_empleado: 'D002', 
      email: 'ana@unach.mx',
      foto_perfil: '/default-avatar.png',
      materias: ['Bases de Datos', 'Inteligencia Artificial'],
      grupos: ['ISC-8A', 'ISC-7B']
    },
    { 
      id_docente: 3, 
      nombre: 'Mtro. Roberto Sánchez', 
      no_empleado: 'D003', 
      email: 'roberto@unach.mx',
      foto_perfil: '/default-avatar.png',
      materias: ['Redes de Computadoras', 'Sistemas Operativos'],
      grupos: ['ISC-8A', 'ISC-9A']
    }
  ],
  materias: [
    { 
      id_materia: 1, 
      nombre: 'Programación Avanzada', 
      clave: 'PROG101',
      docente: 'Dr. Juan Pérez',
      grupos: ['ISC-8A', 'ISC-8B']
    },
    { 
      id_materia: 2, 
      nombre: 'Bases de Datos', 
      clave: 'BD202',
      docente: 'Dra. Ana Martínez',
      grupos: ['ISC-8A', 'ISC-7B']
    },
    { 
      id_materia: 3, 
      nombre: 'Redes de Computadoras', 
      clave: 'RED303',
      docente: 'Mtro. Roberto Sánchez',
      grupos: ['ISC-8A', 'ISC-9A']
    },
    { 
      id_materia: 4, 
      nombre: 'Inteligencia Artificial', 
      clave: 'IA404',
      docente: 'Dra. Ana Martínez',
      grupos: ['ISC-8A']
    }
  ],
  clases: [
    { id_clase: 1, materia: 'Programación Avanzada', docente: 'Dr. Juan Pérez', laboratorio: 'Laboratorio 1', grupo: 'ISC-8A', fecha: '2024-01-15', hora_inicio: '08:00', hora_fin: '10:00' },
    { id_clase: 2, materia: 'Bases de Datos', docente: 'Dra. Ana Martínez', laboratorio: 'Laboratorio 1', grupo: 'ISC-8B', fecha: '2024-01-15', hora_inicio: '10:00', hora_fin: '12:00' },
    { id_clase: 3, materia: 'Redes de Computadoras', docente: 'Mtro. Roberto Sánchez', laboratorio: 'Laboratorio 2', grupo: 'ISC-8A', fecha: '2024-01-16', hora_inicio: '14:00', hora_fin: '16:00' }
  ],
  asistenciasHoy: [
    { 
      id_asistencia: 1, 
      nombre_persona: 'María López', 
      identificador: 'A001',
      email: 'alumno@unach.mx',
      grupo: 'ISC-8A',
      materia: 'Programación Avanzada',
      laboratorio: 'Laboratorio 1',
      hora_ingreso: new Date().toISOString(),
      tipo: 'alumno',
      foto_perfil: '/default-avatar.png'
    },
    { 
      id_asistencia: 2, 
      nombre_persona: 'Dr. Juan Pérez', 
      identificador: 'D001',
      email: 'docente@unach.mx',
      grupo: 'Docente',
      materia: 'Programación Avanzada',
      laboratorio: 'Laboratorio 1',
      hora_ingreso: new Date().toISOString(),
      tipo: 'docente',
      foto_perfil: '/default-avatar.png'
    }
  ],
  reportes: [
    {
      id_reporte: 1,
      titulo: 'Reporte Semanal - Programación Avanzada',
      docente: 'Dr. Juan Pérez',
      materia: 'Programación Avanzada',
      grupo: 'ISC-8A',
      periodo: 'semanal',
      fecha_generacion: '2024-01-15',
      tipo: 'asistencia',
      estado: 'completado',
      archivo: 'reporte_semanal_prog_avanzada_isc8a.pdf',
      resumen: '85% de asistencia, 3 inasistencias justificadas'
    },
    {
      id_reporte: 2,
      titulo: 'Reporte Mensual - Bases de Datos',
      docente: 'Dra. Ana Martínez',
      materia: 'Bases de Datos',
      grupo: 'ISC-8B',
      periodo: 'mensual',
      fecha_generacion: '2024-01-10',
      tipo: 'rendimiento',
      estado: 'completado',
      archivo: 'reporte_mensual_bd_isc8b.pdf',
      resumen: 'Promedio grupal: 8.5, 2 alumnos con bajo rendimiento'
    },
    {
      id_reporte: 3,
      titulo: 'Reporte Anual - Laboratorio 1',
      docente: 'Mtro. Roberto Sánchez',
      materia: 'Redes de Computadoras',
      grupo: 'ISC-8A',
      periodo: 'anual',
      fecha_generacion: '2024-01-05',
      tipo: 'uso_laboratorio',
      estado: 'completado',
      archivo: 'reporte_anual_lab1_2024.pdf',
      resumen: '92% de uso efectivo, 15 mantenimientos realizados'
    },
    {
      id_reporte: 4,
      titulo: 'Reporte Semanal - Inteligencia Artificial',
      docente: 'Dra. Ana Martínez',
      materia: 'Inteligencia Artificial',
      grupo: 'ISC-8A',
      periodo: 'semanal',
      fecha_generacion: '2024-01-14',
      tipo: 'asistencia',
      estado: 'pendiente',
      archivo: null,
      resumen: 'En proceso de generación...'
    },
    {
      id_reporte: 5,
      titulo: 'Reporte Mensual - Laboratorio 2',
      docente: 'Dr. Juan Pérez',
      materia: 'Programación Avanzada',
      grupo: 'ISC-8B',
      periodo: 'mensual',
      fecha_generacion: '2024-01-08',
      tipo: 'uso_laboratorio',
      estado: 'completado',
      archivo: 'reporte_mensual_lab2_enero.pdf',
      resumen: '78% de ocupación, 4 eventos especiales realizados'
    }
  ]
};

const DashboardAdmin = ({ userData, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('asistencias');
  const [laboratorios, setLaboratorios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]);
  const [asistenciasHoy, setAsistenciasHoy] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtroRol, setFiltroRol] = useState('todos');
  const [filtroGrupo, setFiltroGrupo] = useState('todos');
  const [orden, setOrden] = useState('a-z');
  const [filtroMateria, setFiltroMateria] = useState('todos');
  const [filtroDocente, setFiltroDocente] = useState('todos');

  // Filtros para reportes
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Estados para formularios
  const [showFormMateria, setShowFormMateria] = useState(false);
  const [showFormUsuario, setShowFormUsuario] = useState(false);
  const [showFormClase, setShowFormClase] = useState(false);
  const [editingMateria, setEditingMateria] = useState(null);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [editingClase, setEditingClase] = useState(null);

  useEffect(() => {
    cargarDatosMock();
  }, [activeMenu]);

  const cargarDatosMock = () => {
    setLoading(true);
    
    setTimeout(() => {
      switch(activeMenu) {
        case 'laboratorios':
          setLaboratorios(mockData.laboratorios);
          break;
        case 'materias':
          setMaterias(mockData.materias);
          break;
        case 'clases':
          setClases(mockData.clases);
          break;
        case 'usuarios':
          // Combinar usuarios y docentes en una sola lista
          const usuariosCombinados = [
            ...mockData.usuarios,
            ...mockData.docentes.map(docente => ({
              ...docente,
              id_usuario: docente.id_docente,
              rol: 'docente',
              no_empleado: docente.no_empleado,
              grupo: null,
              materias: docente.materias,
              grupos_atendidos: docente.grupos
            }))
          ];
          setUsuarios(usuariosCombinados);
          break;
        case 'asistencias':
          setAsistenciasHoy(mockData.asistenciasHoy);
          break;
        case 'reportes':
          setReportes(mockData.reportes);
          break;
        default:
          break;
      }
      setLoading(false);
    }, 500);
  };

  // Filtrar y ordenar usuarios
  const usuariosFiltrados = usuarios
    .filter(user => {
      if (filtroRol !== 'todos' && user.rol !== filtroRol) return false;
      if (filtroGrupo !== 'todos' && user.grupo !== filtroGrupo) return false;
      return true;
    })
    .sort((a, b) => {
      if (orden === 'a-z') return a.nombre.localeCompare(b.nombre);
      if (orden === 'z-a') return b.nombre.localeCompare(a.nombre);
      return 0;
    });

  // Filtrar materias
  const materiasFiltradas = materias
    .filter(materia => {
      if (filtroMateria !== 'todos' && materia.nombre !== filtroMateria) return false;
      if (filtroDocente !== 'todos' && materia.docente !== filtroDocente) return false;
      return true;
    });

  // Filtrar reportes
  const reportesFiltrados = reportes
    .filter(reporte => {
      if (filtroPeriodo !== 'todos' && reporte.periodo !== filtroPeriodo) return false;
      if (filtroTipo !== 'todos' && reporte.tipo !== filtroTipo) return false;
      if (filtroEstado !== 'todos' && reporte.estado !== filtroEstado) return false;
      return true;
    })
    .sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion));

  const metricsData = [
    { 
      title: 'Laboratorios', 
      value: mockData.laboratorios.length.toString(), 
      icon: '🖥️' 
    },
    { 
      title: 'Usuarios', 
      value: (mockData.usuarios.length + mockData.docentes.length).toString(), 
      icon: '👥' 
    },
    { 
      title: 'Asistencias Hoy', 
      value: mockData.asistenciasHoy.length.toString(), 
      icon: '✅' 
    },
    { 
      title: 'Reportes', 
      value: mockData.reportes.length.toString(), 
      icon: '📊' 
    }
  ];

  // Funciones CRUD simuladas
  const handleEditar = (tipo, id) => {
    if (tipo === 'materia') {
      const materia = materias.find(m => m.id_materia === id);
      setEditingMateria(materia);
      setShowFormMateria(true);
    } else if (tipo === 'usuario') {
      const usuario = usuarios.find(u => u.id_usuario === id);
      setEditingUsuario(usuario);
      setShowFormUsuario(true);
    } else if (tipo === 'clase') {
      const clase = clases.find(c => c.id_clase === id);
      setEditingClase(clase);
      setShowFormClase(true);
    } else {
      alert(`📝 Editando ${tipo} con ID: ${id} (Función simulada)`);
    }
  };

  const handleEliminar = (tipo, id) => {
    if (window.confirm(`¿Estás seguro de eliminar este ${tipo}?`)) {
      alert(`🗑️ ${tipo} con ID: ${id} eliminado (Función simulada)`);
    }
  };

  const handleAgregar = (tipo) => {
    if (tipo === 'materia') {
      setEditingMateria(null);
      setShowFormMateria(true);
    } else if (tipo === 'usuario') {
      setEditingUsuario(null);
      setShowFormUsuario(true);
    } else if (tipo === 'clase') {
      setEditingClase(null);
      setShowFormClase(true);
    } else {
      alert(`➕ Agregando nuevo ${tipo} (Función simulada)`);
    }
  };

  // Funciones para reportes
  const handleDescargarReporte = (reporte) => {
    if (reporte.archivo) {
      alert(`📥 Descargando reporte: ${reporte.archivo}`);
      // Simular descarga
      const link = document.createElement('a');
      link.href = '#';
      link.download = reporte.archivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('⚠️ Este reporte aún no está disponible para descargar');
    }
  };

  const handleVerReporte = (reporte) => {
    if (reporte.estado === 'completado') {
      alert(`👁️ Visualizando reporte: ${reporte.titulo}\n\nResumen: ${reporte.resumen}`);
    } else {
      alert('⏳ Este reporte aún está en proceso de generación');
    }
  };

  const handleSolicitarReporte = () => {
    alert('📋 Función para solicitar nuevo reporte (en desarrollo)');
  };

  // Formulario de Materia
  const FormularioMateria = () => (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h3>{editingMateria ? 'Editar Materia' : 'Agregar Nueva Materia'}</h3>
          <button className="btn-cerrar" onClick={() => setShowFormMateria(false)}>✕</button>
        </div>
        <form className="form-body">
          <div className="form-group">
            <label>Nombre de la materia:</label>
            <input 
              type="text" 
              defaultValue={editingMateria?.nombre || ''} 
              placeholder="Ingrese el nombre de la materia"
            />
          </div>
          <div className="form-group">
            <label>Clave:</label>
            <input 
              type="text" 
              defaultValue={editingMateria?.clave || ''} 
              placeholder="Ej: PROG101"
            />
          </div>
          <div className="form-group">
            <label>Docente que la imparte:</label>
            <input 
              type="text" 
              defaultValue={editingMateria?.docente || ''} 
              placeholder="Ingrese el nombre del docente"
            />
          </div>
          <div className="form-group">
            <label>Grupos (separados por coma):</label>
            <input 
              type="text" 
              defaultValue={editingMateria?.grupos?.join(', ') || ''} 
              placeholder="Ej: ISC-8A, ISC-8B, ISC-7A"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => setShowFormMateria(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {editingMateria ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Formulario de Usuario (unificado para todos los roles)
  const FormularioUsuario = () => {
    const [rolSeleccionado, setRolSeleccionado] = useState(editingUsuario?.rol || 'alumno');

    return (
      <div className="form-modal-overlay">
        <div className="form-modal">
          <div className="form-header">
            <h3>{editingUsuario ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h3>
            <button className="btn-cerrar" onClick={() => setShowFormUsuario(false)}>✕</button>
          </div>
          <form className="form-body">
            <div className="form-group">
              <label>Nombre completo:</label>
              <input 
                type="text" 
                defaultValue={editingUsuario?.nombre || ''} 
                placeholder="Ingrese el nombre completo"
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico:</label>
              <input 
                type="email" 
                defaultValue={editingUsuario?.email || ''} 
                placeholder="ejemplo@unach.mx"
              />
            </div>
            <div className="form-group">
              <label>Rol:</label>
              <select 
                value={rolSeleccionado} 
                onChange={(e) => setRolSeleccionado(e.target.value)}
              >
                <option value="alumno">Alumno</option>
                <option value="docente">Docente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            
            {/* Campos específicos para alumnos */}
            <div className="campos-alumno" style={{display: rolSeleccionado === 'alumno' ? 'block' : 'none'}}>
              <div className="form-group">
                <label>Matrícula:</label>
                <input 
                  type="text" 
                  defaultValue={editingUsuario?.matricula || ''} 
                  placeholder="Ej: A001"
                />
              </div>
              <div className="form-group">
                <label>Grupo:</label>
                <input 
                  type="text" 
                  defaultValue={editingUsuario?.grupo || ''} 
                  placeholder="Ej: ISC-8A"
                />
              </div>
            </div>

            {/* Campos específicos para docentes */}
            <div className="campos-docente" style={{display: rolSeleccionado === 'docente' ? 'block' : 'none'}}>
              <div className="form-group">
                <label>Número de empleado:</label>
                <input 
                  type="text" 
                  defaultValue={editingUsuario?.no_empleado || ''} 
                  placeholder="Ej: D001"
                />
              </div>
              <div className="form-group">
                <label>Materias que imparte (separadas por coma):</label>
                <input 
                  type="text" 
                  defaultValue={editingUsuario?.materias?.join(', ') || ''} 
                  placeholder="Ej: Programación Avanzada, Bases de Datos"
                />
              </div>
              <div className="form-group">
                <label>Grupos que atiende (separados por coma):</label>
                <input 
                  type="text" 
                  defaultValue={editingUsuario?.grupos_atendidos?.join(', ') || ''} 
                  placeholder="Ej: ISC-8A, ISC-8B, ISC-7A"
                />
              </div>
            </div>

            {/* Campos para administradores */}
            <div className="campos-admin" style={{display: rolSeleccionado === 'admin' ? 'block' : 'none'}}>
              <div className="form-group">
                <label>Número de empleado:</label>
                <input 
                  type="text" 
                  defaultValue={editingUsuario?.no_empleado || ''} 
                  placeholder="Ej: A001"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Foto de perfil:</label>
              <input type="file" />
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-cancelar" onClick={() => setShowFormUsuario(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn-guardar">
                {editingUsuario ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Formulario de Clase/Evento
  const FormularioClase = () => (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h3>{editingClase ? 'Editar Clase/Evento' : 'Agregar Nueva Clase/Evento'}</h3>
          <button className="btn-cerrar" onClick={() => setShowFormClase(false)}>✕</button>
        </div>
        <form className="form-body">
          <div className="form-group">
            <label>Tipo:</label>
            <select defaultValue={editingClase?.tipo || 'clase'}>
              <option value="clase">Clase Regular</option>
              <option value="evento">Evento Especial</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="reunion">Reunión</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Materia/Actividad:</label>
            <input 
              type="text" 
              defaultValue={editingClase?.materia || ''} 
              placeholder="Ingrese la materia o nombre de la actividad"
            />
          </div>
          
          <div className="form-group">
            <label>Docente/Responsable:</label>
            <input 
              type="text" 
              defaultValue={editingClase?.docente || ''} 
              placeholder="Ingrese el nombre del responsable"
            />
          </div>
          
          <div className="form-group">
            <label>Laboratorio:</label>
            <input 
              type="text" 
              defaultValue={editingClase?.laboratorio || ''} 
              placeholder="Ej: Laboratorio 1"
            />
          </div>
          
          <div className="form-group">
            <label>Grupo/Participantes:</label>
            <input 
              type="text" 
              defaultValue={editingClase?.grupo || ''} 
              placeholder="Ej: ISC-8A o 'Todo el personal'"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Fecha:</label>
              <input 
                type="date" 
                defaultValue={editingClase?.fecha || ''} 
              />
            </div>
            
            <div className="form-group">
              <label>Hora inicio:</label>
              <input 
                type="time" 
                defaultValue={editingClase?.hora_inicio || ''} 
              />
            </div>
            
            <div className="form-group">
              <label>Hora fin:</label>
              <input 
                type="time" 
                defaultValue={editingClase?.hora_fin || ''} 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Descripción/Notas:</label>
            <textarea 
              rows="3" 
              defaultValue={editingClase?.descripcion || ''}
              placeholder="Descripción adicional del evento o clase..."
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => setShowFormClase(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {editingClase ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAsistencias = () => (
    <div className="asistencias-section">
      <div className="section-header">
        <h2>Asistencias del Día ({asistenciasHoy.length})</h2>
        <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
          {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando asistencias...</div>
      ) : asistenciasHoy.length === 0 ? (
        <div className="no-data">
          <h3>📭 No hay asistencias registradas hoy</h3>
          <p>Las asistencias aparecerán cuando los alumnos y docentes escaneen sus QR en los laboratorios</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Identificador</th>
                <th>Email</th>
                <th>Grupo/Tipo</th>
                <th>Materia</th>
                <th>Laboratorio</th>
                <th>Hora de Ingreso</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {asistenciasHoy.map(asistencia => (
                <tr key={asistencia.id_asistencia}>
                  <td>
                    <img 
                      src={asistencia.foto_perfil || '/default-avatar.png'} 
                      alt="Foto" 
                      className="foto-tabla"
                    />
                  </td>
                  <td>{asistencia.nombre_persona}</td>
                  <td>{asistencia.identificador}</td>
                  <td>{asistencia.email}</td>
                  <td>
                    <span className={`badge ${asistencia.tipo === 'docente' ? 'docente' : 'alumno'}`}>
                      {asistencia.grupo}
                    </span>
                  </td>
                  <td>{asistencia.materia}</td>
                  <td>{asistencia.laboratorio}</td>
                  <td>{new Date(asistencia.hora_ingreso).toLocaleTimeString('es-MX')}</td>
                  <td>
                    <span className={`badge ${asistencia.tipo === 'docente' ? 'docente' : 'alumno'}`}>
                      {asistencia.tipo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderUsuarios = () => (
    <div className="usuarios-section">
      <div className="section-header">
        <h2>Gestión de Usuarios ({usuariosFiltrados.length})</h2>
        <div className="header-actions">
          <button className="btn-agregar" onClick={() => handleAgregar('usuario')}>
            ➕ Agregar Usuario
          </button>
          <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
            {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtro-group">
          <label>Filtrar por rol:</label>
          <select 
            value={filtroRol} 
            onChange={(e) => setFiltroRol(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="docente">Docentes</option>
            <option value="alumno">Alumnos</option>
          </select>
        </div>

        <div className="filtro-group">
          <label>Filtrar por grupo:</label>
          <select 
            value={filtroGrupo} 
            onChange={(e) => setFiltroGrupo(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los grupos</option>
            <option value="ISC-8A">ISC-8A</option>
            <option value="ISC-8B">ISC-8B</option>
          </select>
        </div>

        <div className="filtro-group">
          <label>Ordenar por:</label>
          <select 
            value={orden} 
            onChange={(e) => setOrden(e.target.value)}
            className="filtro-select"
          >
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Cargando usuarios...</div>
      ) : usuariosFiltrados.length === 0 ? (
        <div className="no-data">No hay usuarios registrados</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Información</th>
                <th>Grupo/Materias</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(user => (
                <tr key={user.id_usuario}>
                  <td>
                    <img 
                      src={user.foto_perfil || '/default-avatar.png'} 
                      alt="Foto" 
                      className="foto-tabla"
                    />
                  </td>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.rol}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td>{user.no_empleado || user.matricula || 'N/A'}</td>
                  <td>
                    {user.rol === 'alumno' ? (
                      user.grupo || 'N/A'
                    ) : user.rol === 'docente' ? (
                      <div className="lista-items">
                        {user.materias?.map((materia, index) => (
                          <span key={index} className="item-tag">{materia}</span>
                        ))}
                      </div>
                    ) : 'N/A'}
                  </td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEditar('usuario', user.id_usuario)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleEliminar('usuario', user.id_usuario)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showFormUsuario && <FormularioUsuario />}
    </div>
  );

  const renderLaboratorios = () => (
    <div className="laboratorios-section">
      <div className="section-header">
        <h2>Laboratorios ({laboratorios.length})</h2>
        <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
          {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Cargando laboratorios...</div>
      ) : laboratorios.length === 0 ? (
        <div className="no-data">No hay laboratorios registrados</div>
      ) : (
        <div className="laboratorios-grid">
          {laboratorios.map(lab => (
            <div key={lab.id_laboratorio} className="laboratorio-card">
              <h3>{lab.nombre}</h3>
              <div className="lab-info">
                <span className={`estado ${lab.estado}`}>
                  {lab.estado?.charAt(0)?.toUpperCase() + lab.estado?.slice(1) || 'Desconocido'}
                </span>
                <div className="lab-details">
                  <span><strong>Ubicación:</strong> {lab.ubicacion || 'No especificada'}</span>
                  <span><strong>Capacidad:</strong> {lab.capacidad} personas</span>
                  <span><strong>Equipos:</strong> {lab.equipos} equipos</span>
                  <span><strong>Docentes asignados:</strong></span>
                  <div className="docentes-lista">
                    {lab.docentes_asignados.length > 0 ? (
                      lab.docentes_asignados.map((docente, index) => (
                        <span key={index} className="docente-tag">{docente}</span>
                      ))
                    ) : (
                      <span className="sin-docentes">Sin docentes asignados</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-ver-detalles" onClick={() => alert(`👀 Viendo detalles de ${lab.nombre}`)}>
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMaterias = () => (
    <div className="materias-section">
      <div className="section-header">
        <h2>Materias ({materiasFiltradas.length})</h2>
        <div className="header-actions">
          <button className="btn-agregar" onClick={() => handleAgregar('materia')}>
            ➕ Agregar Materia
          </button>
          <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
            {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
          </button>
        </div>
      </div>

      {/* Filtros para materias */}
      <div className="filtros-container">
        <div className="filtro-group">
          <label>Filtrar por materia:</label>
          <select 
            value={filtroMateria} 
            onChange={(e) => setFiltroMateria(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todas las materias</option>
            {materias.map(materia => (
              <option key={materia.id_materia} value={materia.nombre}>
                {materia.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label>Filtrar por docente:</label>
          <select 
            value={filtroDocente} 
            onChange={(e) => setFiltroDocente(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los docentes</option>
            <option value="Dr. Juan Pérez">Dr. Juan Pérez</option>
            <option value="Dra. Ana Martínez">Dra. Ana Martínez</option>
            <option value="Mtro. Roberto Sánchez">Mtro. Roberto Sánchez</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Cargando materias...</div>
      ) : materiasFiltradas.length === 0 ? (
        <div className="no-data">No hay materias registradas</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Clave</th>
                <th>Docente</th>
                <th>Grupos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materiasFiltradas.map(materia => (
                <tr key={materia.id_materia}>
                  <td>{materia.nombre}</td>
                  <td>{materia.clave}</td>
                  <td>{materia.docente}</td>
                  <td>
                    <div className="lista-items">
                      {materia.grupos.map((grupo, index) => (
                        <span key={index} className="item-tag grupo">{grupo}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEditar('materia', materia.id_materia)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleEliminar('materia', materia.id_materia)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showFormMateria && <FormularioMateria />}
    </div>
  );

  const renderClases = () => (
    <div className="clases-section">
      <div className="section-header">
        <h2>Clases y Eventos ({clases.length})</h2>
        <div className="header-actions">
          <button className="btn-agregar" onClick={() => handleAgregar('clase')}>
            ➕ Agregar Clase/Evento
          </button>
          <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
            {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Cargando clases...</div>
      ) : clases.length === 0 ? (
        <div className="no-data">No hay clases o eventos programados</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Materia/Actividad</th>
                <th>Responsable</th>
                <th>Laboratorio</th>
                <th>Grupo</th>
                <th>Fecha</th>
                <th>Horario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clases.map(clase => (
                <tr key={clase.id_clase}>
                  <td>
                    <span className={`badge ${clase.tipo || 'clase'}`}>
                      {clase.tipo || 'Clase'}
                    </span>
                  </td>
                  <td>{clase.materia}</td>
                  <td>{clase.docente}</td>
                  <td>{clase.laboratorio}</td>
                  <td>{clase.grupo}</td>
                  <td>{new Date(clase.fecha).toLocaleDateString('es-ES')}</td>
                  <td>{clase.hora_inicio} - {clase.hora_fin}</td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEditar('clase', clase.id_clase)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleEliminar('clase', clase.id_clase)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showFormClase && <FormularioClase />}
    </div>
  );

  const renderReportes = () => (
    <div className="reportes-section">
      <div className="section-header">
        <h2>Reportes Generados por Docentes ({reportesFiltrados.length})</h2>
        <div className="header-actions">
          <button className="btn-solicitar" onClick={handleSolicitarReporte}>
            📋 Solicitar Nuevo Reporte
          </button>
          <button className="btn-refresh" onClick={cargarDatosMock} disabled={loading}>
            {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
          </button>
        </div>
      </div>

      {/* Filtros para reportes */}
      <div className="filtros-container">
        <div className="filtro-group">
          <label>Periodo:</label>
          <select 
            value={filtroPeriodo} 
            onChange={(e) => setFiltroPeriodo(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los periodos</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="filtro-group">
          <label>Tipo de reporte:</label>
          <select 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los tipos</option>
            <option value="asistencia">Asistencia</option>
            <option value="rendimiento">Rendimiento</option>
            <option value="uso_laboratorio">Uso de Laboratorio</option>
          </select>
        </div>

        <div className="filtro-group">
          <label>Estado:</label>
          <select 
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos los estados</option>
            <option value="completado">Completado</option>
            <option value="pendiente">Pendiente</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Cargando reportes...</div>
      ) : reportesFiltrados.length === 0 ? (
        <div className="no-data">
          <h3>📭 No hay reportes generados</h3>
          <p>Los reportes aparecerán cuando los docentes los generen desde sus paneles</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Docente</th>
                <th>Materia/Grupo</th>
                <th>Periodo</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Resumen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesFiltrados.map(reporte => (
                <tr key={reporte.id_reporte}>
                  <td>
                    <strong>{reporte.titulo}</strong>
                  </td>
                  <td>{reporte.docente}</td>
                  <td>
                    <div>
                      <div>{reporte.materia}</div>
                      <small className="text-muted">{reporte.grupo}</small>
                    </div>
                  </td>
                  <td>
                    <span className={`badge periodo-${reporte.periodo}`}>
                      {reporte.periodo}
                    </span>
                  </td>
                  <td>
                    <span className={`badge tipo-${reporte.tipo}`}>
                      {reporte.tipo}
                    </span>
                  </td>
                  <td>{new Date(reporte.fecha_generacion).toLocaleDateString('es-ES')}</td>
                  <td>
                    <span className={`badge estado-${reporte.estado}`}>
                      {reporte.estado}
                    </span>
                  </td>
                  <td>
                    <small>{reporte.resumen}</small>
                  </td>
                  <td>
                    <div className="acciones-reporte">
                      <button 
                        className="btn-ver" 
                        onClick={() => handleVerReporte(reporte)}
                        title="Ver resumen"
                      >
                        👁️
                      </button>
                      <button 
                        className="btn-descargar" 
                        onClick={() => handleDescargarReporte(reporte)}
                        disabled={!reporte.archivo}
                        title={reporte.archivo ? "Descargar PDF" : "No disponible"}
                      >
                        📥
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch(activeMenu) {
      case 'asistencias':
        return renderAsistencias();
      case 'laboratorios':
        return renderLaboratorios();
      case 'materias':
        return renderMaterias();
      case 'clases':
        return renderClases();
      case 'reportes':
        return renderReportes();
      case 'usuarios':
        return renderUsuarios();
      default:
        return renderAsistencias();
    }
  };

  return (
    <div className="dashboard-admin">
      <header className="admin-header">
        <div className="header-left">
          <div className="logo">
            <span>UNACH</span>
          </div>
          <h1>Panel de Administración - SISLAB</h1>
        </div>
        <div className="header-right">
          <span className="user-info">Usuario: {userData?.username || 'admin'}</span>
          <button onClick={onLogout} className="logout-btn">🚪 Cerrar sesión</button>
        </div>
      </header>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">
            <div className={`nav-item ${activeMenu === 'asistencias' ? 'active' : ''}`}
              onClick={() => setActiveMenu('asistencias')}>
              ✅ Asistencias del Día
            </div>
            <div className={`nav-item ${activeMenu === 'laboratorios' ? 'active' : ''}`}
              onClick={() => setActiveMenu('laboratorios')}>
              🖥️ Laboratorios
            </div>
            <div className={`nav-item ${activeMenu === 'materias' ? 'active' : ''}`}
              onClick={() => setActiveMenu('materias')}>
              📚 Materias
            </div>
            <div className={`nav-item ${activeMenu === 'clases' ? 'active' : ''}`}
              onClick={() => setActiveMenu('clases')}>
              📅 Clases y Eventos
            </div>
            <div className={`nav-item ${activeMenu === 'reportes' ? 'active' : ''}`}
              onClick={() => setActiveMenu('reportes')}>
              📊 Reportes
            </div>
            <div className={`nav-item ${activeMenu === 'usuarios' ? 'active' : ''}`}
              onClick={() => setActiveMenu('usuarios')}>
              👥 Gestión de Usuarios
            </div>
          </nav>
        </aside>

        <main className="admin-main">
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

export default DashboardAdmin;