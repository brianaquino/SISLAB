import * as asistenciaModel from '../models/asistencia.model.js';

/**
 * Controlador para OBTENER las asistencias de hoy (GET /api/asistencias/hoy)
 */
export const getAsistenciasHoy = async (req, res) => {
  try {
    const asistencias = await asistenciaModel.findToday();
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// (Aquí irá 'createAsistencia' después)
/**
 * Controlador para REGISTRAR una asistencia (POST /api/asistencias/registrar)
 */
export const createAsistencia = async (req, res) => {
  const { qrCode } = req.body;

  if (!qrCode) {
    return res.status(400).json({ msg: 'Falta el código QR.' });
  }

  try {
    // Llamamos al modelo para hacer toda la lógica
    const resultado = await asistenciaModel.create(qrCode);
    
    // Respondemos con los datos del usuario/docente y la hora
    res.status(200).json(resultado); 

  } catch (error) {
    // Capturamos los errores específicos del modelo (ej. "QR no encontrado")
    res.status(400).json({ msg: error.message });
  }
};

/**
 * Controlador para OBTENER la clase activa general (GET /api/asistencias/clase-activa)
 * (Para la pantalla de registro pública)
 */
export const getClaseActivaGeneral = async (req, res) => {
  try {
    const clase = await asistenciaModel.findClaseActivaGeneral();
    if (!clase) {
      // Si no hay clase, no es un error, solo no hay datos
      return res.status(200).json(null); 
    }
    res.status(200).json(clase);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};