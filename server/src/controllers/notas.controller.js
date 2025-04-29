import { NotaModel } from "../models/nota.model.js"

export const NotasController = {
  // Obtener todas las notas
  getAll: async (ctx) => {
    try {
      const notas = await NotaModel.getAll()
      ctx.body = {
        status: "success",
        data: notas,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al obtener las notas",
        error: error.message,
      }
    }
  },

  // Obtener una nota por ID
  getById: async (ctx) => {
    try {
      const id = ctx.params.id
      const nota = await NotaModel.getById(id)

      if (!nota) {
        ctx.status = 404
        ctx.body = {
          status: "error",
          message: `No se encontró la nota con ID ${id}`,
        }
        return
      }

      ctx.body = {
        status: "success",
        data: nota,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al obtener la nota",
        error: error.message,
      }
    }
  },

  // Crear una nueva nota
  create: async (ctx) => {
    try {
      const { titulo, contenido, color } = ctx.request.body

      // Validación básica
      if (!titulo || !contenido) {
        ctx.status = 400
        ctx.body = {
          status: "error",
          message: "El título y el contenido son obligatorios",
        }
        return
      }

      const nuevaNota = await NotaModel.create({ titulo, contenido, color })

      ctx.status = 201
      ctx.body = {
        status: "success",
        message: "Nota creada correctamente",
        data: nuevaNota,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al crear la nota",
        error: error.message,
      }
    }
  },

  // Actualizar una nota existente
  update: async (ctx) => {
    try {
      const id = ctx.params.id
      const { titulo, contenido, color } = ctx.request.body

      // Validación básica
      if (!titulo || !contenido) {
        ctx.status = 400
        ctx.body = {
          status: "error",
          message: "El título y el contenido son obligatorios",
        }
        return
      }

      // Verificar si la nota existe
      const notaExistente = await NotaModel.getById(id)
      if (!notaExistente) {
        ctx.status = 404
        ctx.body = {
          status: "error",
          message: `No se encontró la nota con ID ${id}`,
        }
        return
      }

      const notaActualizada = await NotaModel.update(id, { titulo, contenido, color })

      ctx.body = {
        status: "success",
        message: "Nota actualizada correctamente",
        data: notaActualizada,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al actualizar la nota",
        error: error.message,
      }
    }
  },

  // Eliminar una nota
  delete: async (ctx) => {
    try {
      const id = ctx.params.id

      // Verificar si la nota existe
      const notaExistente = await NotaModel.getById(id)
      if (!notaExistente) {
        ctx.status = 404
        ctx.body = {
          status: "error",
          message: `No se encontró la nota con ID ${id}`,
        }
        return
      }

      await NotaModel.delete(id)

      ctx.body = {
        status: "success",
        message: `Nota con ID ${id} eliminada correctamente`,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al eliminar la nota",
        error: error.message,
      }
    }
  },
}
