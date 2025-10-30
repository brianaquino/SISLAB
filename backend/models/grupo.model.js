import { query } from '../config/database.js';

/**
 * Modelo para OBTENER todos los nombres de grupos activos
 */
export const findAllNames = async () => {
  // Seleccionamos solo el nombre y ordenamos
  const sql = 'SELECT nombre FROM grupos WHERE activo = TRUE ORDER BY nombre ASC;';
  try {
    const { rows } = await query(sql);
    // Devolvemos solo un array de strings (nombres)
    return rows.map(row => row.nombre); 
  } catch (error) {
    console.error('Error en modelo findAllNames grupos:', error.message);
    throw new Error('Error en la base de datos');
  }
};

// (Podríamos añadir CRUD completo para grupos si fuera necesario después)