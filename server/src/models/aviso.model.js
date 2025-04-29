import { query } from "../db/db.js"

export const AvisoModel = {
  // Obtener todos los avisos
  getAll: async () => {
    return await query("SELECT * FROM avisos ORDER BY fecha_creacion DESC")
  },

  // Obtener un aviso por ID
  getById: async (id) => {
    const result = await query("SELECT * FROM avisos WHERE id = ?", [id])
    return result[0]
  },

  // Crear un nuevo aviso
  create: async (aviso) => {
    const { titulo, contenido } = aviso
    const result = await query("INSERT INTO avisos (titulo, contenido) VALUES (?, ?)", [titulo, contenido])
    return { id: result.insertId, ...aviso }
  },

  // Actualizar un aviso existente
  update: async (id, aviso) => {
    const { titulo, contenido } = aviso
    await query("UPDATE avisos SET titulo = ?, contenido = ? WHERE id = ?", [titulo, contenido, id])
    return { id, ...aviso }
  },

  // Eliminar un aviso
  delete: async (id) => {
    return await query("DELETE FROM avisos WHERE id = ?", [id])
  },
}
