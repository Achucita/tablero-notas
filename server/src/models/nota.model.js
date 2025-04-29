import { query } from "../db/db.js"

export const NotaModel = {
  // Obtener todas las notas
  getAll: async () => {
    return await query("SELECT * FROM notas ORDER BY fecha_creacion DESC")
  },

  // Obtener una nota por ID
  getById: async (id) => {
    const result = await query("SELECT * FROM notas WHERE id = ?", [id])
    return result[0]
  },

  // Crear una nueva nota
  create: async (nota) => {
    const { titulo, contenido, color } = nota
    const result = await query("INSERT INTO notas (titulo, contenido, color) VALUES (?, ?, ?)", [
      titulo,
      contenido,
      color || "#ffffff",
    ])
    return { id: result.insertId, ...nota }
  },

  // Actualizar una nota existente
  update: async (id, nota) => {
    const { titulo, contenido, color } = nota
    await query("UPDATE notas SET titulo = ?, contenido = ?, color = ? WHERE id = ?", [titulo, contenido, color, id])
    return { id, ...nota }
  },

  // Eliminar una nota
  delete: async (id) => {
    return await query("DELETE FROM notas WHERE id = ?", [id])
  },
}
