import * as grupoModel from '../models/grupo.model.js';

/**
 * Controlador para OBTENER todos los nombres de grupos (GET /api/grupos/nombres)
 */
export const getAllGrupoNames = async (req, res) => {
  try {
    const nombresGrupos = await grupoModel.findAllNames();
    res.status(200).json(nombresGrupos); // Envía ["LIDTS-7M", "LSC-5K", ...]
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};